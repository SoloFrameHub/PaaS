export const metadata = {
  title: 'SoloFrameHub',
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[100dvh] bg-white dark:bg-gray-900">
      {children}
    </div>
  );
}
