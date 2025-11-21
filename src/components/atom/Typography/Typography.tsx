import type { LinkProps as AriaLinkProps } from 'react-aria-components';
import type { VariantProps } from 'tailwind-variants';
import type { LinkRecipeProps, TextRecipeProps, TitleRecipeProps } from '@/styles/recipes/typography';

import * as React from 'react';
import {
  Link as AriaLink,

  composeRenderProps,
} from 'react-aria-components';
import {
  linkRecipe,

  textRecipe,

  titleRecipe,

} from '@/styles/recipes/typography';

type TextProps = TextRecipeProps
  & React.HTMLAttributes<HTMLElement> & {
    as?: 'p' | 'span' | 'figcaption' | 'li' | 'em'
  };

export function Text({ className, ...props }: TextProps) {
  const {
    as: Component = 'p',
    children,
    textStyle,
    margin,
    bold,
    italic,
    underline,
    listitem,
    ...rest
  } = props;

  return (
    <Component
      className={textRecipe({
        className,
        textStyle,
        margin,
        bold,
        italic,
        underline,
        listitem,
      })}
      {...rest}
    >
      {children}
    </Component>
  );
}

export function Em(props: Omit<TextProps, 'as'>) {
  return <Text {...props} as="em" className="text-accent" bold={false} italic={true} />;
}

type LinkProps = LinkRecipeProps & AriaLinkProps;

export function Link(props: LinkProps) {
  const { className, underline, textStyle, margin, bold, italic, listitem, ...rest } = props;

  return (
    <AriaLink
      className={composeRenderProps(className, (className, renderProps) => {
        return linkRecipe({
          className,
          underline,
          textStyle,
          margin,
          bold,
          italic,
          listitem,
          isFocusVisible: renderProps.isFocusVisible,
        } as VariantProps<typeof linkRecipe>);
      })}
      {...rest}
    />
  );
}

export function MailTo(props: LinkProps) {
  return <Link href={`mailto:${props.children}` as AriaLinkProps['href']}>{props.children}</Link>;
}

function addLineBreaks(input: string): React.ReactNode {
  return input.split('_').reduce((acc, part, index, array) => {
    if (index < array.length - 1) {
      return acc.concat(part, '_', <wbr key={index} />);
    }
    return acc.concat(part);
  }, [] as React.ReactNode[]);
}

export function TextUnderScoreBreak({ children, ...props }: TextProps) {
  return (
    <Text {...props}>{typeof children === 'string' ? addLineBreaks(children) : children}</Text>
  );
}

type TitleProps = TitleRecipeProps
  & React.HTMLAttributes<HTMLHeadingElement> & {
    as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  };

export function Title({ as, className, ...props }: TitleProps) {
  const { margin, size, bold, italic, underline, listitem, children, ...rest } = props;

  const Component = as;
  return (
    <Component
      className={titleRecipe({
        className,
        margin,
        size,
        bold,
        italic,
        underline,
        listitem,
      })}
      {...rest}
    >
      {children}
    </Component>
  );
}
