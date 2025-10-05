import Image from 'next/image';

const MelodayzMusic = () => {
  return (
    <div className="flex items-center justify-center gap-1">
      <Image
        src="/icons/icon_x32.svg"
        className="w-7 dark:invert md:w-8 drop-shadow-sm"
        alt="MelodayzMusic"
        height={1000}
        width={1000}
      />
      <span
        translate="no"
        className="text-[18px] select-none hover:text-foreground/90 text-foreground dark:text-primary-foreground md:text-xl font-extrabold font-montserrat"
      >
        MelodayzMusic
      </span>
    </div>
  );
};

const Logo = ({ onClick }: { onClick: () => void }) => {
  return (
    <div
      onClick={onClick}
      className="lg:!hidden w-auto cursor-pointer active:opacity-80 lg:hover:opacity-80"
    >
      <figure className="flex items-center gap-1 relative">
        <Image
          className="w-7 drop-shadow-md dark:invert"
          alt="MelodayzMusic"
          src={'/icons/icon_x32.svg'}
          loading="lazy"
          width={1000}
          height={1000}
        />
        <h2
          translate="no"
          className="text-xl font-black tracking-wide transition-all duration-100 ease-in-out select-none will-change-auto font-montserrat"
        >
          MELODAYZMUSIC
        </h2>
      </figure>
    </div>
  );
};

export { MelodayzMusic, Logo };
