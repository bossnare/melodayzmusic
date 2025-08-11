import { NextResponse } from 'next/server';

const mockSongs = [
  {
    id: 'un1',
    title: 'BossNare Anthem',
    artist: 'kingpin',
    duration: 210,
    createdAt: new Date(Date.now()),
    songCover: {
      coverUrl: 'null',
    },
    userOwner: {
      username: 'Donald',
      activateProfilePicture: {
        pictureUrl: 'null',
      },
      defaultPicture: 'null',
    },
  },
  {
    id: 'deux2',
    title: 'Everyday',
    artist: 'Chris G feat. ChatGPT',
    duration: 310,
    createdAt: new Date(Date.now()),
    songCover: {
      coverUrl: 'null',
    },
    userOwner: {
      username: 'Liantsoa',
      activateProfilePicture: {
        pictureUrl: 'null',
      },
      defaultPicture: 'null',
    },
  },
];

export async function GET() {
  return NextResponse.json(mockSongs);
}
