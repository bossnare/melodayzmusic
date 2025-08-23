'use client';

import Image from 'next/image';

export const Aside = () => {
  return (
    <aside
      id="side-bar"
      className="fixed w-64 top-0 left-0 flex-none overflow-y-auto -translate-x-full bg-white z-6 xl:translate-x-0 dark:bg-gray-950/90 md:h-[calc(100dvh-5rem)]"
    >
      <div className="hidden px-2 pt-4 pb-2 lg:block">
        <figure className="flex items-center gap-2">
          <Image
            className="w-8"
            alt="meloicon"
            src={'/icons/meloicon_x65.svg'}
            loading="lazy"
            width={100}
            height={100}
          />
          <h2 className="text-2xl font-black font-poppins select-none text-gradient">
            MelodayzMusic
          </h2>
        </figure>
      </div>
    </aside>
  );
};
