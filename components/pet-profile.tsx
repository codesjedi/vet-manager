'use client';

import { FC } from 'react';
import { StorageImage } from '@aws-amplify/ui-react-storage';

import { AvatarFallback, Avatar } from '@/components/ui/avatar';
import { CardHeader, CardContent, Card, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
// import GeolocationFetcher from '@/app/components/GeolocationFetcher';
import { ActionButton } from '@/components/action-button';
import Link from 'next/link';

export interface PetProfileProps {
  name: string;
  phone: string;
  email: string;
  medicine: string;
  diseases: string;
  age: string;
  id: string;
  avatarUrl?: string;
}

const PetProfile: FC<PetProfileProps> = ({
  name,
  phone,
  email,
  medicine,
  diseases,
  age,
  id,
  avatarUrl,
}) => {
  const latitude = 37.7749; // Default to San Francisco
  const longitude = -122.4194; // Default to San Francisco
  const mapSrc = `https://www.google.com/maps?q=${latitude},${longitude}&hl=es&z=14&output=embed`;
  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col items-center">
          <Avatar className="relative h-48 w-48 overflow-hidden" id={id}>
            {avatarUrl ? (
              <StorageImage
                path={avatarUrl}
                alt="avatar"
                fallbackSrc="https://placehold.co/150?text=..."
                className="w-full h-full rounded-md object-cover"
              />
            ) : null}
          </Avatar>
          <CardTitle className="mt-4 text-2xl font-bold">{name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-around">
            <Link href={`tel:${phone}`}>
              <ActionButton>
                <PhoneIcon className="mr-2 h-4 w-4" />
                Llamar al humano
              </ActionButton>
            </Link>
            <ActionButton>
              <PhoneIcon className="mr-2 h-4 w-4" />
              Whatsapp
            </ActionButton>
            <ActionButton to={`/history/${id}`}>
              <HistoryIcon className="mr-2 h-4 w-4" />
              Historial
            </ActionButton>
          </div>
          <Link href={`mailto:${email}`} className="my-4">
            <div className="flex items-center gap-4">
              <MailIcon className="h-6 w-6 text-gray-500 " />
              <div className="text-gray-500 ">{email}</div>
            </div>
          </Link>
          <Separator />
          {/* <div className="h-[300px] w-full rounded-lg overflow-hidden">
            <iframe
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="no"
              marginHeight={0}
              marginWidth={0}
              src={mapSrc}
            ></iframe>
          </div> */}
          <Separator />
          <div className="grid gap-4">
            <div className="grid gap-2">
              <div className="font-medium">Medicinas</div>
              <div className="text-gray-500 ">
                {medicine || 'No toma medicine'}
              </div>
            </div>
            <div className="grid gap-2">
              <div className="font-medium">diseases</div>
              <div className="text-gray-500 ">{diseases}</div>
            </div>
            <div className="grid gap-2">
              <div className="font-medium">Edad</div>
              <div className="text-gray-500 ">{age}</div>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* <GeolocationFetcher /> */}
    </div>
  );
};

function MailIcon(props: any) {
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
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function PhoneIcon(props: any) {
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
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

const HistoryIcon = (props: any) => (
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
    <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10-10-4.477-10-10 4.477-10 10-10zM12 6v6l4 2" />
  </svg>
);

export default PetProfile;
