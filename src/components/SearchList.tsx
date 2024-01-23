import AnimeType from "../types/AnimeType";
import SearchBarCard from "../components/searchBarCard";
import { Link } from "react-router-dom";

interface Props {
  animes?: AnimeType[]
  isLoading?: boolean
}

function SearchList(props: Props) {
  return (
    <article className="absolute z-20 top-14 w-full lg:w-[204px] xl:w-[274px] rounded bg-white font-mulish shadow">
      {
        props.isLoading ? (
          <p className="pb-7 pt-3 text-center font-mulish text-[#3d3d3d]">Loading...</p>
        ) : props.animes && props.animes.length > 0 ? (
          <ul>
            {
              props.animes.map(anime => 
                <li key={anime.id}>
                  <SearchBarCard 
                    cover={anime.attributes.posterImage.tiny} 
                    showType={anime.attributes.showType} 
                    link="./">
                    {anime.attributes.titles.en ? anime.attributes.titles.en : anime.attributes.titles.en_jp}
                  </SearchBarCard>
                </li>  
              )
            }
            <Link className="w-full block p-[10px] rounded text-center bg-gray-100 font-bold text-base" to="./">
                Más Resultados
            </Link>
          </ul>
        ) : (
          <p className="pb-7 pt-3 text-center font-mulish text-[#3d3d3d]">No se encontraron resultados.</p>
        )
      }
    </article>
  )
} 

export default SearchList;