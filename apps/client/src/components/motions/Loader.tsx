export const Loader = ({ className }: { className: string }) => {
  return (
    <div
      className={`animate-spin border-4 rounded-full !border-t-transparent !border-l-foreground/20 ${className}`}
    ></div>
  );
};
