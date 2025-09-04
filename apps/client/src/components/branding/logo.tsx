import Image from 'next/image';

export const MelodayzMusic = () => {
  return (
    <div className="flex items-center justify-center gap-1">
      <Image
        src="/icons/icon_512x512.png"
        className="w-6 dark:invert md:w-7"
        alt="meloicon"
        height={1000}
        width={1000}
      />
      <span className="text-[18px] select-none hover:text-primary-foreground/90 md:text-xl font-bold font-poppins">
        MelodayzMusic
      </span>
    </div>
  );
};
