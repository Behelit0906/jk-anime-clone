import { Link } from "react-router-dom";
import Layout from "./Layout";
import { FaFilter, FaHome } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useSWR from 'swr';
import { apiUrl } from "../constants";
import AddAnimeCard from "../components/AddAnimeCard";
import AnimeType from "../types/AnimeType";

function Search () {
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const q = searchParams.get('q');
  const pageQuery = Number(searchParams.get('page')) || 1;
  const orderByQuery = ['title', 'start_date'].includes(String(searchParams.get('order_by'))) ? String(searchParams.get('order_by')) : 'title';
  const typeQuery = ['tv','movie','special','ova','ona'].includes(String(searchParams.get('type'))) ? String(searchParams.get('type')) : '';
  const stateQuery = ['airing', 'complete'].includes(String(searchParams.get('status'))) ? String(searchParams.get('status')) : '';
  const sortQuery = ['asc', 'desc'].includes(String(searchParams.get('sort'))) ? String(searchParams.get('sort')) : 'asc';
  const ratings = ['PG-13 - Teens 13 or older', 'R+ - Mild Nudity', 'R - 17+ (violence & profanity)'];


  const [orderBy, setOrderBy] = useState(orderByQuery);
  const [type, setType] = useState(typeQuery);
  const [state, setState] = useState(stateQuery);
  const [sort, setSort] = useState(sortQuery);


  const { data } = useSWR(`${apiUrl}/anime?q=${q}&type=${typeQuery}&order_by=${orderByQuery}&status=${stateQuery}&sort=${sortQuery}&page=${pageQuery}&limit=25&sfw=true`)
  const animes:AnimeType[] = data?.data.filter((anime: { rating: string; }) => ratings.includes(anime.rating)) || [];
  const totalPages = data?.pagination?.last_visible_page;


  useEffect(() => {
    setOrderBy(orderByQuery);
  }, [orderByQuery])

  useEffect(() => {
    setType(typeQuery);
  }, [typeQuery])

  useEffect(() => {
    setState(stateQuery);
  }, [stateQuery])

  useEffect(() => {
    setSort(sortQuery);
  }, [sortQuery])



  function filterHandler() {
    navigate(`/search?q=${q}&type=${type}&order_by=${orderBy}&state=${state}&sort=${sort}&page=1`)
  }

  function clickHandler(e:React.MouseEvent<HTMLButtonElement>) {
    if(e.currentTarget.name === 'previousButton' && pageQuery > 1) {
      navigate(`/search?q=${q}&type=${type}&order_by=${orderBy}&state=${state}&sort=${sort}&page=${pageQuery - 1}`)
    }
    else if(pageQuery < totalPages) {
      navigate(`/search?q=${q}&type=${type}&order_by=${orderBy}&state=${state}&sort=${sort}&page=${pageQuery + 1}`)
    }

  }

  return (
    <Layout>
      <section className="w-full pt-4 pb-[60px] cl-2:w-[540px] md:w-[720px] lg:w-[960px] xl:w-[1170px] px-[15px] font-mulish">
        <section className="flex flex-col gap-10 mb-14">
          <div className="flex gap-1">
            <Link className="flex gap-1 items-center font-mulish text-[15px] dark:text-white" to={'/'}>
              <FaHome className="mr-2" />
                Home
              <IoIosArrowForward />
            </Link>
              <span className="font-mulish text-[15px] text-myOrange-50">     
                { q }
              </span>
          </div>  
        </section>
        <section className="flex flex-col">
          <h3 className="text-[26px] mb-5 pl-4 dark:text-white font-oswald border-l-4 border-l-myOrange-50">{`RESULTS FOR ${q?.toUpperCase()}`}</h3>
          <span className="block w-full h-[2px] bg-[#ffffff71]"></span>
          <div className="flex md:justify-end flex-wrap mt-7 gap-1 mb-5">
            <select value={orderBy} onChange={(e) => setOrderBy(e.currentTarget.value)} className="px-3 w-24 h-10 font-mulish text-sm bg-white border border-[#dbdbdb] rounded">
              <option value="title">By name</option>
              <option value="start_date">By date</option>
            </select>

            <select value={type} onChange={(e) => setType(e.currentTarget.value)} className="px-3 w-24 h-10 font-mulish text-sm bg-white border border-[#dbdbdb] rounded">
              <option value="">All</option>
              <option value="movie">Movies</option>
              <option value="tv">Animes</option>
              <option value="special">Specials</option>
              <option value="ova">Ovas</option>
              <option value="ona">Onas</option>
            </select>

            <select value={state} onChange={(e) => setState(e.currentTarget.value)} className="px-3 w-24 h-10 font-mulish text-sm bg-white border border-[#dbdbdb] rounded">
              <option value="">Any</option>
              <option value="airing">Airing</option>
              <option value="complete">Finished</option>
            </select>

            <select value={sort} onChange={(e) => setSort(e.currentTarget.value)} className="px-3 w-26 h-10 font-mulish text-sm bg-white border border-[#dbdbdb] rounded">
              <option value="desc">Ascending</option>
              <option value="asc">Descending</option>
            </select>

            <button onClick={filterHandler} className="flex items-center px-3 h-10 bg-blue-100 rounded text-white font-mulish">
              <FaFilter className="mr-1" />
              Filter
            </button>

          </div>
          <ul className="flex flex-wrap justify-between gap-4">
            {
              animes.map(anime => 
                <li className="w-[47%] max-w-[330px] lg:w-[130px] xl:w-[165px] mb-[30px]" key={anime.mal_id}>
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
          <div className="flex justify-center gap-2">
          {
            pageQuery > 1 &&
            <button name="previousButton" className="bg-myOrange-50 text-white p-3 rounded" onClick={clickHandler}>Previous results</button>
          }
          {
            pageQuery > 0 && pageQuery < totalPages &&
            <button onClick={clickHandler} className="bg-myOrange-50 text-white p-3 rounded">Next Result</button>
          }
        </div>
        </section>
      </section>
    </Layout>
  )
}

export default Search;