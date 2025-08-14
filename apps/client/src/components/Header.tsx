import { NavBar } from './Navbar';

export const Header = () => {
  return (
    <header className="sticky top-0 left-0 z-2 w-full px-2 py-1 border-b border-b-gray-200 md:border-0 bg-gray-50">
      <NavBar />
    </header>
  );
};
