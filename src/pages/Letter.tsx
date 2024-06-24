import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import Layout from "./Layout";
import { apiUrl } from "../constants";
import AnimeType from "../types/AnimeType";
import AddAnimeCard from "../components/AddAnimeCard";
import useSWR from "swr";


function Letter () {
  const searchParams = new URLSearchParams(location.search);
  const pageQuery = Number(searchParams.get('page')) || 1;
  const letterQuery = String(searchParams.get('letter') || 'A');
  const [page, setPage] = useState(pageQuery);
  const navigate = useNavigate();

  useEffect(() => {
    const letters = 'ABCDEFGHIJKLMOPQRSTUVWXYZ'
    if(!letters.includes(letterQuery)) navigate('/')
  }, [letterQuery, navigate])

  useEffect(() => {
    setPage(pageQuery);
  }, [pageQuery])

  const { data } = useSWR(`${apiUrl}/anime?sfw&letter=${letterQuery}&limit=24&page=${pageQuery}&sfw=true`)

  const animes: AnimeType[] = data?.data || [];
  const totalPages = data?.pagination.last_visible_page || 0;

  function clickHandler(e:React.MouseEvent<HTMLButtonElement>) {
    const temp = page
    if(e.currentTarget.name === 'previousButton') {
      navigate(`/anime-by-letter?letter=${letterQuery}&page=${temp - 1}`)
    }
    else {
      navigate(`/anime-by-letter?letter=${letterQuery}&page=${temp + 1}`)
    }

  }
 

  return (
    <Layout>
      <section className="w-full py-[60px] cl-2:w-[540px] md:w-[720px] lg:w-[960px] xl:w-[1170px] px-[15px]">
        <h4 className="font-oswald leading-[21px] text-[#212529] dark:text-white text-2xl pl-[20px] border-l-4 border-myOrange-50 mb-10">
          LETTER {letterQuery}
        </h4>
        <div className="flex flex-wrap justify-between lg:justify-between gap-4">
          {
            animes && animes.map((anime, key) => 
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
        <div className="flex justify-center gap-2">
          {
            page > 1 &&
            <button name="previousButton" className="bg-myOrange-50 text-white p-3 rounded" onClick={clickHandler}>Previous results</button>
          }
          {
            page > 0 && page < totalPages &&
            <button onClick={clickHandler} className="bg-myOrange-50 text-white p-3 rounded">Next Result</button>
          }
        </div>
      </section>
    </Layout>
  )
}

export default Letter