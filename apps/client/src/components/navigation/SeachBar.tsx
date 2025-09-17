import { X, ChevronLeft } from 'lucide-react';
import { MagnifyingGlassIcon } from '@phosphor-icons/react';
import { MotionButton } from '@/components/motions/motionButton';
import { useRef } from 'react';
import { cn } from '@/lib/utils';
import { Input } from '../ui/input';

const SearchBar = ({
  isNull,
  setIsNull,
  openSearch,
  setOpenSearch,
}: {
  isNull: boolean;
  setIsNull: React.Dispatch<React.SetStateAction<boolean>>;
  openSearch: boolean;
  setOpenSearch: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const inputRef = useRef<HTMLInputElement>(null)!;

  const handleClickX = () => {
    inputRef.current?.focus();
    if (inputRef.current) inputRef.current.value = '';
    setIsNull(true);
  };

  const handleOpenSearch = () => {
    setOpenSearch(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setIsNull(!value);
  };

  return (
    <div
      className={cn(
        openSearch ? 'w-full flex space-x-2' : 'w-12',
        'ml-auto lg:ml-0 lg:w-[40%] transition-all duration-100 ease-in-out will-change-auto'
      )}
    >
      {/* for mobile only */}
      {openSearch && (
        <MotionButton
          onClick={() => {
            setOpenSearch(false);
            setIsNull(true);
            if (inputRef.current) inputRef.current.value = '';
          }}
          className={`p-[6px] text-foreground/80 active:bg-accent bg-sidebar lg:hidden`}
        >
          <ChevronLeft className="size-8" />
        </MotionButton>
      )}
      <div
        className={cn(
          openSearch && 'bg-input/50',
          isNull && 'px-2',
          'grow flex items-center transition-all lg:h-12 overflow-hidden duration-100 ease-in-out will-change-auto lg:has-[input:focus]:ring has-[input:focus]:ring-input lg:rounded-md rounded-full lg:p-1 has-[input:active]:bg-primary-foreground/4 lg:bg-input/50 has-[input:focus]:bg-input/20 lg:has-[input:focus]:bg-input/16 lg:has-[input:focus]:shadow-sm'
        )}
      >
        {/* lg:has-[input:focus]:ring-ring/50 lg:has-[input:focus]:ring-[2px] */}
        {isNull && (
          <span className={cn(!openSearch && 'hidden', 'ml-1 lg:block')}>
            <MagnifyingGlassIcon
              weight={'bold'}
              className="lg:size-6 size-5 text-muted-foreground"
            />
          </span>
        )}
        <Input
          ref={inputRef}
          onChange={handleChange}
          type="text"
          name="querySearch"
          placeholder="Rechercher une vibe, un album ou une artiste..."
          className={cn(
            !openSearch && '!hidden',
            'w-full',
            !isNull && 'ml-1',
            'caret-primary lg:ml-0 px-1 rounded-full lg:rounded-md !bg-transparent shadow-none placeholder:text-sm border-0 outline-0 lg:!block focus-visible:ring-0'
          )}
        />
        <div
          className={cn(
            isNull
              ? 'lg:scale-0 lg:opacity-0 lg:w-0'
              : 'lg:scale-100 lg:w-auto lg:opacity-100',
            isNull || !openSearch
              ? 'scale-0 opacity-0 w-0'
              : 'scale-100 w-auto opacity-100',
            'transition-transform duration-150 ease-in-out'
          )}
        >
          <MotionButton
            onClick={handleClickX}
            className="text-muted-foreground"
          >
            <X className="size-auto" />
          </MotionButton>
        </div>

        <div>
          {/* search only */}
          <MotionButton
            disabled={isNull}
            className={`p-[6px] text-foreground/70 ${
              isNull ? 'hidden' : 'block'
            } bg-sidebar ${!openSearch && 'hidden'} lg:${
              isNull ? 'hidden' : 'block'
            } lg:bg-transparent lg:p-2`}
          >
            <MagnifyingGlassIcon weight={'bold'} className="size-6" />
          </MotionButton>
          {/* mobile search icon, for show only */}
          {!openSearch && (
            <MotionButton
              onClick={handleOpenSearch}
              className={`p-[6px] text-foreground/70 lg:hidden
            } bg-sidebar lg:bg-transparent lg:p-2`}
            >
              <MagnifyingGlassIcon weight={'bold'} className="size-6" />
            </MotionButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
