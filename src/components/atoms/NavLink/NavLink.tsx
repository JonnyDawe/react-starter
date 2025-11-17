import type { LinkProps as TanstackLinkProps } from '@tanstack/react-router';
import type { LinkProps } from 'react-aria-components';
import { useLocation } from '@tanstack/react-router';
import { composeRenderProps, Link } from 'react-aria-components';

import { focusRing } from '@/styles/recipes/focusRing';

import { appTwVariants } from '../../../lib/helpers/tailwind-utils';

const navlinkrecipe = appTwVariants({
  extend: focusRing,
  base: 'relative px-4 py-1 text-lg font-semibold text-accent-contrast outline-gray-12! after:absolute after:bottom-0 after:left-0 after:h-1 after:w-full after:bg-transparent after:transition-all after:duration-50 after:content-[""] hover:bg-accent-surface hover:text-fg',
  variants: {
    isActive: {
      true: 'bg-secondary text-fg after:h-1 after:bg-BAS-red hover:after:h-1.5',
    },
  },
});

type NavLinkProps = LinkProps & {
  children: React.ReactNode
  className?: string
  href: TanstackLinkProps['href']
};

export function NavLink({ className, href, children, ...props }: NavLinkProps) {
  const location = useLocation();
  const isActive = location.pathname === href;

  return (
    <Link
      href={href}
      className={composeRenderProps(className, (className, renderProps) =>
        navlinkrecipe({ className, isActive, ...renderProps }),
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
