import React, { FC } from 'react';
import { MoveHorizontalIcon } from 'lucide-react';
import Link from 'next/link';

import { Card, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';

const PetCard: FC<{ id?: string | null; name: string; breed: string }> = ({
  id,
  name,
  breed,
}) => {
  const avatar = '/placeholder-pet.jpg';
  const emoji = '🐶';
  return (
    <Card key={id}>
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar id={id as string}>
          <AvatarImage alt={`${name}'s avatar`} src={avatar} />
          <AvatarFallback>{emoji}</AvatarFallback>
        </Avatar>
        <div className="grid gap-1">
          <Link href={`/pet/${id}`}>
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
