import { Link } from "react-router-dom";
import { AiFillLike } from "react-icons/ai";
import AnimeType from "../../types/AnimeType";

interface Props {
  anime: AnimeType
  number: number
}

function TopCard( { anime, number } :Props ) {

  return (
    <div className="relative cl-2:flex cl-2:gap-4">
      <Link 
        className="block w-[60px] h-[84.9px] cl-2:w-[83.63px] cl-2:h-[118.35px] md:w-[114.23px] md:h-[161.65px] lg:w-[155px] lg:h-[219.3px] xl:w-[190.7px] xl:h-[269.73px] relative mb-2 shrink-0" 
        to={`/anime/details/${anime.mal_id}`}>
          <span className="flex items-center gap-1 absolute bottom-0 overflow-hidden right-0 bg-myOrange-50 px-[6px] py-[5px] text-[9px] text-white md:px-[10px] md:text-[10px] lg:px-[20px] lg:text-sm">
            {anime.score}
            <AiFillLike className="text-[8px] md:text-[9px] lg:text-[13px]" />
          </span>
          <img  className="w-full h-full" src={anime.images.jpg.image_url} alt={anime.title || anime.title_english} />
      </Link>
      <div className="text-[17px] lg:text-[36px] cl-2:text-xl cl-2:relative">
        <h2 className="absolute top-6 left-20 cl-2:relative cl-2:top-auto cl-2:left-auto lg:pt-3">
          {`#${number} `}
          <Link className="text-blue-100 hover:text-myOrange-50 transition-colors leading-4 lg:leading-10" to={`/anime/details/${anime.mal_id}`}>
            {anime.title || anime.title_english}
          </Link>
        </h2>
        <span className="text-[#709db3] text-base absolute top-12 left-20 cl-2:relative cl-2:top-[-5px] cl-2:left-auto">
          Serie {`/ ${anime.episodes || ''}`} Eps
        </span>
        <p className="text-[11px] lg:text-base leading-[25px] text-[#3d3d3d] overflow-hidden">
          { anime.synopsis ?
           `${anime.synopsis.slice(0, 400)}...`
             : 'Synopsis not available...'
          }
        </p>
      </div>
    </div>
  )
}

export default TopCard;