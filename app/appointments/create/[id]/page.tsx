import { redirect } from 'next/navigation';

import { Appointments } from '@/components/appointments';
import { cookiesClient } from '@/lib/amplify-utils';
import { PageParams } from '@/types/PageParams';
import { logger } from '@/lib/logger';

const AppointmentsPage = async ({ params }: PageParams) => {
  const { data: appointments } = await cookiesClient.models.appointments.list({
    filter: {
      petId: {
        eq: params.id,
      },
    },
  });
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

  const createAppointment = async (formData: FormData) => {
    'use server';
    try {
      const payload = {
        ownerId: owner.id as string,
        petId: pet.id as string,
        content: formData.get('reason') as string,
      };
      if (Object.values(payload).some((value) => !value)) {
        console.error('Missing required fields');
        return;
      }
      logger('payload', payload);
      const queryResponse = await cookiesClient.models.appointments.create(
        payload
      );
      if (queryResponse.errors) {
        logger('queryResponse errors', queryResponse.errors);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Appointments
      createAppointment={createAppointment}
      owner={{
        id: owner.id,
        name: owner.name,
        lastName: owner.lastName,
      }}
      pet={{
        id: pet.id,
        name: pet.name,
      }}
      appointments={appointments.map((appointment) => ({
        id: appointment.id,
        name: pet.name,
        ownerName: owner.name,
        reason: appointment.content,
        appointmentDateTime: appointment.createdAt,
      }))}
    />
  );
};

export default AppointmentsPage;
