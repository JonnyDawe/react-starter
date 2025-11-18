import type { SliderProps as AriaSliderProps } from 'react-aria-components';
import {
  Slider as AriaSlider,

  SliderOutput,
  SliderThumb,
  SliderTrack,
} from 'react-aria-components';

import { Label } from '@/components/atoms/Forms/Field';

import { appTwVariants, composeTailwindRenderProps } from '@/lib/helpers/tailwind-utils';
import { focusRing } from '@/styles/recipes/focusRing';

const trackStyles = appTwVariants({
  base: 'relative h-[24px] w-full',
  variants: {
    orientation: {
      horizontal:
        'before:absolute before:top-1/2 before:h-[4px] before:w-full before:-translate-y-1/2 before:rounded-sm before:border-1 before:border-app-border before:bg-gray-a3',
      vertical: 'ml-[50%] h-full w-[5px] -translate-x-[50%]',
    },
  },
});

const thumbStyles = appTwVariants({
  extend: focusRing,
  base: 'top-1/2 h-4 w-4 rounded-full border-4 border-accent bg-gray-2',
  variants: {
    isDragging: {
      true: 'border-accent-11',
    },
    isDisabled: {
      true: 'border-accent-a11',
    },
  },
});

export interface SliderProps<T> extends AriaSliderProps<T> {
  label?: string
  thumbLabels?: string[]
}

export function Slider<T extends number | number[]>({
  label,
  thumbLabels,
  ...props
}: SliderProps<T>) {
  return (
    <AriaSlider {...props} className={composeTailwindRenderProps(props.className, 'slider')}>
      <Label className="slider-label">{label}</Label>
      <SliderOutput className="slider-output mr-2 text-sm font-normal text-gray-11">
        {({ state }) => state.values.map((_, i) => state.getThumbValueLabel(i)).join(' – ')}
      </SliderOutput>
      <SliderTrack className="slider-track group mx-2 flex items-center">
        {({ state, ...renderProps }) => (
          <>
            <div className={trackStyles(renderProps)} />
            {state.values.map((_, i) => (
              <SliderThumb
                key={i}
                index={i}
                aria-label={thumbLabels?.[i]}
                className={thumbStyles}
              />
            ))}
          </>
        )}
      </SliderTrack>
    </AriaSlider>
  );
}
