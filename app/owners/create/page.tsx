import { NewPetOwnerForm } from '@/components/create-owner-form';
import { cookiesClient } from '@/lib/amplify-utils';
import { logger } from '@/lib/logger';
import { redirect } from 'next/navigation';

const CreateOwnerPage = async () => {
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
      logger('query result', queryResult);
      logger('query', {
        name,
        lastName,
        email,
        phone,
      });
      if (queryResult.errors) {
        throw new Error(queryResult.errors[0].message);
      }
    } catch (error) {
      throw new Error('Error al crear dueño');
    }
  };
  return <NewPetOwnerForm onSubmit={createOwner} />;
};

export default CreateOwnerPage;
