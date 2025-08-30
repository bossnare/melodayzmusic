export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="p-4 min-h-dvh flex items-center justify-center">
      {children}
    </div>
  );
}
