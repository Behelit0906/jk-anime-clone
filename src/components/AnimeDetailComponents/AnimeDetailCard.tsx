import { MdOutlineFavorite } from "react-icons/md";
import AnimeType from "../../types/AnimeType";
import { AiFillLike } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { BsFillPauseCircleFill } from "react-icons/bs";
import RelationsType from "../../types/RelationsType";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useState } from "react";
import { Link } from "react-router-dom";

interface Props { 
  anime: AnimeType,
  peopleWatching: number,
  viewed: number,
  toView: number,
  genres: string,
  studios: string,
  relations: RelationsType[]
}

interface entry {
  mal_id: number,
  type: string,
  name: string,
  url: string
}

function AnimeDetailCard({ anime, peopleWatching, viewed, toView, genres, studios, relations }:Props) {
  const [showTitles, setShowTitle] = useState(false);
  const prequels:entry[] = [];
  const sequels:entry[] = [];
  const alternativeVersions:entry[] = []
  const additional:entry[] = [];
  for(let i = 0; i < relations.length; i++) {
    if(relations[i].relation === 'Prequel') prequels.push(...relations[i].entry)
    else if(relations[i].relation === 'Sequel') sequels.push(...relations[i].entry)
    else if(relations[i].relation === 'Alternative Version')
      alternativeVersions.push(...relations[i].entry);
    else if(relations[i].relation === 'Side Story') additional.push(...relations[i].entry)
  }

  let status = '';
  if(anime.status === 'Not yet aired') status = 'Upcoming';
  else if(anime.status === 'Currently Airing') status = 'Airing'
  else status = 'Finished'

  return(
    <article className="hidden lg:flex gap-5 xl:gap-8 p-5 bg-[#eeeeee] dark:bg-dark-100 rounded-[10px]">
      <section className="flex flex-col w-[265px] xl:w-[320px]">
        <div className="w-full h-[440px] mb-2 rounded" style={{
          backgroundImage: `url('${anime.images.jpg.large_image_url}')`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
        </div>
        <div>
          <button className="flex items-center w-full bg-myOrange-50 text-white font-mulish rounded-[5px] overflow-hidden mb-2">
            <span className="p-[13px] bg-[#AB6900] text-[13px]">{anime.scored_by}</span>
            <p className="w-full flex justify-center items-center pr-5 py-[9px] text-[15px]">
              I Like it <AiFillLike className="inline-block ml-2" />
            </p>
          </button>
          <div className="flex bg-[#6c757d] dark:bg-[#027bff] text-[12px] xl:text-sm text-white font-mulish rounded-[5px]">
            <div className="w-1/3 py-[5px] flex flex-col items-center">
              <span className="flex items-center">
                <FaEye className="inline-block mr-2" />
                {peopleWatching}
              </span>
              <p>Watching</p>
            </div>
            <div className="w-1/3 py-[5px] flex flex-col items-center">
              <span className="flex items-center">
                <FaCheckCircle className="inline-block mr-2" />
                {viewed}
              </span>
              <p>Viewed</p>
            </div>
            <div className="w-1/3 py-[5px] flex flex-col items-center">
              <span className="flex items-center">
                <BsFillPauseCircleFill className="inline-block mr-2" />
                {toView}
              </span>
              <p>To view</p>
            </div>
          </div>
        </div>
      </section>
      {/* Aca --------------- */}
      <section className="w-full">
        <div className="flex flex-col gap-4 mb-3">
          <div className="flex gap-5 mb-2 relative">
            <h4 className="max-w-[90%] font-mulish font-bold text-[30px] text-[#3d3d3d] dark:text-white">{anime.title}</h4>
            <span className="absolute right-3 top-1 flex justify-center items-center w-[50px] h-[44px] bg-[#027bff] rounded">
              <MdOutlineFavorite color="white" />
            </span>
          </div>
          <p className="text-[18px] font-mulish text-[#3d3d3d] dark:text-white mb-5">{anime.synopsis}</p>
          <div className="flex gap-10">
            <ul className="w-2/4 flex flex-col gap-y-1 font-mulish text-[15px] text-[#101010]">
              <li className="relative pl-[18px] before:content-[''] before:absolute before:left-0 before:top-[8px] before:inline-block before:w-[6px] before:h-[6px] before:bg-black dark:before:bg-white">
                <span>
                  <span className="inline-block w-[120px] dark:text-white">Type: </span>
                  <span className="text-blue-50">{anime.type}</span>
                </span>
              </li>
              <li className="relative pl-[18px] before:content-[''] before:absolute before:left-0 before:top-[8px] before:inline-block before:w-[6px] before:h-[6px] before:bg-black dark:before:bg-white">
                <span>
                  <span className="inline-block w-[120px] dark:text-white">Genre:</span>
                  <span className="text-blue-50">{genres}</span>
                </span>
              </li>
              <li className="relative pl-[18px] before:content-[''] before:absolute before:left-0 before:top-[8px] before:inline-block before:w-[6px] before:h-[6px] before:bg-black dark:before:bg-white">
                <span>
                  <span className="inline-block w-[120px] dark:text-white">Studios:</span>
                  <span className="text-blue-50">{studios}</span>
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
                  <span className="text-blue-50">{anime.episodes}</span>
                </span>
              </li>
              <li className="relative pl-[18px] before:content-[''] before:absolute before:left-0 before:top-[8px] before:inline-block before:w-[6px] before:h-[6px] before:bg-black dark:before:bg-white">
                <span>
                  <span className="inline-block w-[120px] dark:text-white">Duration:</span>
                  <span className="text-blue-50">{anime.duration}</span>
                </span>
              </li>
              <li className="relative pl-[18px] before:content-[''] before:absolute before:left-0 before:top-[8px] before:inline-block before:w-[6px] before:h-[6px] before:bg-black dark:before:bg-white">
                <span>
                  <span className="inline-block w-[120px] dark:text-white">Broadcasted:</span>
                  <span className="text-blue-50">{anime.aired.string}</span>
                </span>
              </li>
              <li className="relative pl-[18px] before:content-[''] before:absolute before:left-0 before:top-[8px] before:inline-block before:w-[6px] before:h-[6px] before:bg-black dark:before:bg-white">
                <span>
                  <span className="inline-block w-[120px] dark:text-white">Status:</span>
                  <span className="text-blue-50">{status}</span>
                </span>
              </li>
            </ul>
            <div className="flex w-2/4 flex-col gap-3">
              <div>
                <h5 onClick={() => setShowTitle(prev => !prev)} className="w-fit flex items-center gap-1 font-mulish font-bold text-[18px] text-blue-100 cursor-pointer">
                  Alternative Titles 
                  <MdKeyboardArrowDown 
                  className={`text-3xl transition-transform  ease-in-out duration-500 ${showTitles ? 'rotate-180' : ''}`} /></h5>
                <ul className={`pt-1 transition-all ease-in-out duration-500 font-mulish mb-2 overflow-hidden ${showTitles ? 'max-h-screen' : 'max-h-0'}`}>
                  {
                    anime.title_english &&
                    <li className="text-[#212529] dark:text-white">
                      <b>English</b>
                      <p>{anime.title_english}</p>
                    </li>
                  }
                  {
                    anime.title_japanese &&
                    <li className="text-[#212529] dark:text-white">
                      <b>Japanese</b>
                      <p>{anime.title_japanese}</p>
                    </li>
                  }
                </ul>
                {
                  prequels.length > 0 &&
                  <>
                    <h5 className="text-blue-100 text-[18px] font-bold font-mulish">Prequel</h5>
                    <ul>
                      {
                        prequels.map(prequel => 
                          <li key={prequel.mal_id}>
                            <Link className="font-mulish dark:text-white dark:hover:text-myOrange-50 hover:text-myOrange-50 transition-colors" 
                            to={`/anime/details/${prequel.mal_id}`}>
                              {prequel.name}
                            </Link>
                          </li>
                        )
                      }
                    </ul>
                  </>
                }
                {
                  sequels.length > 0 &&
                  <>
                    <h5 className="text-blue-100 text-[18px] font-bold font-mulish">Sequel</h5>
                    <ul>
                      {
                        sequels.map(sequel => 
                          <li key={sequel.mal_id}>
                            <Link className="font-mulish dark:text-white dark:hover:text-myOrange-50 hover:text-myOrange-50 transition-colors" 
                            to={`/anime/details/${sequel.mal_id}`}>
                              {sequel.name}
                            </Link>
                          </li>
                        )
                      }
                    </ul>
                  </>
                }
                {
                  alternativeVersions.length > 0 &&
                  <>
                    <h5 className="text-blue-100 text-[18px] font-bold font-mulish">Alternative Versions</h5>
                    <ul>
                      {
                        alternativeVersions.map(version => 
                          <li key={version.mal_id}>
                            <Link className="font-mulish dark:text-white dark:hover:text-myOrange-50 hover:text-myOrange-50 transition-colors" 
                            to={`/anime/details/${version.mal_id}`}>
                              {version.name}
                            </Link>
                          </li>
                        )
                      }
                    </ul>
                  </>
                }

                {
                  additional.length > 0 &&
                  <>
                    <h5 className="text-blue-100 text-[18px] font-bold font-mulish">Additional</h5>
                    <ul>
                      {
                        additional.map(item => 
                          <li key={item.mal_id}>
                            <Link className="font-mulish dark:text-white dark:hover:text-myOrange-50 hover:text-myOrange-50 transition-colors" 
                            to={`/anime/details/${item.mal_id}`}>
                              {item.name}
                            </Link>
                          </li>
                        )
                      }
                    </ul>
                  </>
                }
                
              </div>
              {
                anime.trailer.embed_url &&
                <div>
                  <h5 className="font-mulish text-[#212529] dark:text-white font-bold text-[18px] mb-2">Trailer</h5>
                  <iframe className="w-[315px] h-[177px] xl:w-[390px] xl:h-[220px] rounded" 
                    src={`${anime.trailer.embed_url}?&autoplay=0`} 
                    title={anime.title} 
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen
                  >
                  </iframe>
                </div>
              }
            </div>
          </div>
        </div>
      </section>
    </article>
  )
}

export default AnimeDetailCard;