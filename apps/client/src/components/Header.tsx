import { NavBar } from './Navbar';

export const Header = () => {
  return (
    <header className="sticky top-0 left-0 w-full px-2 py-1 border-b z-2 border-b-gray-200 md:border-0 bg-gray-50">
      <NavBar />
    </header>
  );
};
