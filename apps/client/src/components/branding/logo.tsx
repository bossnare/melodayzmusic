import Image from 'next/image';

const MelodayzMusic = () => {
  return (
    <div className="flex items-center justify-center gap-1">
      <Image
        src="/icons/icon_512x512.png"
        className="w-6 dark:invert md:w-7 drop-shadow-sm"
        alt="meloicon"
        height={1000}
        width={1000}
      />
      <span className="text-[18px] select-none hover:text-foreground/90 text-foreground dark:text-primary-foreground md:text-xl font-extrabold font-montserrat">
        MelodayzMusic
      </span>
    </div>
  );
};

const Logo = ({ onClick }: { onClick: () => void }) => {
  return (
    <div
      onClick={onClick}
      className="lg:!hidden grow cursor-pointer active:opacity-80 lg:hover:opacity-80"
    >
      <figure className="flex items-center gap-1">
        <Image
          className="w-7 drop-shadow-md invert dark:invert-0"
          alt="MelodayzMusic"
          src={'/icons/icon_x32_dark.svg'}
          loading="lazy"
          width={1000}
          height={1000}
        />
        <h2 className="text-xl font-black tracking-wide transition-all duration-100 ease-in-out select-none will-change-auto font-montserrat">
          MELODAYZMUSIC
        </h2>
      </figure>
    </div>
  );
};

export { MelodayzMusic, Logo };
