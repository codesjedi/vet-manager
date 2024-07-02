import { CreatePetForm } from '@/components/create-pet-form';
import PageTitle from '@/components/page-title';
import { cookiesClient } from '@/lib/amplify-utils';
import { logger } from '@/lib/logger';
import { PageParams } from '@/types/PageParams';
import { FC } from 'react';

const CreatePetPage: FC<PageParams> = async ({ params }) => {
  const { data: humano } = await cookiesClient.models.owner.get({
    id: params.id,
  });
  const createPet = async (formData: FormData) => {
    'use server';
    try {
      const name = formData.get('name') as string;
      const type = formData.get('type') as string;
      const breed = formData.get('breed') as string;
      const medicine = formData.get('medicine') as string;
      const diseases = formData.get('diseases') as string;
      const birthDate = formData.get('birthDate') as string;
      const avatarUrl = formData.get('avatarUrl') as string;
      const ownerId = params.id;
      const queryResult = await cookiesClient.models.pet.create({
        name,
        type,
        breed,
        medicine,
        diseases,
        birthDate,
        avatarUrl,
        ownerId,
      });
      logger('query result', queryResult);
      logger('query', {
        name,
        type,
        breed,
        medicine,
        diseases,
        birthDate,
        avatarUrl,
        ownerId,
      });
      if (queryResult.errors) {
        throw new Error(queryResult.errors[0].message);
      }
    } catch (error) {
      throw new Error('Error al crear mascota');
    }
  };
  return (
    <div>
      <PageTitle title="Cargar mascota" back={`/owners/${params.id}/pets`} />
      <CreatePetForm onSubmit={createPet} ownerId={humano?.name as string} />
    </div>
  );
};

export default CreatePetPage;
