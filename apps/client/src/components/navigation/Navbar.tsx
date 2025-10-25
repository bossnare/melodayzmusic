'use client';

import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import SearchBar from './SeachBar';
import { ModeToggle } from '../themes/mode-toggle';
import { SearchIcon } from 'lucide-react';
import { Logo } from '../branding/logo';
// import { motion, AnimatePresence } from 'motion/react';
import { Command, CommandItem, CommandList } from '../ui/command';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import { MotionButtonLeft } from '@/components/motions/motionButton';
import { AlignLeft } from 'lucide-react';

export const NavBar = ({ isAtHome, fetchMe }: { isAtHome?: boolean; fetchMe: () => void }) => {
  // const [notHome, setNotHome] = useState(false);
  const router = useRouter();
  // for search bar behavior
  const [isNull, setIsNull] = useState(true);
  const [openSearch, setOpenSearch] = useState(false);

  // useEffect(() => {
  //   setNotHome(pathname !== '/dashboard');
  // }, [pathname]);

  return (
    <nav className="relative flex items-center gap-3 lg:gap-4">
        {!openSearch && (
          <>
            {isAtHome ? (<Logo onClick={() => router.push('/dashboard')} />) : (
          <SheetTrigger asChild>
            <MotionButtonLeft
              onClick={fetchMe}
              className="p-1 hover:!bg-transparent hover:text-muted-foreground"
              type="button"
            >
              <AlignLeft className="stroke-current size-8 stroke-[2.2]" />
            </MotionButtonLeft>
          </SheetTrigger>
        )}
        </>
        )
        }

      {/* for search */}
      <SearchBar
        isNull={isNull}
        setIsNull={setIsNull}
        openSearch={openSearch}
        setOpenSearch={setOpenSearch}
      />

      {/* theme toggle */}
      <div
        className={cn(openSearch ? 'hidden' : 'block', 'lg:block lg:ml-auto')}
      >
        <ModeToggle />
      </div>
      {/* for search recommendation */}
      <Command
        className={cn(
          isNull ? 'lg:hidden' : 'lg:flex',
          !openSearch ? 'hidden' : 'flex',
          'absolute z-20 flex-col gap-1 items-center lg:justify-center justify-start w-full px-2 py-10 lg:rounded-xl lg:shadow-xl h-[calc(100dvh-5rem)] top-[54px] lg:top-[54px] lg:w-6/7 bg-background lg:bg-muted/95 backdrop-blur-sm lg:h-80'
        )}
      >
        <SearchIcon className="size-15 lg:size-20" />
        <span className="text-muted-foreground">Rechercher avec ta vibe.</span>
        <CommandList>
          <CommandItem>Exemple item</CommandItem>
        </CommandList>
      </Command>
    </nav>
  );
};
