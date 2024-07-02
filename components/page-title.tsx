import Link from 'next/link';
import { FC } from 'react';

import { Button } from '@/components/ui/button';

interface PageTitleProps {
  title: string;
  button?: {
    title: string;
    path: string;
  };
  back?: string;
}

const PageTitle: FC<PageTitleProps> = ({ title, button, back }) => {
  return (
    <div className="px-6 py-4 flex items-center justify-between">
      {back ? (
        <Link href={back} className="text-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </Link>
      ) : null}
      <h2 className="text-lg font-medium">{title}</h2>
      <div>
        {button ? (
          <Link href={button.path}>
            <Button size={'sm'}>{button.title}</Button>
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default PageTitle;
