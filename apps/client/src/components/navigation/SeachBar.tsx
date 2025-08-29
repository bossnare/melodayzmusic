import { Search, X } from 'lucide-react';
import { MotionButton } from '@/components/motions/motionButton';
import { useState } from 'react';
import { cn } from '@/lib/utils';

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
          rounded-sm
        lg:has-[input:active]:bg-primary-foreground/4 dark:bg-input/20 lg:has-[input:focus]:ring-ring lg:has-[input:focus]:ring"
      >
        <input
          onChange={handleChange}
          type="text"
          name="querySearch"
          placeholder="Artist, Song, Albums, Flow..."
          className="!hidden w-full px-2 bg-transparent placeholder:text-sm border-0 outline-0 lg:!block"
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
        <div className="lg:mr-1">
          <MotionButton className="p-[6px] text-muted-foreground lg:p-2">
            <Search className="stroke-2 size-auto" />
          </MotionButton>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
