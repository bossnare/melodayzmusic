import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { useAudioStore } from '@/store/audioStore';
import { useEffect, useState } from 'react';

export function PlayerSlider({
  className,
  needOveride = true,
}: {
  className?: string;
  needOveride?: boolean;
}) {
  const [value, setValue] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const audioRef = useAudioStore((s) => s.audioRef);

  const handleCommit = (val: number[]) => {
    setIsSeeking(false);
    if (audioRef) audioRef.currentTime = val[0];
  };

  const handleChange = (val: number[]) => {
    setIsSeeking(true);
    setValue(val[0]);
  };

  // track audioRef with effect
  useEffect(() => {
    const audio = audioRef;
    if (!audio) return;

    const handleUpdate = () => {
      if (!isSeeking) setValue(audio.currentTime);
    };
    audio.addEventListener('timeupdate', handleUpdate);
    return () => audio.removeEventListener('timeupdate', handleUpdate);
  }, [audioRef, isSeeking]);

  return (
    <Slider
      value={[value]}
      max={audioRef?.duration ?? 0}
      onValueChange={handleChange}
      onValueCommit={handleCommit}
      step={0.1}
      className={cn(className, 'cursor-pointer! touch-none! select-none!')}
      trackClassName={needOveride ? 'bg-white/30!' : ''}
      rangeClassName={needOveride ? 'bg-white!' : ''}
      thumbClassName={
        needOveride
          ? 'border-white! bg-white! ring-0! hover:ring-0! focus-visible:ring-0!'
          : ''
      }
    />
  );
}
