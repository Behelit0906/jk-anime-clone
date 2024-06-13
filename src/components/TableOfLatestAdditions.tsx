import AnimeType from "../types/AnimeType";
import AddAnimeCard from "./AddAnimeCard";
import useSWR from 'swr';
import { apiUrl } from "../constants";
import TableOfLatestSkeleton from "./SkeletonLoaders/TableOfLatestSkeleton";

function TableOfLatestAdditions() {

  const { data: data1 } = useSWR(`${apiUrl}/anime?status=airing&type=tv&order_by=start_date&sort=desc&limit=20&page=1`);

  const { data: data2 } = useSWR(`${apiUrl}/anime?type=movie&order_by=start_date&sort=desc&limit=20&page=1`);

  const latestAdditions: AnimeType[] = [...(data1?.data || []), ...(data2?.data || [])];
  
  return (
    <section className="w-full cl-2:w-[540px] px-[15px] cl-2:px-0 lg:px-[15px] md:w-[720px] lg:w-[640px] xl:w-[780px] py-6">
      <h4 className="font-oswald border-l-4 border-myOrange-50 pl-4 py-2 text-2xl font-semibold leading-[21px] mb-7 text-[#232323] dark:text-white">
        LATEST ANIMES ADDED
      </h4>
      {
        latestAdditions.length > 0 ? 
        <ul className="flex flex-wrap justify-between">
          {
            latestAdditions.map((anime, key) => 
              <li className="w-[47%] max-w-[330px] lg:w-[130px] xl:w-[165px] mb-[30px]" key={key}>
                <AddAnimeCard
                  title={anime.title}
                  image={anime.images.jpg.large_image_url}
                  id={anime.mal_id}
                  status={anime.status}
                  type={anime.type}
                />
              </li>
            )
          }
        </ul>
        :
        <TableOfLatestSkeleton />
      }
    </section>
  )
}

export default TableOfLatestAdditions;