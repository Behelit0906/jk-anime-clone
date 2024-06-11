import Layout from "./Layout";
import { FaHome } from "react-icons/fa";
import DirectoryFilter from "../components/DirectoryComponents/DirectoryFilter";
import React, { useState } from "react";
import { genres, types, apiUrl } from "../constants";
import AnimeType from "../types/AnimeType";
import DirectoryCard from "../components/DirectoryComponents/DirectoryCard";
import { useNavigate } from 'react-router-dom';
import useExtractUrlQueries from "../utils/extractUrlQueries";
import useSWR from 'swr';
import { FaFilter } from "react-icons/fa";

function Directory() {
  const navigate = useNavigate();
  const queries = useExtractUrlQueries();
  const [order, setOrder] = useState(queries.order);
  const [sortingCriteria, setSortingCriteria] = useState(queries.sortingCriteria);
  const [genre, setGenre] = useState<{id:string|number, urlName:string}>({id: queries.genre.mal_id, urlName: queries.genre.urlName})
  const [type, setType] = useState({id: queries.type.id, urlName: queries.type.urlName});
  const [status, setStatus] = useState(queries.status);
  const [year, setYear] = useState(queries.year);
  const [page, setPage] = useState(queries.page);

  const years: number[] = [];
  for (let i = new Date().getUTCFullYear(); i >= 1981; i--) {
    years.push(i);
  }

  
  function selectHandler(e: React.ChangeEvent<HTMLSelectElement>) {
    switch (e.target.name) {
      case 'order':
        if(e.target.value === order) return;
        setOrder(e.target.value);
        break;

      case 'sortingCriteria':
        if(e.target.value === sortingCriteria) return;
        setSortingCriteria(e.target.value);
        break;

      case 'genre':
        if(e.target.value === genre.id) return; 
        setGenre({id: e.target.value.split('|')[0], urlName: e.target.value.split('|')[1] });
        break;

      case 'type':
        if(e.target.value === type.id) return;
        setType({id: e.target.value.split('|')[0], urlName: e.target.value.split('|')[1] });
        break;

      case 'status':
        if(e.target.value === status) return;
        setStatus(e.target.value);
        break;

      case 'year':
        if(Number(e.target.value) === year) return;
        setYear(Number(e.target.value));
        break;
    }
  }

  function filterButtonHandler() {
    navigate(`/directory?genre=${genre.urlName}&type=${type.urlName}&status=${status}&year=${year}&sorting_criteria=${sortingCriteria}&order=${order}&page=1`)
  }

  function clickHandler(e:React.MouseEvent<HTMLButtonElement>) {
    if(e.currentTarget.name === 'previousButton' && page > 1) {
      const temp = page;
      setPage(temp - 1);
      navigate(`/directory?genre=${genre.urlName}&type=${type.urlName}&status=${status}&year=${year}&sorting_criteria=${sortingCriteria}&order=${order}&page=${temp - 1}`)
    }
    else if(page < totalPages) {
      const temp = page;
      setPage(temp + 1);
      navigate(`/directory?genre=${genre.urlName}&type=${type.urlName}&status=${status}&year=${year}&sorting_criteria=${sortingCriteria}&order=${order}&page=${page + 1}`)
    }

  }

  const { data } = useSWR(`${apiUrl}/anime?genres=${queries.genre.mal_id}&type=${queries.type.id}&status=${queries.status}${queries.year !== 0 ? `&start_date=${queries.year}-01-01` : ''}&limit=24&page=${queries.page}&order_by=${queries.sortingCriteria}&sort=${queries.order}`);

  const animes:AnimeType[] = data?.data || null;

  const totalPages = data?.pagination?.last_visible_page;

  return (
    <Layout>
      <section className="w-full py-[60px] cl-2:w-[540px] md:w-[720px] lg:w-[960px] xl:w-[1170px] px-[15px]">
        <h4 className="w-[45%] md:w-[50%] font-oswald leading-[21px] text-[#212529] dark:text-white text-2xl pl-[20px] border-l-4 border-myOrange-50 mb-10">
          <FaHome className="inline" /> COMPLETE LIST OF ANIMES
        </h4>
        <div className="mb-5">
          <DirectoryFilter />
          <div className="flex gap-1 flex-wrap mt-10">
            <select onChange={selectHandler} name="sortingCriteria" value={sortingCriteria} className="p-3 w-24 font-mulish text-sm bg-white border border-[#dbdbdb] rounded">
              <option value="start_date">By date</option>
              <option value="title">By name</option>
              <option value="popularity">Popularity</option>
            </select>
            <select onChange={selectHandler} value={order} name="order" className="p-3 w-26 font-mulish text-sm bg-white border border-[#dbdbdb] rounded">
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
            <select onChange={selectHandler} value={`${genre.id}|${genre.urlName}`} name="genre" className="p-3 w-24 font-mulish text-sm bg-white border border-[#dbdbdb] rounded">
              <option value="|">Genre</option>
              {
                genres.map(genre => 
                  <option key={genre.mal_id} value={`${genre.mal_id}|${genre.urlName}`}>{genre.name}</option>  
                )
              }
            </select>
            <select onChange={selectHandler} value={`${type.id}|${type.urlName}`} name="type" className="p-3 w-24 font-mulish text-sm bg-white border border-[#dbdbdb] rounded">
              <option value="|">Type</option>
              {
                types.map(type => 
                  <option key={type.id} value={`${type.id}|${type.urlName}`}>{type.name}</option>  
                )
              }
            </select>
            <select name="status" onChange={selectHandler} className="p-3 w-26 font-mulish text-sm bg-white border border-[#dbdbdb] rounded">
              <option value="">Status</option>
              <option value="airing">Airing</option>
              <option value="complete">Finished</option>
              <option value="upcoming">Upcoming</option>
            </select>
            <select onChange={selectHandler} size={1} name="year" value={year} className="p-3 w-26 font-mulish text-sm bg-white border border-[#dbdbdb] rounded">
              <option value="">Year</option>
              {
                years.map(year => 
                  <option key={year} value={year}>{year}</option>  
                )
              }
            </select>
            <button onClick={filterButtonHandler} className="flex items-center p-3 bg-blue-100 rounded text-white font-mulish">
              <FaFilter className="mr-1" />
              Filter
            </button>

          </div>
        </div>
        <div className="flex gap-5 md:gap-6 flex-wrap mb-5">
          {
            animes && animes.map((anime, key) => 
              <DirectoryCard key={key}
              title={anime.title}
              sinopsis={anime.synopsis}
              status={anime.status}
              img={anime.images.jpg.image_url}
              type={anime.type}
              id={anime.mal_id} />  
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

export default Directory;