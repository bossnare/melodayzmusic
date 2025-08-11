import { Button, Div } from '@/animations/motion/motionButton';
import { Playing } from '@/animations/motion/Playing';
import { AuthContext } from '@/context/auth/AuthContext';
import api from '@/libs/api';
import { formatDuration as format } from '@/libs/formatDuration';
import timeAgo from '@/libs/timeAgo';
import { ChartArea, DotSquare, Heart } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';

// import { Button, Div } from "../../motion/motionButton";
// import timeAgo from "../services/api/date";
// import { useNavigate } from "react-router-dom";
// import { useAudioStore } from "../services/contextApi/Zustand";
// import { FavoriteContext } from "../services/contextApi/FavoriteContext";

export const SongCard = ({ song }: any) => {
  const useAuth = (): any => {
    return useContext(AuthContext);
  };
  // const { playTrack, currentTrack, isPlaying } = useAudioStore();
  // const { user } = useAuth();
  const [activeDrop, setIsActiveDrop] = useState(null);
  const isOpen = activeDrop === song.id;
  // const isOwner = user.id === song?.userOwner?.id;
  // const commentClick = () => {
  //   navigate(`/dashboard/song/${song.id}`);
  // };

  const deleteSong = async (songId: string) => {
    try {
      const res = await api.delete(`/api/songs/${songId}`);
      const resData = await res.data;
      console.log(resData);
      // const filter = songs.filter((song) => song.id !== songId)
    } catch (error: any) {
      if (error.response.data) {
        console.log(error.response.data);
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (!event.target.closest('.drop-down')) {
        setIsActiveDrop(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="col-span-1 hover:bg-gray-50 bg-white rounded-md">
      <div
        className={`flex-col sm:flex sm:flex-row sm:flex-wrap sm:items-start md:flex-nowrap md:items-stretch md:flex-col border-gray-900/80 `}
      >
        <Div
          children={
            <div
              className="sm:flex-1/3 shrink-0 cursor-pointer relative overflow-hidden rounded-t-lg"
              onClick={() => {
                // playTrack(song, navigate);
              }}
            >
              <figure className="bg-gray-100 shrink h-40 sm:h-50 md:w-full w-full md:h-40 lg:h-40 xl:h-30">
                <img
                  src={song?.songCover?.coverUrl || song.defaultCover}
                  alt="cover"
                  className="object-cover h-full w-full"
                  loading="lazy"
                />
              </figure>
              <div
                className={`
                  // isPlaying && currentTrack.id === song.id
                    // ? 'opacity-100'
                    // : 'opacity-0'
                 bg-black/12 absolute top-0 w-full h-full left-0 p-2 transition-opacity duration-400 ease-in-out`}
              >
                {/* <Waveform className="text-violet-600 text-5xl md:text-3xl lg:text-5xl" /> */}
                <Playing />
              </div>
              <span className="absolute bottom-0 right-0 bg-black/5 left-0 text-right px-2 text-gray-50">
                {format(song?.duration)}
              </span>
            </div>
          }
        />
        <div className="grow p-2 sm:flex-1/2 flex flex-wrap gap-2">
          <div className="size-10 md:size-7 shrink-0 outline-hidden rounded-full overflow-hidden border-gray-200 border-2 ">
            <img
              src={
                song?.userOwner?.activateProfilePicture?.pictureUrl ||
                song?.userOwner?.defaultPicture
              }
              alt="photoDP"
              loading="lazy"
              className="object-cover h-full w-full"
            />
          </div>
          <span className=" md:w-[calc(100%-170px)] truncate text-nowrap md:text-sm shrink-0 w-[calc(100%-200px)] mt-1 md:mt-0 inline-block font-semibold line-clamp-1 grow h-10 md:h-auto">
            {song?.userOwner?.username}
          </span>
          <span className="w-auto lg:w-20 text-xs pt-2 md:pt-1 text-[#777777] font-semibold text-right">
            {timeAgo(song.createdAt)}
          </span>
          <p className="w-full text-nowrap truncate text-gray-800 font-bold">
            {song.title}
          </p>
          <p className="truncate text-wrap w-full text-sm font-normal h-10 flex-none md:line-clamp-2 text-gray-500 cursor-pointer">
            {song?.description}
          </p>
        </div>
        <div className="flex grow flex-none py-2 md:py-0 gap-2 px-2  *:flex  *:p-1 justify-center rounded-b-lg border-1 border-gray-300  items-center">
          <div className="gap-5 flex-1/4  *:!bg-black/4 *:hover:!bg-black/10 *:!p-1 *:!rounded-full *:active:!bg-black/20">
            <Button
              // eventHandler={commentClick}
              children={<ChartArea className="text-2xl md:text-xl" />}
            />
          </div>
          <div className="drop-down justify-end flex-1/2 relative  *:hover:bg-gray-100 *:active:bg-gray-300">
            <Button
              // eventHandler={(e) => {
              //   e.stopPropagation();
              //   setIsActiveDrop(isOpen ? null : song.id);
              // }}
              children={<DotSquare className="text-2xl md:text-xl" />}
            />
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
