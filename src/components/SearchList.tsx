import AnimeType from "../types/AnimeType";
import SearchBarCard from "../components/searchBarCard";
import { Link } from "react-router-dom";

interface Props {
  animes?: AnimeType[]
  isLoading?: boolean,
  query?: string
}

function SearchList(props: Props) {
  return (
    <article className="absolute z-20 top-14 w-full lg:w-[204px] xl:w-[274px] rounded bg-white font-mulish shadow dark:bg-dark-100">
      {
        props.isLoading ? (
          <p className="pb-7 pt-3 text-center font-mulish text-[#3d3d3d] dark:text-white">Loading...</p>
        ) : props.animes && props.animes.length > 0 ? (
          <ul>
            {
              props.animes.map(anime => 
                <li key={anime.mal_id}>
                  <SearchBarCard 
                    cover={anime.images.jpg.image_url} 
                    showType={anime.type} 
                    link={`/anime/details/${anime.mal_id}`}>
                    {anime.title_english ? anime.title_english : anime.title}
                  </SearchBarCard>
                </li>  
              )
            }
            <Link className="w-full block p-[10px] rounded text-center bg-gray-100 dark:bg-dark-150 hover:bg-gray-300 hover:dark:bg-dark-200 dark:text-white font-bold text-base" to={`/search?q=${props.query}&page=1`}>
                More results
            </Link>
          </ul>
        ) : (
          <p className="pb-7 pt-3 text-center font-mulish text-[#3d3d3d] dark:text-white">No results found.</p>
        )
      }
    </article>
  )
} 

export default SearchList;