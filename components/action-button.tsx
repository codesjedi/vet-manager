'use client';

import { useRouter } from 'next/navigation';
import { FC } from 'react';

interface ActionButtonProps {
  children: React.ReactNode;
  to?: string;
}

export const ActionButton: FC<ActionButtonProps> = ({
  children,
  to,
  ...props
}) => {
  const { push } = useRouter();
  return (
    <button
      className="inline-flex items-center justify-center rounded-md bg-gray-900 px-2 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
      onClick={() => {
        if (to) {
          push(to);
        }
      }}
      {...props}
    >
      {children}
    </button>
  );
};
