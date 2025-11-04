import { NextResponse } from 'next/server';

const mockSongs = [
  {
    id: 'un1',
    title: 'Party no dey stop',
    artist: 'Adekunle',
    duration: 210,
    description:
      'Dive into the world of music with our comprehensive song analyses. Uncover hidden meanings, lyrical interpretations',
    createdAt: new Date().toISOString(),
    songCover: {
      coverUrl: '/img/b2.jpg',
    },
    audioUrl: '/audio/vasa_treasure_mp3_26698.mp3',
    defaultCover: 'null',
    userOwner: {
      username: 'Yblack J.',
      activateProfilePicture: {
        pictureUrl: '/img/b5.webp',
      },
      defaultPicture: 'null',
    },
  },
  {
    id: 'three3',
    title: 'Arms around you',
    artist: 'XXXTentacion, swae lee',
    duration: 210,
    description:
      'Discover the meaning and themes behind your favorite songs. Explore in-depth analyses.',
    createdAt: new Date().toISOString(),
    songCover: {
      coverUrl: '/img/b6.webp',
    },
    audioUrl:
      '/audio/xxxtentacion_lil_pump_arms_around_you_lyrics_ft._maluma_swae_lee_mp3_52702.mp3',
    defaultCover: 'null',
    userOwner: {
      username: 'XxxTentacion',
      activateProfilePicture: {
        pictureUrl: '/img/b3.webp',
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
    createdAt: new Date().toISOString(),
    songCover: {
      coverUrl: '/img/b3.webp',
    },
    audioUrl: '/audio/bnxn_phenomena_official_video_mp3_37814.mp3',
    defaultCover: 'null',
    userOwner: {
      username: 'Chris G',
      activateProfilePicture: {
        pictureUrl: '/img/p6.jpg',
      },
      defaultPicture: '/img/b4.jpg',
    },
  },
  {
    id: 'deux2',
    title: 'Zombie',
    artist: 'Joeboy',
    duration: 310,
    description:
      'Dive into the world of music with our comprehensive song analyses. Uncover hidden meanings, lyrical interpretations',
    createdAt: new Date().toISOString(),
    songCover: {
      coverUrl: '/img/b1.jpg',
    },
    audioUrl: '/audio/zombie_mp3_73210.mp3',
    defaultCover: '/img/b4.jpg',
    userOwner: {
      username: 'Travis Scott',
      activateProfilePicture: {
        pictureUrl: '/img/b5.webp',
      },
      defaultPicture: '/img/b4.jpg',
    },
  },
  {
    id: 'six6',
    title: 'Ill come back to you',
    artist: 'Powfu',
    duration: 210,
    description:
      'Dive into the world of music with our comprehensive song analyses. Uncover hidden meanings, lyrical interpretations',
    createdAt: new Date().toISOString(),
    songCover: {
      coverUrl: '/img/b4.jpg',
    },
    audioUrl:
      '/audio/powfu_death_bed_feat._beabadoobee_prod._otterpop_lyrics_lyric_video_mp3_40760.mp3',
    defaultCover: 'null',
    userOwner: {
      username: 'Yblack J.',
      activateProfilePicture: {
        pictureUrl: '/img/b4.jpg',
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
    createdAt: new Date().toISOString(),
    songCover: {
      coverUrl: '/img/p6.jpg',
    },
    audioUrl: '/audio/lil_durk_all_my_life_ft._j._cole_mp3_38751.mp3',
    defaultCover: 'null',
    userOwner: {
      username: 'Yblack J.',
      activateProfilePicture: {
        pictureUrl: '/img/b4.jpg',
      },
      defaultPicture: 'null',
    },
  },
  {
    id: 'onze',
    title: 'Karma',
    artist: 'Di Nio',
    duration: 201,
    description:
      'Discover the meaning and themes behind your favorite songs. Explore in-depth analyses.',
    createdAt: new Date().toISOString(),
    songCover: {
      coverUrl: '',
    },
    audioUrl: '/audio/di_nio-karma_official_audio_mp3_40916.mp3',
    defaultCover: 'null',
    userOwner: {
      username: 'DiNio',
      activateProfilePicture: {
        pictureUrl: '/img/b4.jpg',
      },
      defaultPicture: 'null',
    },
  },
];

export async function GET() {
  return NextResponse.json(mockSongs);
}
