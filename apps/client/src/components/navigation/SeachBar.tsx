import { X } from 'lucide-react';
import { MagnifyingGlassIcon } from '@phosphor-icons/react';
import { MotionButton } from '@/components/motions/motionButton';
import { useRef } from 'react';
import { cn } from '@/lib/utils';
import { Input } from '../ui/input';

const SearchBar = ({
  isNull,
  setIsNull,
}: {
  isNull: boolean;
  setIsNull: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClickX = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.value = '';
      setIsNull(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setIsNull(!value);
  };

  return (
    <div className="w-auto ml-auto lg:ml-0 lg:w-[40%]">
      <div
        className="
          flex items-center transition-all lg:h-12 overflow-hidden duration-200 has-[input:focus]:ring has-[input:focus]:ring-input
          lg:rounded-md rounded-full lg:p-1
        has-[input:active]:bg-primary-foreground/4 lg:bg-input/50 has-[input:focus]:bg-input/16 has-[input:focus]:shadow-xs"
      >
        {/* lg:has-[input:focus]:ring-ring/50 lg:has-[input:focus]:ring-[2px] */}
        {isNull && (
          <span className="hidden ml-1 lg:block">
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
          placeholder="Artist, Song, Albums, Vibe..."
          className="!hidden w-full px-1 !bg-transparent placeholder:text-sm border-0 outline-0 lg:!block focus-visible:ring-0"
        />
        <div
          className={cn(
            isNull ? 'scale-0 opacity-0 w-0' : 'scale-100 w-auto opacity-100',
            'transition-transform duration-150 ease-in-out !hidden lg:!block'
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
          <MotionButton
            className={`p-[6px] text-foreground/70 lg:${
              isNull && 'hidden'
            } bg-sidebar lg:bg-transparent lg:p-2`}
          >
            <MagnifyingGlassIcon weight={'bold'} className="size-7 lg:size-6" />
          </MotionButton>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
