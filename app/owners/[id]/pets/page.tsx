import PageTitle from '@/components/page-title';
import PetCard from '@/components/pet-card';
import { cookiesClient } from '@/lib/amplify-utils';

export interface PetValue {
  name: string;
  ownerId: string;
  breed: string;
  type: string;
  readonly updatedAt: string;
  id?: Nullable<string>;
  diseases?: Nullable<string>;
  medicine?: Nullable<string>;
  birthDate?: Nullable<string>;
  createdAt?: Nullable<string>;
  avatarUrl?: Nullable<string>;
}

export type Nullable<T> = T | null | undefined;

const OwnerPetsPage = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const { data: humano } = await cookiesClient.models.owner.get({
    id: params.id,
  });
  const { data: pets } = await cookiesClient.models.pet.list({
    filter: {
      ownerId: {
        eq: params.id,
      },
    },
  });
  return (
    <div>
      <PageTitle
        title={`Mascotas de ${humano?.name} ${humano?.lastName}`}
        button={{
          title: 'Cargar mascota',
          path: `/owners/${params.id}/pets/create`,
        }}
        back="/"
      />
      <div className="grid grid-cols-3 gap-4 mx-8">
        {pets.length > 0 ? (
          pets.map((pet: PetValue) => <PetCard key={pet.id} {...pet} />)
        ) : (
          <div className="w-full h-[80vh] flex justify-center items-center">
            <p>No hay mascotas registradas 🐾</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerPetsPage;
