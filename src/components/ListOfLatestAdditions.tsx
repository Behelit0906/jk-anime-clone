import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import dataFetcher from "../utils/dataFetcher";
import AnimeType from "../types/AnimeType";

function ListOfLatestAdditions() {

  const [latestAdditions, setLatestAdditions] = useState<AnimeType[]>([]);

  useEffect(() => {
    async function getLatestAdditions() {
      const response = await dataFetcher([
        '/anime?status=airing&type=tv&order_by=start_date&sort=desc&limit=22&page=1',
        '/anime?status=airing&type=tv&order_by=start_date&sort=desc&limit=22&page2',
        '/anime?status=airing&type=tv&order_by=start_date&sort=desc&limit=22&page3',
      ])
      setLatestAdditions(response);
    }

    const id = setTimeout(getLatestAdditions, 5000)
    
    return () => clearTimeout(id);
  }, [])

  return(
    <section className="pt-9" >
      <div className="hidden lg:block w-[320px] xl:w-[390px] px-[15px] bg-white dark:bg-dark-100 pt-3 pb-5 rounded-[5px] shadow">
        <h4 className="relative border-l-4 border-myOrange-50 pl-5 text-2xl text-[#232323] dark:text-white font-semibold font-oswald mb-10">
          LIST OF LATEST <span className="absolute left-5 top-5">ADDITIONS</span>
        </h4>
        <ul>
          {
            latestAdditions && latestAdditions.map((anime, key) => 
            <li key={key} className={`${key % 2 !== 0 ? 'bg-[#efefef] dark:bg-dark-150' : ''}  hover:bg-[#C3DFEA] dark:hover:bg-dark-50 transition-colors duration-500`}>
              <Link to="./" style={{
                backgroundImage: "url('https://cdn.jkdesu.com/assets2/css/img/bullet.png')",
                backgroundRepeat: 'no-repeat',
                backgroundPosition: '5px 6px'

              }} className="pl-[30px] pr-[10px] pt-[5px] pb-1 text-[12px] text-[#777777] dark:text-white flex items-start">
                {anime.title}
              </Link>
            </li>
            )
          }
        </ul>
      </div>
    </section>
  )
}

export default ListOfLatestAdditions;