import { Dashboard } from './Home';

export const DashboardLayout = () => {
  // const { toasts } = useToast();
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 relative">
      {/* <Aside /> */}
      <div className="col-span-1 md:col-start-3 md:col-span-full items-start grid grid-cols-12 min-h-screen">
        {/* <Header /> */}
        {/* <MaintContent /> */}
        <Dashboard />
        {/* <NavBottom /> */}
      </div>
      {/* modal */}
      {/* <Player />
      <SongUpload /> */}
    </div>
  );
};
