import { createFileRoute } from '@tanstack/react-router';
import { useAtom } from 'jotai';
import { useState } from 'react';

import { Button, IconButton } from '@/components/atoms/Button';
import { Checkbox } from '@/components/atoms/Checkbox';
import { Divider } from '@/components/atoms/Divider';
import { Search } from '@/components/atoms/Forms/SearchField';
import { Slider } from '@/components/atoms/Forms/Slider';
import TextInput from '@/components/atoms/Forms/TextInput';
import { InfoBox } from '@/components/atoms/InfoBox';
import { StaticSelect } from '@/components/atoms/Select';
import { SvgIcon } from '@/components/atoms/SvgIcon';
import { Link, Text, Title } from '@/components/atoms/Typography';
import { counterAtom } from '@/lib/store/atoms';

export const Route = createFileRoute('/')({
  component: App,
});

function CounterExample() {
  const [count, setCount] = useAtom(counterAtom);

  return (
    <div className="flex items-center gap-4">
      <IconButton
        icon={<SvgIcon name="icon-subtract" />}
        size="md"
        onPress={() => setCount((prev) => prev - 1)}
        aria-label="decrement counter"
        variant="primary"
      >
      </IconButton>
      <div className="min-w-[100px] text-center">
        <Text textStyle="bodyEmphasized" className="text-lg">
          Count:
          {' '}
          {count}
        </Text>
      </div>
      <IconButton
        icon={<SvgIcon name="icon-add" />}
        size="md"
        variant="primary"
        onPress={() => setCount((prev) => prev + 1)}
        aria-label="increment counter"
      >
      </IconButton>
      <Button
        variant="outline"
        size="md"
        onPress={() => setCount(0)}
      >
        Reset
      </Button>
    </div>
  );
}

