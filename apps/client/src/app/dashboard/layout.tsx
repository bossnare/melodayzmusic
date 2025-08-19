import { Aside } from '@/components/Aside';
import { Header } from '@/components/Header';
import { NavBottom } from '@/components/NavBottom';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex bg-white">
      <Aside />
      <div className="w-full transition-all duration-200 md:grow">
        <Header />
        {/* <MaintContent /> */}
        <main>{children}</main>
        <NavBottom />
      </div>
      {/* modal */}
      {/* <Player />
      <SongUpload /> */}
    </div>
  );
}
