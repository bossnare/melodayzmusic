import { NavBar } from './Navbar';

export const Header = () => {
  return (
    <header className="sticky top-0 left-0 w-full px-2 py-1 border-b z-7 border-b-gray-200 dark:border-b-gray-800 md:border-0 bg-gray-950">
      <NavBar />
    </header>
  );
};
