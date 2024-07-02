'use client';

import React, { useState, FormEvent, FC } from 'react';
import { StorageManager } from '@aws-amplify/ui-react-storage';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Button } from '../components/ui/button';
import { useToast } from './ui/use-toast';
import { useRouter } from 'next/navigation';
interface CreatePetFormProps {
  onSubmit: (formData: FormData) => Promise<void>;
  ownerId: string;
  ownerName: string;
}

export const CreatePetForm: FC<CreatePetFormProps> = ({
  onSubmit,
  ownerId,
  ownerName,
}) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>('');
  const { toast } = useToast();
  const { push } = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      if (!avatarUrl) {
        throw new Error('Por favor, suba una foto de la mascota.');
      }
      formData.append('avatarUrl', avatarUrl);
      await onSubmit(formData);
      push(`/owners/${ownerId}/pets`);
    } catch (error) {
      console.error('Error al crear el perfil de la mascota:', error);
      // Aquí puedes manejar errores, mostrar mensajes al usuario, etc.
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>{`Nueva mascota para ${ownerName}`}</CardTitle>
          <CardDescription>
            Complete el formulario para crear un nuevo perfil para su mascota.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Nombre de la Mascota</Label>
            <Input
              id="name"
              name="name"
              placeholder="Ingrese el nombre de la mascota"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="type">Tipo de Mascota</Label>
            <Input
              id="type"
              name="type"
              placeholder="Ingrese el tipo de la mascota (xej: gato, perro, etc)"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="breed">Raza</Label>
            <Input
              id="breed"
              name="breed"
              placeholder="Ingrese la raza de la mascota"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="medicine">Medicina</Label>
            <Textarea
              id="medicine"
              name="medicine"
              placeholder="Liste los medicamentos actuales que toma la mascota"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="diseases">Enfermedades Conocidas</Label>
            <Textarea
              id="diseases"
              name="diseases"
              placeholder="Liste las enfermedades o condiciones conocidas de la mascota"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="birthDate">Fecha de Nacimiento</Label>
            <Input id="birthDate" name="birthDate" type="date" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="foto">Foto de la Mascota</Label>
            <StorageManager
              maxFileCount={1}
              path={`avatars/${ownerId}/`}
              acceptedFileTypes={['image/*']}
              // accessLevel="protected"
              displayText={{
                dropFilesText: 'Arrastre y suelte una imagen aquí',
                browseFilesText: 'o haga clic para seleccionar una imagen',
              }}
              onUploadSuccess={(result) => {
                setAvatarUrl(result.key);
              }}
              onUploadError={(error) => {
                console.error('Error al subir la imagen:', error);
                setAvatarUrl(undefined);
                toast({
                  title: 'Error al subir la imagen',
                  description: error,
                });
              }}
              onFileRemove={() => {
                setAvatarUrl(undefined);
              }}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting || !avatarUrl}
          >
            {isSubmitting ? 'Creando Perfil...' : 'Crear Perfil'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
