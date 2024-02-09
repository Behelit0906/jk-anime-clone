import { useState, useEffect } from "react";
import AnimeType from "../types/AnimeType";
import dataFetcher from "../utils/dataFetcher";
import AddAnimeCard from "./AddAnimeCard";

function TableOfLatestAdditions() {

  const [latestAdditions, setLatestAdditions] = useState<AnimeType[]>([]);

  useEffect(() => {
    async function getLatestAdditions() {
      const response = await dataFetcher([
        '/anime?status=airing&type=tv&order_by=start_date&sort=desc&limit=22&page=1',
        '/anime?status=airing&type=movie&order_by=start_date&sort=desc&limit=22&page2'
      ])
      setLatestAdditions(response);
    }

    const id = setTimeout(getLatestAdditions, 3000)
    
    return () => clearTimeout(id);
  }, [])

  return (
    <section className="w-full cl-2:w-[540px] px-[15px] cl-2:px-0 lg:px-[15px] md:w-[720px] lg:w-[640px] xl:w-[780px] py-6">
      <h4 className="font-oswald border-l-4 border-myOrange-50 pl-4 py-2 text-2xl font-semibold leading-[21px] mb-7 text-[#232323] dark:text-white">
        LATEST ANIMES ADDED
      </h4>
      <div className="flex flex-wrap justify-between lg:justify-between">
        {
          latestAdditions && latestAdditions.map((anime, key) => 
            <div className="w-[47%] max-w-[330px] lg:w-[130px] xl:w-[165px] mb-[30px]" key={key}>
              <AddAnimeCard
                title={anime.title}
                image={anime.images.jpg.large_image_url}
                id={anime.mal_id}
                status={anime.status}
                type={anime.type}
               />
            </div>
          )
        }
      </div>
    </section>
  )
}

export default TableOfLatestAdditions;