'use client';

import { NavBar } from './Navbar';

export const Header = () => {
  return (
    <header className="sticky inset-x-0 top-0 w-full px-2 py-2 border-b sm:px-4 z-5 border-border lg:border-0 bg-background">
      <NavBar />
    </header>
  );
};
