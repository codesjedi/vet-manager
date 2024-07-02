'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from './ui/use-toast';
import { FC, FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

interface NewPetOwnerFormProps {
  onSubmit: (args: any) => Promise<void>;
}
export const NewPetOwnerForm: FC<NewPetOwnerFormProps> = ({ onSubmit }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { push } = useRouter();
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    try {
      setIsLoading(true);
      await onSubmit(formData);
      push('/owners');
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error al crear dueño',
        description: 'Ocurrió un error al intentar crear el dueño.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Crear Nuevo Humano</CardTitle>
          <CardDescription>
            Ingrese la información del dueño a continuación.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Nombre</Label>
            <Input
              id="name"
              name="name"
              placeholder="Ingrese el nombre del dueño"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="lastName">Apellido</Label>
            <Input
              id="lastName"
              name="lastName"
              placeholder="Ingrese el apellido del dueño"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Correo Electrónico</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Ingrese el correo electrónico del dueño"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Teléfono</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="Ingrese el número de teléfono del dueño"
              required
            />
          </div>
          {/* {error && <p className="text-red-500">{error}</p>} */}
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            {isLoading ? `Cargando...` : `Cargar dueño`}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
