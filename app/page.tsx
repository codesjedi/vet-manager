import Dashboard from '@/components/dashboard';
import PageTitle from '@/components/page-title';
import { AuthGetCurrentUserServer } from '@/lib/amplify-utils';
import { generateGreeting } from '@/lib/utils';

export default async function App() {
  const user = await AuthGetCurrentUserServer();
  return (
    <main>
      <PageTitle title={generateGreeting(new Date())} />
      <Dashboard />
    </main>
  );
}
