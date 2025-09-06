import { X } from 'lucide-react';
import { MagnifyingGlassIcon } from '@phosphor-icons/react';
import { MotionButton } from '@/components/motions/motionButton';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Input } from '../ui/input';

const SearchBar = () => {
  const [isNull, setIsNull] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setIsNull(value === '');
  };

  return (
    <div className="w-auto ml-auto lg:ml-0 lg:w-[40%]">
      <div
        className="
          flex items-center transition-all lg:h-12 overflow-hidden duration-200 lg:border border-input
          rounded-sm lg:p-1
        lg:has-[input:active]:bg-primary-foreground/4 dark:lg:bg-input/20 lg:has-[input:focus]:ring-ring/50 lg:has-[input:focus]:ring-[2px] lg:has-[input:focus]:border-ring"
      >
        <Input
          onChange={handleChange}
          type="text"
          name="querySearch"
          placeholder="Artist, Song, Albums, Flow..."
          className="!hidden w-full px-2 placeholder:text-sm border-0 outline-0 lg:!block focus-visible:ring-0"
        />
        <div
          className={cn(
            isNull ? 'scale-0 opacity-0 w-0' : 'scale-100 w-auto opacity-100',
            'transition-transform duration-150 ease-in-out !hidden lg:!block'
          )}
        >
          <MotionButton className="text-muted-foreground">
            <X className="size-auto" />
          </MotionButton>
        </div>
        <div>
          <MotionButton className="p-[6px] text-primary-foreground/50 dark:bg-nav dark:lg:bg-transparent lg:p-2">
            <MagnifyingGlassIcon weight={'bold'} className="size-7 lg:size-6" />
          </MotionButton>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
