'use client';

import React, { useState, ChangeEvent, FormEvent, FC } from 'react';
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

interface CreatePetFormProps {
  onSubmit: (args: any) => Promise<void>;
  ownerId: string;
}

export const CreatePetForm: FC<CreatePetFormProps> = async ({
  onSubmit,
  ownerId,
}) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // manage the logic to upload the file to aws amplify storage

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const avatarUrl = reader.result as string;
      console.log('Avatar URL:', avatarUrl);
    };
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await onSubmit(new FormData(e.currentTarget));
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
          <CardTitle>{`Nueva mascota para ${ownerId}`}</CardTitle>
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
            <Input
              id="avatarUrl"
              name="avatarUrl"
              type="file"
              required
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Creando Perfil...' : 'Crear Perfil'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
