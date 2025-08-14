import { Aside } from './Aside';
import { Dashboard } from './Dashboard';
import { Header } from './Header';
import { NavBottom } from './NavBottom';

export const DashboardLayout = () => {
  // const { toasts } = useToast();
  return (
    <div className="relative flex bg-white">
      <Aside />
      <div className="w-full transition-all duration-200 md:grow">
        <Header />
        {/* <MaintContent /> */}
        <main className="min-h-dvh">
          <Dashboard />
        </main>
        <NavBottom />
      </div>
      {/* modal */}
      {/* <Player />
      <SongUpload /> */}
    </div>
  );
};
