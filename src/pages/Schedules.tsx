import React, { useEffect, useMemo, useState } from "react";
import LocationString from "../components/TopPageComponents/LocationString";
import Layout from "./Layout";
import useSWR from "swr";
import AnimeType from "../types/AnimeType";
import { apiUrl } from "../constants";
import { Link } from "react-router-dom";

function seasonMessage () {
  let message = '';
  const currentDate = new Date();
  const currentMonth = currentDate.getUTCMonth();

  if(currentMonth >= 0 && currentMonth <= 2)
    message = `Winter season schedule ${currentDate.getUTCFullYear()} ( January - February - March )`
  else if(currentMonth >= 3 && currentMonth <= 5)
    message = `Spring season schedule ${currentDate.getUTCFullYear()} ( April - May - June )`
  else if(currentMonth >= 6 && currentMonth <= 8)
    message = `Summer season schedule ${currentDate.getUTCFullYear()} ( July - August - September )`
  else if(currentMonth >= 9 && currentMonth <= 11)
    message = `Fall season schedule ${currentDate.getUTCFullYear()} ( October - November - December )`
  
  return message
}

function Schedules () {

  const days = useMemo(() => ['Monday', 'Thursday', 'Wednesday', 'Tuesday', 'Friday', 'Saturday', 'Sunday'], []);
  const [currentDay, setCurrentDay] = useState(() => days[new Date().getUTCDay() - 1]);
  const [tableTitle, setTableTitle] = useState(currentDay)
  const [text, setText] = useState('');
  const [animes, setAnimes] = useState<AnimeType[]>([]);
  const [filteredAnimes, setFilteredAnimes] = useState<AnimeType[]>([]);
  const [trigger, setTrigger] = useState(false);


  const { data } = useSWR(`${apiUrl}/schedules?filter=${currentDay.toLocaleLowerCase()}&kids=false&sfw=true`);
  const { data: dataFiltered1 } = useSWR( trigger ? `${apiUrl}/schedules?kids=false&sfw=true&page=1` : null);
  const { data: dataFiltered2 } = useSWR( trigger ? `${apiUrl}/schedules?kids=false&sfw=true&page=2` : null);  


  //useEffect para cambiar el titulo de la tabla y disparar las requests cuando se va a buscar un anime especifico
  useEffect(() => {
    if(text.length >= 2) {
      setTableTitle('Search anime');
      setTrigger(true)
    } 
    else {
      setFilteredAnimes([])
      setTableTitle(currentDay);
      setTrigger(false);
    }
  }, [text, currentDay, days])

  // useEffect para guardar los datos en el array de animes no filtrados
  useEffect(() => {
    if(data !== undefined && data.data !== undefined) {
      const ratings = ['PG-13 - Teens 13 or older', 'R+ - Mild Nudity', 'R - 17+ (violence & profanity)']
      const temp = data.data.filter((anime: { rating: string; }) => ratings.includes(anime.rating))
      setAnimes(temp);
    }  
  }, [data])

  //useEffect para guardar los datos en animes filtrados cuando se busca uno especifico 
  useEffect(() => {
    if(text.length >= 2) {
      const ratings = ['PG-13 - Teens 13 or older', 'R+ - Mild Nudity', 'R - 17+ (violence & profanity)'];
      const temp = [...(dataFiltered1?.data || []), ...(dataFiltered2?.data || [])];

      const result = temp.filter(anime => {
        if(ratings.includes(anime.rating)) {
          if(anime.title) return anime.title.toLocaleLowerCase().includes(text.toLocaleLowerCase());
          else return anime.title_english.toLocaleLowerCase().includes(text.toLocaleLowerCase());
        }
        else return false;
      })

      setFilteredAnimes(result);
    }
  }, [dataFiltered1, dataFiltered2, text])


  function clickHandler(e:React.MouseEvent) {
    setAnimes([]);
    setCurrentDay(String(e.currentTarget.textContent).replace('Today', ''))
    if(text.length >= 2) {
      setText('');
    } 
  }



  return (
    <Layout>
      <section className="w-full pt-4 pb-[60px] cl-2:w-[540px] md:w-[720px] lg:w-[960px] xl:w-[1170px] px-[15px] font-mulish">
        <section className="flex flex-col gap-10 mb-10">
          <LocationString />
        </section>
        <section className="flex flex-col">
          <h2 className="mb-10 text-[36px] leading-[43.2px] dark:text-white">
            {seasonMessage()}
          </h2>
          <div className="flex justify-end mb-3">
            <input value={text} onChange={(e) => setText(e.currentTarget.value)} type="text" className="w-2/4 p-[5px] border border-[#e1e1e1] rounded-[5px] focus:outline-none dark:bg-dark-200 dark:border-dark-200 dark:text-white dark:placeholder-white" placeholder="Filter anime..." />
          </div>
          <div className="flex flex-col gap-5 md:gap-7 md:flex-row">
            <ul className="h-fit md:w-[170px] lg:w-[210px] xl:w-[262px] shrink-0 shadow rounded-[5px] divide-y dark:divide-dark-150 overflow-hidden dark:bg-dark-100 dark:text-white">
              {
                days.map((day, key) => 
                  <li key={key} onClick={clickHandler} className={`p-[15px] relative ${day === currentDay ? 'bg-[#3d3d3d] dark:bg-dark-200 text-white' : 'hover:bg-[#3d3d3d] hover:text-white dark:hover:bg-dark-200'} cursor-pointer`}>
                    { day }
                    {
                      new Date().getUTCDay() - 1 === key &&
                      <span className="absolute py-1 px-2 rounded-[5px] right-3 text-white text-[11px] bg-myOrange-50">Today</span>
                    }  
                  </li>
                )
              }
            </ul>
            <div className="w-full rounded-[5px] overflow-hidden bg-white shadow dark:bg-dark-100">
              <h3 className="p-[10px] bg-[#3d3d3d] dark:bg-dark-200 text-white">{ tableTitle }</h3>
              <ul className="flex flex-wrap gap-5 py-5 px-3">
                {
                  filteredAnimes.length > 0 ? 
                  filteredAnimes.map((anime, key) => 
                    <li className="w-[calc(33.333%-15px)] xl:w-[calc(25%-15px)] dark:text-white text-xs group p" key={key}>
                      <Link className="flex shrink h-full flex-col items-center gap-3" to={`/anime/details/${anime.mal_id}`}>
                        <h3 className="w-full shrink-0 text-center truncate text-shad">
                          { anime.title || anime.title_english }
                        </h3>
                        <img className="block h-full border border-white rounded-2xl group-hover:shadow group-hover:shadow-[#00000065] group-hover:dark:shadow-white transition-shadow duration-300" src={anime.images.jpg.image_url} alt={anime.title || anime.title_english || anime.title_japanese} />
                        <span className="py-1 px-2 bg-blue-100 text-white rounded">Last chapter: {anime.episodes || 'Unknown'}</span>
                      </Link>
                    </li>
                  )
                  :
                  animes.map((anime, key) => 
                    <li className="w-[calc(33.333%-15px)] xl:w-[calc(25%-15px)] dark:text-white text-xs group p" key={anime.mal_id + key}>
                      <Link className="flex shrink h-full flex-col items-center gap-3" to={`/anime/details/${anime.mal_id}`}>
                        <h3 className="w-full shrink-0 text-center truncate text-shad">
                          { anime.title || anime.title_english }
                        </h3>
                        <img className="block h-full border border-white rounded-2xl group-hover:shadow group-hover:shadow-[#00000065] group-hover:dark:shadow-white transition-shadow duration-300" src={anime.images.jpg.image_url} alt={anime.title || anime.title_english || anime.title_japanese} />
                        <span className="py-1 px-2 bg-blue-100 text-white rounded">Last chapter: {anime.episodes || 'Unknown'}</span>
                      </Link>
                    </li>
                  )
                }
              </ul>
            </div>
          </div>
        </section>
      </section>
    </Layout>
  )
}

export default Schedules;