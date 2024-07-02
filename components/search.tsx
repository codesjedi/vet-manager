'use client';

import React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

import { Input } from './ui/input';
import { Button } from './ui/button';

const Search = () => {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleSubmit = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('search', term);
    replace(`${pathname}?${params.toString()}`);
  });

  return (
    <form className="flex-1">
      <Input
        className="bg-white"
        placeholder="Buscar mascotas..."
        onChange={(e) => handleSubmit(e.target.value)}
        defaultValue={searchParams.get('search')?.toString()}
      />
      <Button className="sr-only" type="submit">
        Buscar
      </Button>
    </form>
  );
};

export default Search;
