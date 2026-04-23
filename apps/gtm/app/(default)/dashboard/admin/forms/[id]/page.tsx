import { redirect } from 'next/navigation';
import { getAuthContext } from '@/lib/auth';
import AdminFormDetail from './admin-form-detail';

export const metadata = {
  title: 'Submission Detail | Admin | SoloFrameHub',
};

export default async function AdminFormDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { user } = await getAuthContext();
  if (!user) redirect('/signin');

  const adminEmails = (process.env.ADMIN_EMAILS || '').split(',').map((e) => e.trim().toLowerCase()).filter(Boolean);
  if (!user.email || !adminEmails.includes(user.email.toLowerCase())) {
    redirect('/dashboard');
  }

  const { id } = await params;
  const adminSecret = process.env.ADMIN_API_SECRET || '';

  return <AdminFormDetail submissionId={id} adminSecret={adminSecret} />;
}
