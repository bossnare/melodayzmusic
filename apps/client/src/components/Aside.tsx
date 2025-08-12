import {
  ChevronDown,
  ShieldUser,
  Power,
  UserCog,
  ChevronUp,
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/animations/motion/motionButton';
import Link from 'next/link';

export const Aside = () => {
  const [isDown, setIsDown] = useState(true);

  return (
    <aside
      id="side-bar"
      className="hidden md:block bg-white overflow-y-auto top-16 h-[calc(100vh-4rem)] z-10 fixed w-1/6"
    >
      <div className="relative h-full select-none">
        <div className="*:py-3 *:px-1 *:min-w-10 *:text-left *:rounded-md flex flex-col *:flex *:gap-2 *:items-center *:font-semibold *:hover:bg-gray-100 *:transition-all *:duration-200 *:ease-in gap-1 pt-2 pb-10 px-6">
          <div className="flex flex-col *:px-2 *:flex !p-0 *:py-3 *:w-full overflow-hidden !gap-0">
            <div
              className="gap-2 cursor-pointer"
              onClick={() => {
                setIsDown(!isDown);
              }}
            >
              <ShieldUser className="text-2xl" />{' '}
              <span className="hidden text-gray-800 lg:block"> Profil</span>
              <Button classname={'ml-auto text-xl'}>
                {isDown ? <ChevronUp /> : <ChevronDown />}
              </Button>
            </div>
            <ul
              className={`flex-col bg-gray-50 gap-4 *:hover:!bg-gray-100 *:text-black/70 **:text-black/70 *:!bg-transparent **:bg-transparent *:flex **:flex **:items-center *:items-center *:gap-2 **:gap-2 !px-2 !py-0 border border-gray-200 rounded-lg rounded-t-none overflow-hidden transition-opacity ease-in-out duration-500 will-change-auto  ${
                isDown
                  ? 'min-h-30 !pt-2 !pb-2 opacity-100'
                  : 'opacity-0 h-0 border-0'
              }`}
            >
              <Link href="">
                <UserCog className="text-lg" />
                <span className="!hidden lg:!block">Paramètres</span>
              </Link>
              <Button classname={'bg-transparent'}>
                <Link href="">
                  <Power className="text-lg" /> <span>Déconnexion</span>
                </Link>
              </Button>
            </ul>
          </div>
          {/* <Link
            className={({ isActive }) => (isActive ? "active" : "undefined")}
            to="/dashboard/profile"
          >
            <User className="text-2xl" />
            <span className="select-none">Profil</span>
          </Link> */}
        </div>
        {/* <a className={` sticky container right-0 flex justify-center bg-gray-100/50 items-center bottom-0 h-14 w-full font-bold`}>
          <button
            onClick={logout}
            className=" py-2 rounded-md w-48"
          >
            Deconnexion
          </button>
        </a> */}
      </div>
    </aside>
  );
};
