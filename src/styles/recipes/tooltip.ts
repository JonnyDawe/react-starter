import { appTwVariants } from '@/lib/helpers/tailwind-utils';

export const tooltipRecipe = appTwVariants({
  slots: {
    root: [
      // shared animation config
      'duration-150',

      // Base entering animation
      'entering:ease-out entering:motion-safe:animate-in entering:motion-safe:fade-in',

      'entering:placement-top:motion-safe:slide-in-from-bottom-10',
      'entering:placement-right:motion-safe:slide-in-from-left-10',
      'entering:placement-bottom:motion-safe:slide-in-from-top-10',
      'entering:placement-left:motion-safe:slide-in-from-right-10',

      // Base exiting animation
      'exiting:motion-safe:animate-out exiting:motion-safe:fade-out',

      'exiting:ease-in',
      'exiting:motion-safe:animate-reverse',
    ],
    container: [
      // Base container styles
      'relative',
      'rounded-sm',
      'border',
      'max-w-60',
      'py-1',
      'px-2',
      'text-sm',
      'border-gray-12',
      'text-white',
      'bg-gray-12',
      'shadow-sm',
    ],
    arrow: [
      'group-placement-top:-translate-y-px group-placement-top:rotate-0',
      'group-placement-right:translate-x-px group-placement-right:rotate-90',
      'group-placement-bottom:translate-y-px group-data-[placement=bottom]:rotate-180',
      'group-placement-left:-translate-x-px group-placement-left:-rotate-90',
    ],
    triangle: 'fill-gray-12 stroke-gray-12',
    triangleStroke: 'hidden stroke-gray-12 stroke-1',
  },
});
