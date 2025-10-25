import AuthGuard from '@/components/auth/AuthGuard';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthGuard requireAuth={false}>
      <div className="overflow-y-auto h-dvh scroll-smooth scrollbar-none bg-gradient-to-br dark:from-primary/4 via-transparent dark:to-ring/6 from-primary/6 to-ring/4">
        {children}
      </div>
    </AuthGuard>
  );
}
