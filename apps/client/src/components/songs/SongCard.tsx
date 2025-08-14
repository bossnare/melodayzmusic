import { Button } from '@/animations/motion/motionButton';
import { Playing } from '@/animations/motion/Playing';
// import { AuthContext } from '@/context/auth/AuthContext';
// import api from '@/libs/api';
import { formatDuration as format } from '@/libs/formatDuration';
import timeAgo from '@/libs/timeAgo';
import { Disc3, Ellipsis, Heart } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

// import { Button, Div } from "../../motion/motionButton";
// import timeAgo from "../services/api/date";
// import { useNavigate } from "react-router-dom";
// import { useAudioStore } from "../services/contextApi/Zustand";
// import { FavoriteContext } from "../services/contextApi/FavoriteContext";

export const SongCard = ({ song }: any) => {
  // const useAuth = (): any => {
  //   return useContext(AuthContext);
  // };
  // const { playTrack, currentTrack, isPlaying } = useAudioStore();
  // const { user } = useAuth();
  const [activeDrop, setIsActiveDrop] = useState(null);
  const isOpen = activeDrop === song.id;
  // const isOwner = user.id === song?.userOwner?.id;
  // const commentClick = () => {
  //   navigate(`/dashboard/song/${song.id}`);
  // };

  // const deleteSong = async (songId: string) => {
  //   try {
  //     const res = await api.delete(`/song/${songId}`);
  //     const resData = await res.data;
  //     console.log(resData);
  //     // const filter = songs.filter((song) => song.id !== songId)
  //   } catch (error: any) {
  //     if (error.response.data) {
  //       console.log(error.response.data);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   const handleClickOutside = (event: Event) => {
  //     if (!event?.target?.closest('.drop-down')) {
  //       setIsActiveDrop(null);
  //     }
  //   };

  //   document.addEventListener('click', handleClickOutside);
  //   return () => document.removeEventListener('click', handleClickOutside);
  // }, []);

  return (
    <div className="col-span-1 bg-white hover:bg-gray-50 md:rounded-md">
      <div
        className={`flex-col sm:flex sm:flex-row sm:flex-wrap sm:items-start md:flex-nowrap md:items-stretch md:flex-col border-gray-900/80 `}
      >
        <div
          className="relative overflow-hidden cursor-pointer sm:flex-1/3 shrink-0 md:rounded-t-lg"
          onClick={() => {
            // playTrack(song, navigate);
          }}
        >
          <figure className="w-full bg-gray-100 shrink-0 h-60 md:h-40 xl:h-30">
            <Image
              src={song?.songCover?.coverUrl || song.defaultCover}
              alt="cover"
              className="object-cover w-full h-full"
              loading="lazy"
              width={1200}
              height={1200}
            />
          </figure>
          <div
            className={`
                  // isPlaying && currentTrack.id === song.id
                    // ? 'opacity-100'
                    // : 'opacity-0'
                 bg-black/12 absolute top-0 w-full h-full left-0 p-2 transition-opacity duration-400 ease-in-out`}
          >
            {/* <Waveform className="text-5xl text-violet-600 md:text-3xl lg:text-5xl" /> */}
            <Playing />
          </div>
          <span className="absolute bottom-0 left-0 right-0 px-2 text-sm text-right lg:text-xs text-gray-50">
            {format(song?.duration)}
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <Disc3 className="text-white size-12 drop-shadow-2xl lg:size-10" />
          </div>
        </div>
        <div className="flex flex-wrap gap-2 p-2 grow sm:flex-1/2">
          <div className="overflow-hidden border-2 border-gray-200 rounded-full size-10 md:size-7 shrink-0 outline-hidden ">
            <Image
              src={
                song?.userOwner?.activateProfilePicture?.pictureUrl ||
                song?.userOwner?.defaultPicture
              }
              alt="photoDP"
              loading="lazy"
              className="object-cover w-full h-full"
              width={1200}
              height={1200}
            />
          </div>
          <span className=" md:w-[calc(100%-170px)] truncate text-nowrap md:text-sm shrink-0 w-[calc(100%-200px)] mt-1 md:mt-0 inline-block font-bold line-clamp-1 grow h-10 md:h-auto">
            {song?.userOwner?.username}
          </span>
          <span className="w-auto lg:w-20 text-xs pt-2 md:pt-1 text-[#777777] font-semibold text-right">
            {timeAgo(song.createdAt)}
          </span>
          <h3 className="w-full font-bold text-gray-900 truncate text-nowrap">
            {song.title}
          </h3>
          <p className="flex-none w-full h-10 text-sm font-medium truncate cursor-pointer text-wrap md:line-clamp-2">
            {song?.description}
          </p>
        </div>
        <div className="flex grow flex-none py-2 md:py-0 gap-2 px-2  *:flex  *:p-1 justify-center md:rounded-b-lg items-center">
          <div className="gap-5 flex-1/4  *:hover:!bg-black/4 *:!p-1.5 *:!rounded-full *:active:!bg-black/10">
            <Button
            // eventHandler={commentClick}
            >
              <Heart className="text-2xl text-gray-700 md:text-xl" />
            </Button>
          </div>
          <div className="drop-down justify-end flex-1/2 relative *:rounded-md *:hover:bg-gray-100 *:p-1 *:active:bg-gray-300">
            <Button
            // eventHandler={(e) => {
            //   e.stopPropagation();
            //   setIsActiveDrop(isOpen ? null : song.id);
            // }}
            >
              <Ellipsis className="text-2xl text-gray-700 md:text-xl" />
            </Button>
            {/* dropdown menu */}
            <div
              className={`${
                isOpen ? 'opacity-100' : 'h-0 opacity-0'
              }  ease-in duration-200 transition-all shadow-lg absolute top-6 divide-y-1 divide-gray-400 bg-gray-100 w-full left-0 rounded-b-sm z-2 overflow-hidden *:text-left *:px-2 *:active:bg-gray-300/70 *:hover:bg-gray-200 *:py-2 *:w-full `}
            >
              <button>Ajouter à la playlist</button>
              {/* {isOwner && <button>Modifier</button>} */}
              {/* {isOwner && (
                <button
                  onClick={() => {
                    deleteSong(song.id);
                  }}
                >
                  Supprimer
                </button>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
