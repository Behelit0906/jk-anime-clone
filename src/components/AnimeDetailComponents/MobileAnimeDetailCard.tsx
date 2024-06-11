import { MdOutlineFavorite } from "react-icons/md";
import AnimeType from "../../types/AnimeType";
import { AiFillLike } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { BsFillPauseCircleFill } from "react-icons/bs";
import React, { useRef } from "react";

interface Props {
  anime: AnimeType,
  peopleWatching: number,
  viewed: number,
  toView: number,
  genres: string,
  studios: string
}

function MobileAnimeDetailCard(props: Props) {

  const synopsisButton = useRef<HTMLButtonElement>(null);
  const informationButton = useRef<HTMLButtonElement>(null);
  const synopsis = useRef<HTMLParagraphElement>(null);
  const information = useRef<HTMLDivElement>(null);

  let status = '';
  if(props.anime.status === 'Not yet aired') status = 'Upcoming';
  else if(props.anime.status === 'Currently Airing') status = 'Airing'
  else status = 'Finished'

  function clickHandler(e:React.MouseEvent<HTMLButtonElement>) {
    if(informationButton && synopsisButton && information && synopsis) {
      if(e.currentTarget.id === 'informationButton') {
        synopsisButton.current?.classList.remove('bg-blue-50', 'text-white');
        synopsisButton.current?.classList.add('bg-white', 'text-black');
        informationButton.current?.classList.remove('bg-white', 'text-black');
        informationButton.current?.classList.add('bg-blue-50', 'text-white');
        synopsis.current?.classList.add('hidden');
        information.current?.classList.remove('hidden');
        information.current?.classList.add('flex');
      }
      else {
        informationButton.current?.classList.remove('bg-blue-50', 'text-white');
        informationButton.current?.classList.add('bg-white', 'text-black');
        synopsisButton.current?.classList.remove('bg-white', 'text-black');
        synopsisButton.current?.classList.add('bg-blue-50', 'text-white');
        synopsis.current?.classList.remove('hidden');
        information.current?.classList.remove('flex');
        information.current?.classList.add('hidden');
      }
    }
  }

  return (
    <article className="lg:hidden">
      <section className="p-5 bg-[#eeeeee] dark:bg-dark-100 rounded-[10px]">
        <div className="flex gap-5 mb-5 relative">
          <img className="w-full min-w-[100px] max-w-[120px] h-[180px] rounded" src={props.anime.images.jpg.image_url} alt={props.anime.title} />
          <h4 className="max-w-[50%] font-mulish font-bold text-2xl text-[#3d3d3d] dark:text-white">{props.anime.title}</h4>
          <span className="absolute right-3 top-0 flex justify-center items-center w-[50px] h-[44px] bg-[#027bff] rounded">
            <MdOutlineFavorite color="white" />
          </span>
        </div>
        <div>
          <div className="flex justify-center font-mulish mb-6">
            <button onClick={clickHandler} id="synopsisButton" ref={synopsisButton} className="w-2/4 p-[5px] bg-blue-50 text-white">Synopsis</button>
            <button onClick={clickHandler} id="informationButton" ref={informationButton} className="w-2/4 p-[5px] bg-white text-black">Information</button>
          </div>
          <div>
            <p ref={synopsis} className="text-sm font-mulish text-[#3d3d3d] dark:text-white mb-10">
              { props.anime.synopsis }
            </p>
            <div ref={information} className="hidden flex-col gap-4 md:flex-row mb-5">
              <ul className="md:w-2/4 flex flex-col gap-y-1 font-mulish text-[15px] text-[#101010]">
                <li className="relative pl-[18px] before:content-[''] before:absolute before:left-0 before:top-[8px] before:inline-block before:w-[6px] before:h-[6px] before:bg-black dark:before:bg-white">
                  <span>
                    <span className="inline-block w-[120px] dark:text-white">Type: </span>
                    <span className="text-blue-50">{props.anime.type}</span>
                  </span>
                </li>
                <li className="relative pl-[18px] before:content-[''] before:absolute before:left-0 before:top-[8px] before:inline-block before:w-[6px] before:h-[6px] before:bg-black dark:before:bg-white">
                  <span>
                    <span className="inline-block w-[120px] dark:text-white">Genre:</span>
                    <span className="text-blue-50">{props.genres}</span>
                  </span>
                </li>
                <li className="relative pl-[18px] before:content-[''] before:absolute before:left-0 before:top-[8px] before:inline-block before:w-[6px] before:h-[6px] before:bg-black dark:before:bg-white">
                  <span>
                    <span className="inline-block w-[120px] dark:text-white">Studios:</span>
                    <span className="text-blue-50">{props.studios}</span>
                  </span>
                </li>
                <li className="relative pl-[18px] before:content-[''] before:absolute before:left-0 before:top-[8px] before:inline-block before:w-[6px] before:h-[6px] before:bg-black dark:before:bg-white">
                  <span>
                    <span className="inline-block w-[120px] dark:text-white">Language:</span>
                    <span className="text-blue-50">Japanese</span>
                  </span>
                </li>
                <li className="relative pl-[18px] before:content-[''] before:absolute before:left-0 before:top-[8px] before:inline-block before:w-[6px] before:h-[6px] before:bg-black dark:before:bg-white">
                  <span>
                    <span className="inline-block w-[120px] dark:text-white">Episodes:</span>
                    <span className="text-blue-50">{props.anime.episodes}</span>
                  </span>
                </li>
                <li className="relative pl-[18px] before:content-[''] before:absolute before:left-0 before:top-[8px] before:inline-block before:w-[6px] before:h-[6px] before:bg-black dark:before:bg-white">
                  <span>
                    <span className="inline-block w-[120px] dark:text-white">Duration:</span>
                    <span className="text-blue-50">{props.anime.duration}</span>
                  </span>
                </li>
                <li className="relative pl-[18px] before:content-[''] before:absolute before:left-0 before:top-[8px] before:inline-block before:w-[6px] before:h-[6px] before:bg-black dark:before:bg-white">
                  <span>
                    <span className="inline-block w-[120px] dark:text-white">Broadcasted:</span>
                    <span className="text-blue-50">{props.anime.aired.string}</span>
                  </span>
                </li>
                <li className="relative pl-[18px] before:content-[''] before:absolute before:left-0 before:top-[8px] before:inline-block before:w-[6px] before:h-[6px] before:bg-black dark:before:bg-white">
                  <span>
                    <span className="inline-block w-[120px] dark:text-white">Status:</span>
                    <span className="text-blue-50">{status}</span>
                  </span>
                </li>
              </ul>
              <div className="md:w-2/4 flex flex-col gap-3">
                <div>
                  <h5 className="font-mulish font-bold text-[18px] text-blue-100">Alternative Titles</h5>
                  <ul className="flex flex-col gap-y-2 pt-1 font-mulish">
                    {
                      props.anime.title_english &&
                      <li className="text-[#212529] dark:text-white">
                        <b>English</b>
                        <p>{props.anime.title_english}</p>
                      </li>
                    }
                    {
                      props.anime.title_japanese &&
                      <li className="text-[#212529] dark:text-white">
                        <b>Japanese</b>
                        <p>{props.anime.title_japanese}</p>
                      </li>
                    }
                  </ul>
                </div>
                {
                  props.anime.trailer.embed_url && 
                  <div>
                    <h5 className="font-mulish text-[#212529] dark:text-white font-bold text-[18px] mb-2">Trailer</h5>
                    <iframe className="w-full h-[180px] rounded" 
                      src={`${props.anime.trailer.embed_url}?&autoplay=0`} title={props.anime.title} 
                      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                      allowFullScreen
                    >
                    </iframe>
                  </div>
                }
              </div>
            </div>
            <div>
              <button className="flex items-center w-full bg-myOrange-50 text-white font-mulish rounded-[5px] overflow-hidden mb-2">
                <span className="p-[13px] bg-[#AB6900] text-[13px]">{props.anime.scored_by}</span>
                <p className="w-full flex justify-center items-center pr-5 py-[9px] text-[18px]">I Like it <AiFillLike className="inline-block ml-2" /></p>
              </button>
              <div className="flex  bg-[#6c757d] dark:bg-[#027bff] text-white font-mulish rounded-[5px]">
                <div className="w-1/3 py-[5px] flex flex-col items-center">
                  <span className="flex items-center">
                    <FaEye className="inline-block mr-2" />
                    {props.peopleWatching}
                  </span>
                  <p>Watching</p>
                </div>
                <div className="w-1/3 py-[5px] flex flex-col items-center">
                  <span className="flex items-center">
                    <FaCheckCircle className="inline-block mr-2" />
                    {props.viewed}
                  </span>
                  <p>Viewed</p>
                </div>
                <div className="w-1/3 py-[5px] flex flex-col items-center">
                  <span className="flex items-center">
                  <BsFillPauseCircleFill className="inline-block mr-2" />
                    {props.toView}
                  </span>
                  <p>To view</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
      
    </article>
  )
}

export default MobileAnimeDetailCard;