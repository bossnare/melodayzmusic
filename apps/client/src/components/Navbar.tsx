'use client';

import { Button } from '@/animations/motion/motionButton';
import { Columns2, Headset, X } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

export const NavBar = () => {
  const [isNull, setIsNull] = useState(true);

  const handleChange = (e: any) => {
    const { value } = e.target;
    console.log(value);
    if (value === '') {
      setIsNull(true);
    } else {
      setIsNull(false);
    }
  };

  return (
    <nav className="flex flex-wrap justify items-center gap-0 md:gap-4 *:min-w-10 *:p-1  *:flex *:items-center *:flex-wrap  *:min-h-0">
      {/* mampiasa end, inona? raha samy misy dashboard ilay route dia ilay active foana active fa tsy miaraka index */}
      <Button
        classname={
          '!hidden rounded-full bg-black/5 border-gray-300 border font-black'
        }
      >
        <Columns2 size={30} />
      </Button>
      <div className="flex-1 grow">
        <figure className="flex items-center gap-2">
          <Image
            className="w-8"
            alt="meloicon"
            src={'/icons/meloicon_x65.svg'}
            loading="lazy"
            width={100}
            height={100}
          />
          <h2 className="text-2xl font-extrabold text-gradient fon">
            MelodayzMusic
          </h2>
        </figure>
      </div>
      <div className="flex-1 md:flex-2 !grid !grid-cols-2">
        <div className="col-start-2 md:col-span-2 lg:col-start-2 input-text flex rounded-full overflow-hidden justify-end md:justify-center items-center *:h-12 *:flex *:justify-center *:active:bg-gray-200">
          <input
            onChange={handleChange}
            type="text"
            name="querySearch"
            className="hidden px-4 bg-transparent border-0 md:block ring-0 grow"
          />
          <div
            role="search-button"
            className={`shrink ${
              isNull ? 'w-0 opacity-0 rotate-90' : 'w-10 rotate-0 opacity-100'
            } items-center transition-all duration-150 ease-in-out text-xl  input-tex border-r-0 border-b-0 border-t-0 text-gray-400 hover:text-gray-500`}
          >
            <Button>
              {' '}
              <X />{' '}
            </Button>
          </div>
          <div
            role="search-button"
            className="items-center w-10 text-2xl text-gray-400 bg-transparent border-t-0 border-b-0 border-r-0 rounded-r-full shrink input-text hover:text-gray-500"
          >
            <Button>
              <Headset />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
