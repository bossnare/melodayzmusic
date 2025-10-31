import { X, ChevronLeft } from 'lucide-react';
import { MagnifyingGlassIcon } from '@phosphor-icons/react';
import { MotionButton } from '@/components/motions/motionButton';
import { cn } from '@/lib/utils';
import { Input } from '../ui/input';
import { handleWait } from '@/utils/handle-wait';
import { useSearch } from '@/context/searchContext';

const SearchBar = (
  {
    // isNull,
    // setIsNull,
    // isOpenSearch,
    // setIsOpenSearch,
  }
) => {
  const {
    isNull,
    setIsNull,
    setIsNullFalse,
    inputRef,
    isOpenSearch,
    setIsOpenSearch,
    setIsOpenSearchFalse,
  } = useSearch();

  const handleClickX = () => {
    inputRef.current?.focus();
    handleWait(() => {
      if (!inputRef.current) return;
      inputRef.current.value = '';
      setIsNull();
    });
  };

  const handleBack = () => {
    if (!inputRef.current) return;
    if (!isNull) {
      inputRef.current.value = '';
      setIsNull();
    }
    handleWait(() => setIsOpenSearchFalse());
  };

  const handleisOpenSearch = () => {
    setIsOpenSearch();
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    if (!value) setIsNull();
    else setIsNullFalse();
  };

  return (
    <div
      className={cn(
        isOpenSearch ? 'w-full flex space-x-2' : 'w-12',
        'ml-auto lg:ml-0 lg:w-[40%] transition-all duration-20 ease-in-out will-change-auto'
      )}
    >
      {/* for mobile only */}
      {isOpenSearch && (
        <MotionButton
          onClick={handleBack}
          className={`p-1.5 text-foreground/80 active:bg-accent/20 bg-sidebar lg:hidden`}
        >
          <ChevronLeft className="size-8" />
        </MotionButton>
      )}
      <div
        className={cn(
          isOpenSearch && 'bg-muted',
          isNull && 'px-2',
          'grow flex items-center transition-all lg:h-12 overflow-hidden duration-70 ease-in-out will-change-auto lg:has-[input:focus]:ring has-[input:focus]:ring-input lg:rounded-md rounded-full lg:p-1 lg:bg-input/50 has-[input:focus]:bg-muted lg:has-[input:focus]:bg-input/20 lg:has-[input:focus]:shadow-sm'
        )}
      >
        {/* lg:has-[input:focus]:ring-ring/50 lg:has-[input:focus]:ring-[2px] */}
        {isNull && (
          <span className={cn(!isOpenSearch && 'hidden', 'ml-1 lg:block')}>
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
            !isOpenSearch && 'hidden!',
            'w-full',
            !isNull && 'ml-1',
            'lg:ml-0 px-1 rounded-full lg:rounded-md bg-transparent! shadow-none placeholder:text-sm border-0 outline-0 lg:block! focus-visible:ring-0'
          )}
        />
        <div
          className={cn(
            isNull
              ? 'lg:scale-0 lg:opacity-0 lg:w-0'
              : 'lg:scale-100 lg:w-auto lg:opacity-100',
            isNull || !isOpenSearch
              ? 'scale-0 opacity-0 w-0'
              : 'scale-100 w-auto opacity-100',
            'transition-transform duration-150 ease-in-out'
          )}
        >
          <MotionButton
            onClick={handleClickX}
            className="text-muted-foreground bg-transparent! hover:bg-accent/20 active:bg-accent/30 p-1.5 rounded-full lg:p-2 lg:rounded-md"
          >
            <X className="size-auto" />
          </MotionButton>
        </div>

        <div>
          {/* search only */}
          <MotionButton
            disabled={isNull}
            className={`p-1.5 text-foreground/70 dark:text-foreground ${
              isNull ? 'hidden' : 'block'
            } bg-sidebar ${!isOpenSearch && 'hidden'} lg:${
              isNull ? 'hidden' : 'block'
            } lg:bg-transparent lg:p-2`}
          >
            <MagnifyingGlassIcon weight={'bold'} className="size-6" />
          </MotionButton>
          {/* mobile search icon, for show only */}
          {!isOpenSearch && (
            <MotionButton
              onClick={() => handleWait(handleisOpenSearch)}
              className={`p-1.5 text-foreground/80 active:opacity-80 dark:text-foreground bg-muted! lg:hidden
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
