import React from 'react';
import Link from 'next/link';

import Logout from './Logout';

const Navbar = () => {
  return (
    <header className="flex items-center justify-between h-16 px-4 border-b shrink-0 md:px-6">
      <Link
        className="flex items-center gap-2 text-lg font-semibold sm:text-base mr-4"
        href="/"
      >
        <PawPrintIcon className="w-6 h-6" />
        <span>QR Finder</span>
      </Link>
      <div>
        <Link href="/owners" className="text-gray-900 m-4">
          Clientes
        </Link>
        <Logout />
      </div>
    </header>
  );
};

function PawPrintIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="4" r="2" />
      <circle cx="18" cy="8" r="2" />
      <circle cx="20" cy="16" r="2" />
      <path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z" />
    </svg>
  );
}

export default Navbar;
