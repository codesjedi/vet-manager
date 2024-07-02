import PageTitle from '@/components/page-title';
import { cookiesClient } from '@/lib/amplify-utils';

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
      {pets.length > 0 ? (
        <ul>
          {pets.map((pet: any) => (
            <li key={pet.id}>
              <p>{pet.name}</p>
              <p>{pet.type}</p>
              <p>{pet.breed}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="w-full h-[80vh] flex justify-center items-center">
          <p>No hay mascotas registradas 🐾</p>
        </div>
      )}
    </div>
  );
};

export default OwnerPetsPage;
