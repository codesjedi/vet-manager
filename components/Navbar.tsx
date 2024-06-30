'use client';

import { Authenticator } from '@aws-amplify/ui-react';

export function Navbar() {
  return (
    <Authenticator hideSignUp>
      {({ user, signOut }) => (
        <nav>{user ? <button onClick={signOut}>Sign Out</button> : null}</nav>
      )}
    </Authenticator>
  );
}
