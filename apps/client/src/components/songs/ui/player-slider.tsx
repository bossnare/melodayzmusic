import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { useAudioStore } from '@/store/audioStore';
import { useEffect, useState } from 'react';

export function PlayerSlider({ className }: { className?: string }) {
  const [value, setValue] = useState(0);
  const audioRef = useAudioStore((s) => s.audioRef);

  const handleCommit = (val: number[]) => {
    if (audioRef) audioRef.currentTime = val[0];
  };

  const handleChange = (val: number[]) => {
    setValue(val[0]);
  };

  // track audioRef with effect
  useEffect(() => {
    const audio = audioRef;
    if (!audio) return;

    const handleUpdate = () => {
      setValue(audio.currentTime);
    };
    audio.addEventListener('timeupdate', handleUpdate);
    return () => audio.removeEventListener('timeupdate', handleUpdate);
  }, [audioRef]);

  return (
    <Slider
      value={[value]}
      max={audioRef?.duration ?? 0}
      onValueChange={handleChange}
      onValueCommit={handleCommit}
      step={1}
      className={cn(className, 'cursor-pointer touch-none')}
      rangeClassName="bg-white!"
      thumbClassName="border-white! bg-white! ring-0! hover:ring-0! focus-visible:ring-0!"
    />
  );
}
