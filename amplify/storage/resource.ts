import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'vet-manager',
  access: (allow) => ({
    'avatars/*': [
      allow.authenticated.to(['read', 'write']),
      allow.guest.to(['write', 'read']),
    ],
  }),
});
