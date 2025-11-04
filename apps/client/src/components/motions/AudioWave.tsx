export default function AudioWave({
  active,
  color = '#00AAFF',
}: {
  active: boolean;
  color?: string;
}) {
  return (
    <div className="flex items-end gap-[3px] h-4 w-6">
      {[...Array(3)].map((_, i) => (
        <span
          key={i}
          className={`w-2 ${active ? 'animate-wave' : 'h-1'}`}
          style={{
            animationDelay: `${i * 0.15}s`,
            backgroundColor: `${color}`,
          }}
        />
      ))}
    </div>
  );
}
