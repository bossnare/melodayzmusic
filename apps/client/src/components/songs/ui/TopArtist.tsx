import { type TopArtistProps } from '@/types/songs/stream.interface';

const TopArtist = ({ children }: TopArtistProps) => {
  return (
    <section>
      <h2 className="flex items-center gap-2 text-section">Top Artists</h2>
      <div
        className="h-20 flex-nowrap
             flex items-center *:size-16 md:*:size-18 lg:*:size-22
          *:bg-gray-100 dark:*:bg-skeleton gap-4 *:rounded-full"
      >
        {children}
      </div>
    </section>
  );
};

export default TopArtist;
