import { redirect } from 'next/navigation';
import { getAuthContext } from '@/lib/auth';
import AdminFormsList from './admin-forms-list';

export const metadata = {
  title: 'Form Submissions | Admin | SoloFrameHub',
};

export default async function AdminFormsPage() {
  const { user } = await getAuthContext();
  if (!user) redirect('/signin');

  const adminEmails = (process.env.ADMIN_EMAILS || '').split(',').map((e) => e.trim().toLowerCase()).filter(Boolean);
  if (!user.email || !adminEmails.includes(user.email.toLowerCase())) {
    redirect('/dashboard');
  }

  const adminSecret = process.env.ADMIN_API_SECRET || '';

  return <AdminFormsList adminSecret={adminSecret} />;
}
