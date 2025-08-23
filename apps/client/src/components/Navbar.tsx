'use client';

import { MotionButton } from '@/components/motions/motionButton';
import { Search, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export const NavBar = () => {
  const [isNull, setIsNull] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    console.log(value);
    if (value === '') {
      setIsNull(true);
    } else {
      setIsNull(false);
    }
  };

  return (
    <nav className="flex items-center justify-between justify lg:gap-4">
      {/* mampiasa end, inona? raha samy misy dashboard ilay route dia ilay active foana active fa tsy miaraka index */}
      {/* <button
        className={
          '!hidden rounded-full bg-black/5 border-gray-300 border font-black'
        }
      >
        <Columns2 size={30} />
      </button> */}
      <div className="lg:!hidden">
        <figure className="flex items-center gap-2">
          <Image
            className="w-8"
            alt="meloicon"
            src={'/icons/meloicon_x65.svg'}
            loading="lazy"
            width={1000}
            height={1000}
          />
          <h2 className="text-2xl font-extrabold select-none text-gradient">
            MelodayzMusic
          </h2>
        </figure>
      </div>
      <div className="w-auto lg:w-[40%] lg:my-2">
        <div
          className="
          flex items-center transition-all lg:h-13 overflow-hidden duration-200 lg:border-2 border-gray-800
          rounded-sm
        lg:has-[input:active]:bg-gray-900 lg:has-[input:focus]:ring-ring lg:has-[input:focus]:ring-2 shadow-sm"
        >
          <input
            onChange={handleChange}
            type="text"
            name="querySearch"
            placeholder="Artist, Song, Albums, Flow..."
            className="!hidden w-full px-2 bg-transparent placeholder:text-sm border-0 outline-0 lg:!block"
          />
          <div
            className={`${
              isNull ? 'scale-0 opacity-0 w-0' : 'scale-100 w-auto opacity-100'
            }  transition-transform duration-150 ease-in-out !hidden lg:!block`}
          >
            <MotionButton>
              <X className="size-auto" />
            </MotionButton>
          </div>
          <div role="search-button" className="lg:mr-1">
            <MotionButton className="text-muted-foreground">
              <Search className="size-auto" />
            </MotionButton>
          </div>
        </div>
      </div>
    </nav>
  );
};
