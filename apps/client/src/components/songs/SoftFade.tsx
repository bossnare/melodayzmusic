const SoftFade = () => {
  return (
    <>
      {/* left overlay */}
      <div className="absolute inset-y-0 left-0 w-12 pointer-events-none sm:w-15 bg-gradient-to-r from-gray-950/80 to-transparent z-2"></div>
      {/* right overlay */}
      <div className="absolute inset-y-0 right-0 w-12 pointer-events-none sm:w-15 bg-gradient-to-l from-gray-950/80 to-transparent z-2"></div>
    </>
  );
};

export default SoftFade;
