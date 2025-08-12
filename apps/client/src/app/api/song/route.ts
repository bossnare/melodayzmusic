import { NextResponse } from 'next/server';

const mockSongs = [
  {
    id: 'un1',
    title: 'Footbal Africa',
    artist: 'kingpin',
    duration: 210,
    createdAt: new Date(Date.now()),
    songCover: {
      coverUrl: 'null',
    },
    defaultCover: 'null',
    userOwner: {
      username: 'Donald',
      activateProfilePicture: {
        pictureUrl: 'null',
      },
      defaultPicture: 'null',
    },
  },
  {
    id: 'three3',
    title: 'Life war',
    artist: 'kingpin',
    duration: 210,
    createdAt: new Date(Date.now()),
    songCover: {
      coverUrl: 'null',
    },
    defaultCover: 'null',
    userOwner: {
      username: 'Donald',
      activateProfilePicture: {
        pictureUrl: 'null',
      },
      defaultPicture: 'null',
    },
  },
  {
    id: 'four4',
    title: 'Next on my posh',
    artist: 'kingpin',
    duration: 210,
    createdAt: new Date(Date.now()),
    songCover: {
      coverUrl: 'null',
    },
    defaultCover: 'null',
    userOwner: {
      username: 'Chris G',
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
      coverUrl: './img/p1.jpg',
    },
    defaultCover: './img/p1.jpg',
    userOwner: {
      username: 'RioDinary',
      activateProfilePicture: {
        pictureUrl: './img/p1.jpg',
      },
      defaultPicture: './img/p1.jpg',
    },
  },
];

export async function GET() {
  return NextResponse.json(mockSongs);
}
