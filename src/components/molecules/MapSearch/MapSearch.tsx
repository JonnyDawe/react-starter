import type SearchVM from '@arcgis/core/widgets/Search/SearchViewModel.js';
import { useDebouncedCallback, useFocusWithin } from '@mantine/hooks';
import { useAsyncList } from '@react-stately/data';
import React from 'react';
import { Autocomplete, Popover } from 'react-aria-components';

import { Flag } from '@/components/atoms/Flag/Flag';
import SearchField from '@/components/atoms/Forms/SearchField';
import { ListBox, ListBoxItem } from '@/components/atoms/ListBox';
import { parseLocationText } from '@/lib/helpers/countryUtils';
import { isDefined } from '@/lib/types/typeGuards';
import { fieldBorderStyles } from '@/styles/recipes/fieldRecipes';

interface MapSearchProps {
  label?: string
  placeholder?: string
  searchViewModel: SearchVM
}

interface SuggestItem {
  id: string
  result: __esri.SearchSuggestResult
}

export function MapSearch({ label, placeholder, searchViewModel }: MapSearchProps) {
  const [search, setSearch] = React.useState('');

  const { ref: searchRefContainer, focused: searchIsFocused } = useFocusWithin();
  const { ref: popoverRef, focused: popoverIsFocused } = useFocusWithin();

  const componentIsFocused = React.useMemo(
    () => searchIsFocused || popoverIsFocused,
    [searchIsFocused, popoverIsFocused],
  );

  const searchFieldRef = React.useRef<HTMLDivElement | null>(null);

  const fetcher = React.useCallback(
    async (value: string) => {
      try {
        const fetchSuggestions = await searchViewModel.suggest(value);
        if (isDefined(fetchSuggestions)) {
          const results = fetchSuggestions.results
            .flatMap((result) =>
              result.results?.map((result) => {
                if (isDefined(result)) {
                  return {
                    id: result.key as string,
                    result,
                  };
                }
                return undefined;
              }),
            )
            .filter(isDefined);

          console.log(results);

          // Sort results to prioritize UK locations
          return results.sort((a, b) => {
            const aText = a.result.text?.toLowerCase() ?? '';
            const bText = b.result.text?.toLowerCase() ?? '';

            const aIsUK = aText.includes('gbr');
            const bIsUK = bText.includes('gbr');

            if (aIsUK && !bIsUK) {
              return -1;
            }
            if (!aIsUK && bIsUK) {
              return 1;
            }
            return 0;
          });
        }
        return [];
      } catch (e) {
        console.error(e);
        return [];
      }
    },
    [searchViewModel],
  );

  const list = useAsyncList<SuggestItem>({
    async load({ filterText }) {
      if (!filterText) {
        return {
          items: [],
        };
      }
      const fetchSuggestions = await fetcher(filterText);
      if (isDefined(fetchSuggestions)) {
        return {
          items: fetchSuggestions,
        };
      }
      return {
        items: [],
      };
    },
  });

  const handleSearch = useDebouncedCallback((value: string) => {
    list.setFilterText(value);
  }, 200);

  const handleChange = (value: string) => {
    setSearch(value);
    handleSearch(value);
  };

  return (
    <Autocomplete inputValue={search} onInputChange={handleChange}>
      <div ref={searchRefContainer}>
        <SearchField
          searchRef={searchFieldRef}
          label={label}
          isLoading={list.isLoading}
          placeholder={placeholder}
          inputClassName={componentIsFocused ? fieldBorderStyles({ isFocused: true }) : ''}
        />
      </div>

      <Popover
        triggerRef={searchFieldRef}
        isNonModal
        isOpen={componentIsFocused}
        isKeyboardDismissDisabled
        style={{
          width: searchFieldRef.current?.clientWidth,
        }}
      >
        <div ref={popoverRef}>
          <ListBox
            key={search}
            selectionMode="single"
            selectedKeys={list.selectedKeys}
            onSelectionChange={(selection) => {
              if (selection === 'all') {
                return;
              }
              // single selection so get single item
              const [key] = selection.values();
              const item = list.getItem(key);
              if (isDefined(item)) {
                searchViewModel.search(item.result);
                const { displayText } = parseLocationText(item.result.text ?? '');
                setSearch(displayText);
                list.setSelectedKeys(new Set([key]));
              }
            }}
            items={list.items}
            className={list.items.length === 0 ? 'hidden' : ''}
          >
            {(item) => (
              <ListBoxItem>
                {({ isSelected }) => {
                  const { displayText, countryCode } = parseLocationText(item.result.text ?? '');

                  return (
                    <div className="flex items-center gap-2">
                      {countryCode && <Flag code={countryCode} size="s" />}
                      {isSelected ? <b>{displayText}</b> : displayText}
                    </div>
                  );
                }}
              </ListBoxItem>
            )}
          </ListBox>
        </div>
      </Popover>
    </Autocomplete>
  );
}
