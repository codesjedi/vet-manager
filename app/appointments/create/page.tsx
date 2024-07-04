import { redirect } from 'next/navigation';

import { Appointments } from '@/components/appointments';
import { cookiesClient } from '@/lib/amplify-utils';
import { PageParams } from '@/types/PageParams';

const AppointmentsPage = async ({ params }: PageParams) => {
  const { data: appointments } = await cookiesClient.models.appointments.list();
  const { data: pet } = await cookiesClient.models.pet.get({ id: params.id });
  if (!pet) {
    redirect('/404');
  }

  const { data: owner } = await cookiesClient.models.owner.get({
    id: pet.ownerId,
  });
  if (!owner) {
    redirect('/404');
  }

  return (
    <Appointments
      owner={{
        id: owner.id,
      }}
      pet={{
        id: pet.id,
        name: pet.name,
      }}
      appointments={appointments.map((appointment) => ({
        id: appointment.id,
        name: appointment.petId,
        ownerName: appointment.ownerId,
        reason: appointment.content,
        appointmentDateTime: appointment.createdAt,
      }))}
    />
  );
};

export default AppointmentsPage;
