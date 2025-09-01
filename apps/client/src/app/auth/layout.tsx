export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="px-4 overflow-y-auto h-dvh scroll-smooth scrollbar-none">
      {children}
    </div>
  );
}
