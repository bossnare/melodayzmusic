import AuthGuard from '@/components/auth/AuthGuard';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthGuard requireAuth={false}>
      <div className="overflow-y-auto h-dvh scroll-smooth scrollbar-none">
        {children}
      </div>
    </AuthGuard>
  );
}
