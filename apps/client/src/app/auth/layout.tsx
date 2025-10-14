import AuthGuard from '@/components/auth/AuthGuard';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthGuard requireAuth={false}>
      <div className="overflow-y-auto h-dvh scroll-smooth scrollbar-none bg-gradient-to-br dark:from-primary/10 via-transparent dark:to-ring/8 from-primary/16 to-ring/20">
        {children}
      </div>
    </AuthGuard>
  );
}
