import { Button } from '@/animations/motion/motionButton';
import { Columns2, GlassesIcon, X } from 'lucide-react';
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
      <div className="flex-1 grow prose mdhidden">
        <figure className=" font-black text-blue-500 flex items-center gap-2 md:gap-4 text-sm md:text-2xl">
          <Image
            className="w-8"
            alt="meloicon"
            src={'/icons/meloicon_x65.svg'}
            loading="lazy"
            width={100}
            height={100}
          />
          <Image
            className="w-40"
            alt="melodayzmusic"
            src={'/icons/melodayzmusic.svg'}
            loading="lazy"
            width={100}
            height={100}
          />
        </figure>
      </div>
      <div className="flex-1 md:flex-2 !grid !grid-cols-2">
        <div className="col-start-2 md:col-span-2 lg:col-start-2 input-text flex rounded-full overflow-hidden justify-end md:justify-center items-center *:h-12 *:flex *:justify-center *:active:bg-gray-200">
          <input
            onChange={handleChange}
            type="text"
            name="querySearch"
            className="hidden md:block bg-transparent ring-0 border-0 grow px-4"
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
            className="shrink w-10 text-2xl items-center  bg-transparent border-r-0 border-b-0 border-t-0 input-text rounded-r-full text-gray-400 hover:text-gray-500"
          >
            <Button>
              <GlassesIcon />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
