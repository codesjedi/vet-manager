import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'vet-manager',
  access: (allow) => ({
    'avatars/{entity_id}/*': [
      allow.guest.to(['read']),
      allow.entity('identity').to(['read', 'write', 'delete']),
    ],
  }),
});
