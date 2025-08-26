import { NavBar } from './Navbar';

export const Header = () => {
  return (
    <header className="sticky inset-x-0 top-0 w-full px-2 py-2 border-b sm:px-6 z-5 border-b-gray-200 dark:border-b-gray-800 md:border-0 dark:bg-gray-950">
      <NavBar />
    </header>
  );
};
