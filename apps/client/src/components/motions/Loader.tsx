export const Loader = ({ className }: { className: string }) => {
  return (
    <div
      className={`animate-spin border-3 rounded-full !border-t-transparent ${className}`}
    ></div>
  );
};
