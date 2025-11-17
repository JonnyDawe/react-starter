import type { DisplayFormat } from '@/lib/helpers/formatCoordinates';
import { useAtom } from 'jotai/react';

import { Button } from 'react-aria-components';
import { useCurrentMapView } from '@/lib/arcgis/hooks';
import { useMapCursorPoint } from '@/lib/arcgis/hooks/useMapCursorPoint';
import { formatCoordinate } from '@/lib/helpers/formatCoordinates';
import { appTwVariants, cn } from '@/lib/helpers/tailwind-utils';
import { latLonFormatAtom } from '@/lib/store/atoms';
import { focusRing } from '@/styles/recipes/focusRing';

import { Divider } from '../Divider';
import { VisuallyHidden } from '../VisuallyHidden';

const cursorLocationControlRecipe = appTwVariants({
  slots: {
    wrapper: 'pointer-events-auto cursor-pointer bg-accent-surface px-1 py-0.5',
    location: 'flex cursor-pointer items-center gap-2 text-xs font-semibold',
    format: 'text-accent',
    value: 'flex-grow text-center text-accent-12',
  },
});

export function CursorPositionControl() {
  const mapView = useCurrentMapView();
  const { latitude, longitude } = useMapCursorPoint(mapView);
  const [format, setFormat] = useAtom(latLonFormatAtom);

  // Toggle between different formats
  const handleToggleFormat = () => {
    const formats: DisplayFormat[] = ['DD', 'DMS', 'DDM'];
    setFormat((prevFormat) => {
      const currentIndex = formats.indexOf(prevFormat);
      return formats[(currentIndex + 1) % formats.length] as DisplayFormat;
    });
  };

  // Use the custom hook to get formatted coordinates
  const formattedLatLon = formatCoordinate(latitude, longitude, format, true);
  const { wrapper, location, format: formatStyle, value } = cursorLocationControlRecipe();

  return (
    <div className={wrapper()}>
      <Button
        className={({ isFocusVisible }) => {
          return cn(location(), focusRing({ isFocusVisible }));
        }}
        onPress={handleToggleFormat}
      >
        <VisuallyHidden>
          Toggle format to
          {' '}
          {format === 'DD'
            ? 'Degrees Minutes Seconds'
            : format === 'DMS'
              ? 'Degrees Decimal Minutes'
              : 'Decimal Degrees'}
        </VisuallyHidden>
        <span className={formatStyle()}>{format}</span>
        <Divider orientation="vertical" className="h-3" inline />
        <span className={value()}>
          {' '}
          {formattedLatLon}
        </span>
      </Button>
    </div>
  );
}
