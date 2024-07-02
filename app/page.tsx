import Dashboard from '@/components/dashboard';
import PageTitle from '@/components/page-title';
import { generateGreeting } from '@/lib/utils';

export default async function App() {
  return (
    <main>
      <PageTitle
        title={generateGreeting(new Date())}
        button={{
          path: '/owners/create/',
          title: 'Crear humano',
        }}
      />
      <Dashboard />
    </main>
  );
}
