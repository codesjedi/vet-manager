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
import { cookiesClient } from '@/lib/amplify-utils';

export function NewPetOwnerForm() {
  const createOwner = async (formData: FormData) => {
    'use server';
    try {
      const name = formData.get('name') as string;
      const lastName = formData.get('lastName') as string;
      const email = formData.get('email') as string;
      const phone = formData.get('phone') as string;
      const queryResult = await cookiesClient.models.owner.create({
        name,
        lastName,
        email,
        phone,
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Card className="w-full max-w-md mx-auto">
      <form action={createOwner}>
        <CardHeader>
          <CardTitle>Crear Nuevo Dueño de Mascota</CardTitle>
          <CardDescription>
            Ingrese la información del dueño a continuación.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Nombre</Label>
            <Input
              id="name"
              placeholder="Ingrese el nombre del dueño"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Correo Electrónico</Label>
            <Input
              id="email"
              type="email"
              placeholder="Ingrese el correo electrónico del dueño"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Teléfono</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Ingrese el número de teléfono del dueño"
              required
            />
          </div>
          {/* {error && <p className="text-red-500">{error}</p>} */}
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Crear Dueño
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
