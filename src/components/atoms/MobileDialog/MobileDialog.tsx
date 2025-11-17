import { useClickOutside } from '@mantine/hooks';
import { motion } from 'framer-motion';
import * as React from 'react';

import { CloseButton } from '@/components/atoms/Button';
import { appTwVariants } from '@/lib/helpers/tailwind-utils';
import { useCallbackRef } from '@/lib/hooks/useCallbackRef';

import { Title } from '../Typography';

interface MobileSideDialogProps {
  isOpen: boolean
  title?: string
  animate?: boolean
  hasCloseBtn?: boolean
  onClose?: () => void
  isModal?: boolean
  footer?: React.ComponentType | React.FunctionComponent
  className?: string
}

const dialogRecipe = appTwVariants({
  slots: {
    root: 'color-accent-contrast pointer-events-auto fixed top-0 left-0 h-full border-r-4 border-black bg-accent-9',
    closeBtn: 'absolute top-2 right-2 outline-black',
    header: 'flex flex-row justify-between p-4',
    content: 'flex-1 overflow-y-auto px-8 py-4',
    footer: 'p-4',
  },
});

export function MobileDialog({
  isOpen,
  title,
  hasCloseBtn = true,
  animate = true,
  onClose,
  children,
  footer: Footer,
  isModal = true,
  className,
}: React.PropsWithChildren<MobileSideDialogProps>) {
  const modalRef = React.useRef<HTMLDialogElement | null>(null);

  const getDialogRef = useCallbackRef((node: HTMLDialogElement | null) => {
    if (node !== null) {
      modalRef.current = node;
      if (isOpen) {
        node.showModal();
      }
    }
  });

  const toggleVisibility = React.useCallback(
    (visible: boolean) => {
      const modalElement = modalRef.current;
      if (modalElement) {
        if (visible) {
          if (isModal) {
            modalElement.showModal();
          } else {
            modalElement.show();
          }
        } else {
          if (onClose) {
            onClose();
          }

          modalElement.close();
        }
      }
    },
    [onClose, isModal],
  );

  React.useEffect(() => {
    toggleVisibility(isOpen);
  }, [isOpen, toggleVisibility]);

  const { root, closeBtn, header, content, footer } = dialogRecipe({ className });

  const clickOutsideRef = useClickOutside(() => toggleVisibility(false));

  return (
    <motion.dialog
      ref={(ref) => {
        getDialogRef(ref);
        clickOutsideRef.current = ref;
      }}
      onClose={() => toggleVisibility(false)}
      animate={animate ? { width: isOpen ? '80%' : '50%', opacity: isOpen ? 1 : 0.8 } : undefined}
      transition={{
        type: 'spring',
        stiffness: 460,
        damping: 35,
        restDelta: 0.01,
      }}
      className={root()}
    >
      {hasCloseBtn && (
        <CloseButton className={closeBtn()} onPress={() => toggleVisibility(false)} />
      )}
      <div className="flex flex-col items-stretch">
        {title && (
          <div className={header()}>
            <Title as="h2" size="lg">
              {title}
            </Title>
          </div>
        )}
        <div className={content()}>{children}</div>
        {Footer && (
          <div className={footer()}>
            <Footer />
          </div>
        )}
      </div>
    </motion.dialog>
  );
}
