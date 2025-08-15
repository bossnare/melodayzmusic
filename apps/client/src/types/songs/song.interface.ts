interface SongInterface {
  id: string;
  title: string;
  artist: string;
  duration: number;
  description: string;
  createdAt: string;
  songCover: {
    coverUrl: string;
  };
  defaultCover: string;
  userOwner: {
    username: string;
    activateProfilePicture: {
      pictureUrl: string;
    };
    defaultPicture: string;
  };
}

type SongProps = {
  song: SongInterface;
};

export type { SongInterface, SongProps };