function App() {
  const [selectedValue, setSelectedValue] = useState<string>('option1');

  return (
    <div className="min-h-screen bg-htmlBackground">
      <div className="mx-auto max-w-4xl px-4 py-12">
        {/* Header Section */}
        <div className="mb-12">
          <Title as="h1" size="2xl" margin>
            React Starter Kit
          </Title>
          <Text textStyle="body">
            A comprehensive starter page demonstrating the theme and component library.
          </Text>
        </div>

        {/* Typography Section */}
        <section className="mb-12 rounded-lg border border-app-border bg-gray-surface p-6 shadow-md">
          <Title as="h2" size="lg" margin>
            Typography
          </Title>
          <div className="space-y-4">
            <div>
              <Title as="h3" size="md" margin>
                Headings
              </Title>
              <Title as="h1" size="2xl">Heading 2XL</Title>
              <Title as="h2" size="xl">Heading XL</Title>
              <Title as="h3" size="lg">Heading LG</Title>
              <Title as="h4" size="md">Heading MD</Title>
            </div>
            <Divider orientation="horizontal" />
            <div>
              <Title as="h3" size="md" margin>
                Text Styles
              </Title>
              <Text textStyle="bodyEmphasized">Body Emphasized</Text>
              <Text textStyle="body">Body text - default paragraph style</Text>
              <Text textStyle="bodySmall">Body Small - for secondary information</Text>
              <Text textStyle="bodyExtraSmall">Body Extra Small - for fine print</Text>
              <Text textStyle="caption">Caption text</Text>
              <Text textStyle="label">Label text</Text>
            </div>
            <Divider orientation="horizontal" />
            <div>
              <Title as="h3" size="md" margin>
                Links
              </Title>
              <Link href="#" underline>Underlined Link</Link>
              <Text textStyle="body">
                {' '}
                or
                {' '}
                <Link href="#" underline={false}>Link without underline</Link>
              </Text>
            </div>
          </div>
        </section>

        {/* Buttons Section */}
        <section className="mb-12 rounded-lg border border-app-border bg-gray-surface p-6 shadow-md">
          <Title as="h2" size="lg" margin>
            Buttons
          </Title>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" size="md">Primary Button</Button>
            <Button variant="outline" size="md">Outline Button</Button>
            <Button variant="surface" size="md">Surface Button</Button>
            <Button variant="primary" size="sm">Small</Button>
            <Button variant="primary" size="md"> Medium</Button>
            <Button variant="primary" size="lg">Large</Button>
            <Button variant="primary" size="md" isDisabled>Disabled</Button>
          </div>
        </section>

        {/* Form Components Section */}
        <section className="mb-12 rounded-lg border border-app-border bg-gray-surface p-6 shadow-md">
          <Title as="h2" size="lg" margin>
            Form Components
          </Title>
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <TextInput
                label="Text Input"
                placeholder="Enter text here"
                description="This is a text input field"
                hint="optional"
              />
              <TextInput
                label="Required Field"
                placeholder="Required input"
                hint="required"
              />
            </div>
            <Search
              label="Search"
              placeholder="Search for something..."
              description="Try searching for anything"
            />
            <Slider
              label="Slider"
              minValue={0}
              maxValue={100}
              defaultValue={50}
            />
            <StaticSelect
              label="Select Dropdown"
              description="Choose an option"
              items={[
                { value: 'option1', label: 'Option 1' },
                { value: 'option2', label: 'Option 2' },
                { value: 'option3', label: 'Option 3' },
              ]}
              value={selectedValue}
              onChange={(value: string | number) => setSelectedValue(value as string)}
            />
            <Checkbox
              defaultSelected={true}
            >
              <Text textStyle="body">Checkbox option</Text>
            </Checkbox>
            <Checkbox rounded isDisabled>
              <Text textStyle="body">Rounded checkbox (unchecked)</Text>
            </Checkbox>
          </div>
        </section>

        {/* Info Box Section */}
        <section className="mb-12 rounded-lg border border-app-border bg-gray-surface p-6 shadow-md">
          <Title as="h2" size="lg" margin>
            Info Box
          </Title>
          <InfoBox message="This is an informational message displayed in an InfoBox component." />
        </section>

        {/* Jotai State Management Section */}
        <section className="mb-12 rounded-lg border border-app-border bg-gray-surface p-6 shadow-md">
          <Title as="h2" size="lg" margin>
            Jotai State Management
          </Title>
          <div className="space-y-4">
            <Text textStyle="body">
              This example demonstrates Jotai state management with a shared counter atom.
            </Text>
            <CounterExample />
          </div>
        </section>

        {/* Color Palette Section */}
        <section className="mb-12 rounded-lg border border-app-border bg-gray-surface p-6 shadow-md">
          <Title as="h2" size="lg" margin>
            Color Palette
          </Title>
          <div className="space-y-6">
            <div>
              <Title as="h3" size="md" margin>
                Accent Colors
              </Title>
              <div className="grid grid-cols-4 gap-2 md:grid-cols-6">
                <div className="flex flex-col">
                  <div className="h-16 w-full rounded border border-app-border bg-accent-1" />
                  <Text textStyle="caption" className="mt-1 text-center">
                    accent-1
                  </Text>
                </div>
                <div className="flex flex-col">
                  <div className="h-16 w-full rounded border border-app-border bg-accent-2" />
                  <Text textStyle="caption" className="mt-1 text-center">
                    accent-2
                  </Text>
                </div>
                <div className="flex flex-col">
                  <div className="h-16 w-full rounded border border-app-border bg-accent-3" />
                  <Text textStyle="caption" className="mt-1 text-center">
                    accent-3
                  </Text>
                </div>
                <div className="flex flex-col">
                  <div className="h-16 w-full rounded border border-app-border bg-accent-4" />
                  <Text textStyle="caption" className="mt-1 text-center">
                    accent-4
                  </Text>
                </div>
                <div className="flex flex-col">
                  <div className="h-16 w-full rounded border border-app-border bg-accent-5" />
                  <Text textStyle="caption" className="mt-1 text-center">
                    accent-5
                  </Text>
                </div>
                <div className="flex flex-col">
                  <div className="h-16 w-full rounded border border-app-border bg-accent-6" />
                  <Text textStyle="caption" className="mt-1 text-center">
                    accent-6
                  </Text>
                </div>
                <div className="flex flex-col">
                  <div className="h-16 w-full rounded border border-app-border bg-accent-7" />
                  <Text textStyle="caption" className="mt-1 text-center">
                    accent-7
                  </Text>
                </div>
                <div className="flex flex-col">
                  <div className="h-16 w-full rounded border border-app-border bg-accent-8" />
                  <Text textStyle="caption" className="mt-1 text-center">
                    accent-8
                  </Text>
                </div>
                <div className="flex flex-col">
                  <div className="h-16 w-full rounded border border-app-border bg-accent-9" />
                  <Text textStyle="caption" className="mt-1 text-center">
                    accent-9
                  </Text>
                </div>
                <div className="flex flex-col">
                  <div className="h-16 w-full rounded border border-app-border bg-accent-10" />
                  <Text textStyle="caption" className="mt-1 text-center">
                    accent-10
                  </Text>
                </div>
                <div className="flex flex-col">
                  <div className="h-16 w-full rounded border border-app-border bg-accent-11" />
                  <Text textStyle="caption" className="mt-1 text-center">
                    accent-11
                  </Text>
                </div>
                <div className="flex flex-col">
                  <div className="h-16 w-full rounded border border-app-border bg-accent-12" />
                  <Text textStyle="caption" className="mt-1 text-center">
                    accent-12
                  </Text>
                </div>
              </div>
            </div>
            <Divider orientation="horizontal" />
            <div>
              <Title as="h3" size="md" margin>
                Gray Scale
              </Title>
              <div className="grid grid-cols-4 gap-2 md:grid-cols-6">
                <div className="flex flex-col">
                  <div className="h-16 w-full rounded border border-app-border bg-gray-1" />
                  <Text textStyle="caption" className="mt-1 text-center">
                    gray-1
                  </Text>
                </div>
                <div className="flex flex-col">
                  <div className="h-16 w-full rounded border border-app-border bg-gray-2" />
                  <Text textStyle="caption" className="mt-1 text-center">
                    gray-2
                  </Text>
                </div>
                <div className="flex flex-col">
                  <div className="h-16 w-full rounded border border-app-border bg-gray-3" />
                  <Text textStyle="caption" className="mt-1 text-center">
                    gray-3
                  </Text>
                </div>
                <div className="flex flex-col">
                  <div className="h-16 w-full rounded border border-app-border bg-gray-4" />
                  <Text textStyle="caption" className="mt-1 text-center">
                    gray-4
                  </Text>
                </div>
                <div className="flex flex-col">
                  <div className="h-16 w-full rounded border border-app-border bg-gray-5" />
                  <Text textStyle="caption" className="mt-1 text-center">
                    gray-5
                  </Text>
                </div>
                <div className="flex flex-col">
                  <div className="h-16 w-full rounded border border-app-border bg-gray-6" />
                  <Text textStyle="caption" className="mt-1 text-center">
                    gray-6
                  </Text>
                </div>
                <div className="flex flex-col">
                  <div className="h-16 w-full rounded border border-app-border bg-gray-7" />
                  <Text textStyle="caption" className="mt-1 text-center">
                    gray-7
                  </Text>
                </div>
                <div className="flex flex-col">
                  <div className="h-16 w-full rounded border border-app-border bg-gray-8" />
                  <Text textStyle="caption" className="mt-1 text-center">
                    gray-8
                  </Text>
                </div>
                <div className="flex flex-col">
                  <div className="h-16 w-full rounded border border-app-border bg-gray-9" />
                  <Text textStyle="caption" className="mt-1 text-center">
                    gray-9
                  </Text>
                </div>
                <div className="flex flex-col">
                  <div className="h-16 w-full rounded border border-app-border bg-gray-10" />
                  <Text textStyle="caption" className="mt-1 text-center">
                    gray-10
                  </Text>
                </div>
                <div className="flex flex-col">
                  <div className="h-16 w-full rounded border border-app-border bg-gray-11" />
                  <Text textStyle="caption" className="mt-1 text-center">
                    gray-11
                  </Text>
                </div>
                <div className="flex flex-col">
                  <div className="h-16 w-full rounded border border-app-border bg-gray-12" />
                  <Text textStyle="caption" className="mt-1 text-center">
                    gray-12
                  </Text>
                </div>
              </div>
            </div>
            <Divider orientation="horizontal" />
            <div>
              <Title as="h3" size="md" margin>
                Semantic Colors
              </Title>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <div className="flex flex-col">
                  <div className="h-16 w-full rounded border border-app-border bg-htmlBackground" />
                  <Text textStyle="caption" className="mt-1 text-center">
                    htmlBackground
                  </Text>
                </div>
                <div className="flex flex-col">
                  <div className="h-16 w-full rounded border border-app-border bg-accent" />
                  <Text textStyle="caption" className="mt-1 text-center">
                    accent
                  </Text>
                </div>
                <div className="flex flex-col">
                  <div className="h-16 w-full rounded border border-app-border bg-app-border" />
                  <Text textStyle="caption" className="mt-1 text-center">
                    app-border
                  </Text>
                </div>
                <div className="flex flex-col">
                  <div className="h-16 w-full rounded border border-app-border bg-fg" />
                  <Text textStyle="caption" className="mt-1 text-center">
                    fg
                  </Text>
                </div>
                <div className="flex flex-col">
                  <div className="h-16 w-full rounded border border-app-border bg-muted" />
                  <Text textStyle="caption" className="mt-1 text-center">
                    muted
                  </Text>
                </div>
                <div className="flex flex-col">
                  <div className="h-16 w-full rounded border border-app-border bg-gray-surface" />
                  <Text textStyle="caption" className="mt-1 text-center">
                    gray-surface
                  </Text>
                </div>
                <div className="flex flex-col">
                  <div className="h-16 w-full rounded border border-app-border bg-accent-surface" />
                  <Text textStyle="caption" className="mt-1 text-center">
                    accent-surface
                  </Text>
                </div>
              </div>
            </div>
            <Divider orientation="horizontal" />
            <div>
              <Title as="h3" size="md" margin>
                BAS Colors
              </Title>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <div className="flex flex-col">
                  <div className="h-16 w-full rounded border border-app-border bg-dark-blue" />
                  <Text textStyle="caption" className="mt-1 text-center">
                    dark-blue
                  </Text>
                </div>
                <div className="flex flex-col">
                  <div className="h-16 w-full rounded border border-app-border bg-light-blue" />
                  <Text textStyle="caption" className="mt-1 text-center">
                    light-blue
                  </Text>
                </div>
                <div className="flex flex-col">
                  <div className="h-16 w-full rounded border border-app-border bg-bright-blue" />
                  <Text textStyle="caption" className="mt-1 text-center">
                    bright-blue
                  </Text>
                </div>
                <div className="flex flex-col">
                  <div className="h-16 w-full rounded border border-app-border bg-dark-gray" />
                  <Text textStyle="caption" className="mt-1 text-center">
                    dark-gray
                  </Text>
                </div>
                <div className="flex flex-col">
                  <div className="h-16 w-full rounded border border-app-border bg-seasalt" />
                  <Text textStyle="caption" className="mt-1 text-center">
                    seasalt
                  </Text>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 border-t border-app-border pt-6">
          <Text textStyle="bodySmall" className="text-accent text-center">
            Built with React, TanStack Router, and Tailwind CSS
          </Text>
        </footer>
      </div>
    </div>
  );
}
