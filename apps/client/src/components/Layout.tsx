import { Dashboard } from './Dashboard';
import { Header } from './Header';
import { NavBottom } from './NavBottom';

export const DashboardLayout = () => {
  // const { toasts } = useToast();
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 relative bg-white">
      {/* <Aside /> */}
      <div className="col-span-1 md:col-start-3 md:col-span-full items-start min-h-screen">
        <Header />
        {/* <MaintContent /> */}
        <Dashboard />
        <NavBottom />
      </div>
      {/* modal */}
      {/* <Player />
      <SongUpload /> */}
    </div>
  );
};
