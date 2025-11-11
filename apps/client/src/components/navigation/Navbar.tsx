'use client';

import { cn } from '@/lib/utils';
import SearchBar from './SeachBar';
import { ModeToggle } from '../themes/mode-toggle';
import { SearchIcon } from 'lucide-react';
import { Logo } from '../branding/logo';
import { Command, CommandItem, CommandList } from '../ui/command';
import { SheetTrigger } from '@/components/ui/sheet';
import { MotionButtonLeft } from '@/components/motions/motionButton';
import { AlignLeft } from 'lucide-react';
import { waitVibrate } from '@/utils/vibration';
import { usePlayer } from '@/context/playerContext';
import { useUser } from '@/api/user.api';
import { useSearch } from '@/context/searchContext';
import { useSong } from '@/api/song.api';
import { useMap } from '@/hooks/use-map';

export const NavBar = () => {
  // for search bar behavior
  const { show } = usePlayer();
  const { isOpenSearch, isNull } = useSearch();
  const { data: user } = useUser();
  const userRole = user?.role || 'USER';
  const { refetch } = useSong();
  const { isAtHome } = useMap();

  return (
    <nav
      className={cn(
        show && 'pointer-events-none',
        'relative flex items-center gap-3 lg:gap-4'
      )}
    >
      {!isOpenSearch && (
        <>
          {isAtHome ? (
            <Logo onClick={() => refetch()} />
          ) : (
            <SheetTrigger asChild>
              <MotionButtonLeft
                onClick={() => {
                  waitVibrate();
                }}
                className="p-1 hover:bg-transparent! hover:text-muted-foreground"
                type="button"
              >
                <AlignLeft className="stroke-current size-8 stroke-[2.2]" />
              </MotionButtonLeft>
            </SheetTrigger>
          )}
        </>
      )}

      {/* for search */}
      <SearchBar />

      {/* theme toggle */}
      {userRole !== 'DEV' ? null : (
        <div
          className={cn(
            isOpenSearch ? 'hidden' : 'block',
            'lg:block lg:ml-auto'
          )}
        >
          <ModeToggle />
        </div>
      )}
      {/* for search recommendation */}
      <Command
        className={cn(
          isNull ? 'lg:hidden' : 'lg:flex',
          !isOpenSearch ? 'hidden' : 'flex',
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
