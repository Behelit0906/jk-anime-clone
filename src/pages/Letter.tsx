import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"
import Layout from "./Layout";
import { apiUrl } from "../constants";
import AnimeType from "../types/AnimeType";
import AddAnimeCard from "../components/AddAnimeCard";


function Letter () {
  const [animes, setAnimes] = useState<AnimeType[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { letter } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const letters = 'ABCDEFGHIJKLMOPQRSTUVWXYZ'.split('');
    if(!letters.includes(String(letter))) navigate('/')
  }, [letter, navigate])

  useEffect(() => {
    async function getAnimes() {
      const response = await fetch(`${apiUrl}/anime?sfw&letter=${letter}&limit=24&page=${page}`).then(res => res.json());

      if(response){
        setAnimes(response.data);
        setTotalPages(response.pagination.last_visible_page);
      } 
      else {
        setAnimes([]);
        setTotalPages(0)
      } 
    }

    getAnimes();
  }, [letter, page]);

  function clickHandler(e:React.MouseEvent<HTMLButtonElement>) {
    if(e.currentTarget.name === 'previousButton') setPage(page - 1);
    else setPage(page + 1);
  }
  
  return (
    <Layout>
      <section className="w-full py-[60px] cl-2:w-[540px] md:w-[720px] lg:w-[960px] xl:w-[1170px] px-[15px]">
        <h4 className="font-oswald leading-[21px] text-[#212529] dark:text-white text-2xl pl-[20px] border-l-4 border-myOrange-50 mb-10">
          LETTER {letter}
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