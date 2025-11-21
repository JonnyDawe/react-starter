import { useSeparator } from 'react-aria';
import { tv } from 'tailwind-variants';

const dividerRecipe = tv({
  base: 'bg-accent-8',
  variants: {
    inline: {
      true: 'inline-block',
      false: 'block',
    },
    orientation: {
      vertical: 'h-full w-[1px]',
      horizontal: 'h-[1px] w-full',
    },
  },
});
export function Divider(props: {
  orientation: 'vertical' | 'horizontal'
  inline?: boolean
  className?: string
}) {
  const { separatorProps } = useSeparator(props);

  return (
    <div
      className={dividerRecipe({
        orientation: props.orientation,
        inline: props.inline,
        className: props.className,
      })}
      {...separatorProps}
    />
  );
}
