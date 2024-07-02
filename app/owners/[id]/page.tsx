import PageTitle from '@/components/PageTitle';

export const OwnerPage = ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  return (
    <div>
      <PageTitle title="Owner Page" /> <p>Owner ID: {params.id}</p>
    </div>
  );
};
