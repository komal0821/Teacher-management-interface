import { MainLayout } from '@/components/MainLayout';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function Home() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect('/sign-in');
  }

  return (
    <div>
      <MainLayout />
    </div>
  );
}
