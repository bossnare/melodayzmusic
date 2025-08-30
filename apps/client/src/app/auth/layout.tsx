export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex items-center justify-center p-4 overflow-y-auto h-dvh scroll-smooth scrollbar-none">
      {children}
    </div>
  );
}
