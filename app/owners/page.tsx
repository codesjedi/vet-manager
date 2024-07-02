import { OwnersTable } from '@/components/owners-table';
import PageTitle from '@/components/page-title';

const OwnersPage = () => {
  return (
    <div>
      <PageTitle
        title="Humanos"
        button={{
          path: '/owners/create/',
          title: 'Crear humano',
        }}
      />
      <OwnersTable />
    </div>
  );
};

export default OwnersPage;
