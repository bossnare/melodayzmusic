import { usePlayer } from '@/context/playerContext';

// components/AudioWave.tsx
export default function AudioWave({ active }: { active: boolean }) {
  const { secondaryColor } = usePlayer();

  return (
    <div className="flex items-end gap-[3px] h-4 w-6">
      {[...Array(4)].map((_, i) => (
        <span
          key={i}
          className={`w-1 ${active ? 'animate-wave' : 'h-0.5'}`}
          style={{
            animationDelay: `${i * 0.1}s`,
            backgroundColor: `${secondaryColor}`,
          }}
        />
      ))}
    </div>
  );
}
