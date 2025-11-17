import { SvgIcon } from '@/components/atoms/SvgIcon';
import { Text } from '@/components/atoms/Typography';
import { appTwVariants } from '@/lib/helpers/tailwind-utils';

type InfoBoxProps = React.PropsWithChildren<{
  className?: string
  message: string
}>;

const infoBoxRecipe = appTwVariants({
  base: 'flex gap-2 rounded-sm bg-gray-a3 p-2',
});

export function InfoBox({ className, message }: InfoBoxProps) {
  return (
    <div className={infoBoxRecipe({ className })}>
      <SvgIcon className="h-[22px] shrink-0 align-middle" name="icon-info" size={16} />
      <Text textStyle="body">{message}</Text>
    </div>
  );
}
