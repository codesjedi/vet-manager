import { OwnersTable } from '@/components/owners-table';
import PageTitle from '@/components/PageTitle';

const OwnersPage = async () => {
  return (
    <>
      <PageTitle
        title="Humanos"
        button={{
          title: 'Crear humano',
          path: '/owners/create',
        }}
      />
      <OwnersTable />
    </>
  );
};

export default OwnersPage;
