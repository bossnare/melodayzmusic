'use client';

import type { BaseProps } from '@/types/base.interface';

const SmoothScrollLayout = ({ children }: BaseProps) => {
  return (
    <div
      id="main-content"
      className="flex-1 overflow-y-auto transition-all duration-200 ease-in-out scrollbar-none will-change-transform h-dvh lg:ml-64
      "
    >
      {children}
    </div>
  );
};

export default SmoothScrollLayout;
