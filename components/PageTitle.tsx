import Link from 'next/link';
import { FC } from 'react';

import { Button } from '@/components/ui/button';

interface PageTitleProps {
  title: string;
  button?: {
    title: string;
    path: string;
  };
}

const PageTitle: FC<PageTitleProps> = ({ title, button }) => {
  return (
    <div className="px-6 py-4 flex items-center justify-between">
      <h2 className="text-lg font-medium">{title}</h2>
      {button ? (
        <Link href={button.path}>
          <Button size={'sm'}>{button.title}</Button>
        </Link>
      ) : null}
    </div>
  );
};

export default PageTitle;
