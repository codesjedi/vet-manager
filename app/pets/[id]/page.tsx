import PetProfile from '@/components/pet-profile';
import { cookiesClient } from '@/lib/amplify-utils';
import { PageParams } from '@/types/PageParams';

const PetPage = async ({ params }: PageParams) => {
  const { data: pet } = await cookiesClient.models.pet.get({
    id: params.id,
  });
  const { data: owner } = await cookiesClient.models.owner.get({
    id: pet?.ownerId as string,
  });
  return (
    <>
      <PetProfile
        age="1"
        diseases={pet?.diseases ?? ''}
        email={owner?.email ?? ''}
        id={pet?.id ?? ''}
        phone={owner?.phone ?? ''}
        key={pet?.id}
        name={pet?.name ?? ''}
        medicine={pet?.medicine ?? ''}
        avatarUrl={pet?.avatarUrl ?? ''}
      />
    </>
  );
};

export default PetPage;
