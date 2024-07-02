'use client';
import React, { FC } from 'react';
import { MoveHorizontalIcon } from 'lucide-react';
import Link from 'next/link';

import '@aws-amplify/ui-react/styles.css';

import { Card, CardDescription, CardHeader, CardTitle } from './ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import { StorageImage } from '@aws-amplify/ui-react-storage';
import { PetValue } from '@/app/owners/[id]/pets/page';

const PetCard: FC<PetValue> = ({ id, name, breed, avatarUrl }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        {avatarUrl ? (
          <div className="relative w-20 h-20 rounded-md overflow-hidden">
            <StorageImage
              path={`${avatarUrl}`}
              alt={`${name}'s profile picture`}
              className="object-cover w-full h-full rounded-full"
              fallbackSrc="https://placehold.co/150?text=..."
            />
          </div>
        ) : null}

        <div className="grid gap-1">
          <Link href={`/pets/${id}`}>
            <CardTitle>{name}</CardTitle>
          </Link>
          <CardDescription>{breed}</CardDescription>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="ml-auto" size="icon" variant="ghost">
              <MoveHorizontalIcon className="w-4 h-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem href={`/pet/${id}`}>View Pet</DropdownMenuItem>
            <DropdownMenuItem>Edit Pet</DropdownMenuItem>
            <DropdownMenuItem>Delete Pet</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
    </Card>
  );
};

export default PetCard;
