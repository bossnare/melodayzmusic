export default function AudioWave({ active }: { active: boolean }) {
  return (
    <div className="flex items-end gap-[3px] h-4 w-6">
      {[...Array(4)].map((_, i) => (
        <span
          key={i}
          className={`w-1 transition-all! duration-500! bg-[#00AAFF] ${
            active ? 'animate-wave' : 'h-1'
          }`}
          style={{
            animationDelay: `${i * 0.15}s`,
          }}
        />
      ))}
    </div>
  );
}
