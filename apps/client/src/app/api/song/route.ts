import { NextResponse } from 'next/server';

const mockSongs = [
  {
    id: 'un1',
    title: 'I saw the TV glow',
    artist: 'kingpin',
    duration: 210,
    description:
      'Dive into the world of music with our comprehensive song analyses. Uncover hidden meanings, lyrical interpretations',
    createdAt: new Date(Date.now()),
    songCover: {
      coverUrl: '/img/p5.jpg',
    },
    defaultCover: 'null',
    userOwner: {
      username: 'Yblack J.',
      activateProfilePicture: {
        pictureUrl: '/img/p1.jpg',
      },
      defaultPicture: 'null',
    },
  },
  {
    id: 'three3',
    title: 'Hope',
    artist: 'XXXTentacion',
    duration: 210,
    description:
      'Discover the meaning and themes behind your favorite songs. Explore in-depth analyses.',
    createdAt: new Date(Date.now()),
    songCover: {
      coverUrl: '/img/p7.jpg',
    },
    defaultCover: 'null',
    userOwner: {
      username: 'XxxTentacion',
      activateProfilePicture: {
        pictureUrl: '/img/p5.jpg',
      },
      defaultPicture: 'null',
    },
  },
  {
    id: 'four4',
    title: 'Phenomena',
    artist: 'BNXN',
    duration: 210,
    description:
      'Discover the meaning and themes behind your favorite songs. Explore in-depth analyses.',
    createdAt: new Date(Date.now()),
    songCover: {
      coverUrl: '/img/p8.png',
    },
    defaultCover: 'null',
    userOwner: {
      username: 'Chris G',
      activateProfilePicture: {
        pictureUrl: '/img/p6.jpg',
      },
      defaultPicture: '/img/p2.jpeg',
    },
  },
  {
    id: 'deux2',
    title: 'Zombie',
    artist: 'Joeboy',
    duration: 310,
    description:
      'Dive into the world of music with our comprehensive song analyses. Uncover hidden meanings, lyrical interpretations',
    createdAt: new Date(Date.now()),
    songCover: {
      coverUrl: '/img/p4.webp',
    },
    defaultCover: '/img/p2.jpeg',
    userOwner: {
      username: 'Travis Scott',
      activateProfilePicture: {
        pictureUrl: '/img/p3.jpg',
      },
      defaultPicture: '/img/p1.jpg',
    },
  },
  {
    id: 'six6',
    title: 'Ill come back to you',
    artist: 'Powfu',
    duration: 210,
    description:
      'Dive into the world of music with our comprehensive song analyses. Uncover hidden meanings, lyrical interpretations',
    createdAt: new Date(Date.now()),
    songCover: {
      coverUrl: '/img/p6.jpg',
    },
    defaultCover: 'null',
    userOwner: {
      username: 'Yblack J.',
      activateProfilePicture: {
        pictureUrl: '/img/p1.jpg',
      },
      defaultPicture: 'null',
    },
  },
  {
    id: 'dix10',
    title: 'All my life',
    artist: 'J. Cole feat. Lil Durk',
    duration: 210,
    description:
      'Discover the meaning and themes behind your favorite songs. Explore in-depth analyses.',
    createdAt: new Date(Date.now()),
    songCover: {
      coverUrl: '/img/p9.jpg',
    },
    defaultCover: 'null',
    userOwner: {
      username: 'Yblack J.',
      activateProfilePicture: {
        pictureUrl: '/img/p1.jpg',
      },
      defaultPicture: 'null',
    },
  },
];

export async function GET() {
  return NextResponse.json(mockSongs);
}
