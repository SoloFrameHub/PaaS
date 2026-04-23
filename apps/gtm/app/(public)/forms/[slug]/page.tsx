import { notFound } from 'next/navigation';
import { FORM_DEFINITIONS } from '@/lib/forms/definitions';
import FormClient from './form-client';

export async function generateStaticParams() {
  return Object.keys(FORM_DEFINITIONS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const form = FORM_DEFINITIONS[slug];
  if (!form) return { title: 'Form Not Found' };
  return {
    title: `${form.title} | SoloFrameHub`,
    description: form.description,
  };
}

export default async function FormPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const form = FORM_DEFINITIONS[slug];
  if (!form) notFound();

  return <FormClient formDefinition={form} />;
}
