import { formatDuration } from '@/lib/formatDuration';
import { cn } from '@/lib/utils';
import { useAudioStore } from '@/store/audioStore';
import { useState, useEffect } from 'react';

export const PlayerAnimateDuration = ({
  className = 'w-full',
}: {
  className?: string;
}) => {
  const audioRef = useAudioStore((s) => s.audioRef);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (!audioRef) return;
    const handleUpdate = () => {
      setDuration(audioRef?.duration || 0);
      setCurrentTime(audioRef?.currentTime || 0);
    };

    audioRef.addEventListener('timeupdate', handleUpdate);

    return () => {
      audioRef.removeEventListener('timeupdate', handleUpdate);
    };
  }, [audioRef]);

  return (
    <div
      className={cn(
        className,
        'flex justify-between w-[calc(100%-2rem)] text-muted-foreground text-xs font-semibold font-inter'
      )}
    >
      <span>{formatDuration(currentTime)}</span>
      <span>{formatDuration(duration)}</span>
    </div>
  );
};
