import Layout from "./Layout";
import { FaHome } from "react-icons/fa";
import DirectoryFilter from "../components/DirectoryComponents/DirectoryFilter";
import React, { useState, useEffect } from "react";
import { genres, types, apiUrl } from "../constants";
import AnimeType from "../types/AnimeType";
import DirectoryCard from "../components/DirectoryComponents/DirectoryCard";



function Directory() {
  const [orderBy, setOrderBy] = useState('title');
  const [sort, setSort] = useState('desc');
  const [genre, setGenre] = useState(1);
  const [type, setType] = useState('');
  const [status, setStatus] = useState('airing');
  const [year, setYear] = useState(new Date().getUTCFullYear());
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [animes, setAnimes] = useState<AnimeType[]>([]);

  const years: number[] = [];
  for (let i = new Date().getUTCFullYear(); i >= 1981; i--) {
    years.push(i);
  }

  function selectHandler(e: React.ChangeEvent<HTMLSelectElement>) {
    switch (e.target.name) {
      case 'byOrder':
        if(e.target.value === orderBy) return;
        setOrderBy(e.target.value);
        break;

      case 'sort':
        if(e.target.value === sort) return;
        setSort(e.target.value);
        break;

      case 'genre':
        if(Number(e.target.value) === genre) return;
        setGenre(Number(e.target.value));
        break;

      case 'type':
        if(e.target.value === type) return;
        setType(e.target.value);
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

  function clickHandler(e:React.MouseEvent<HTMLButtonElement>) {
    if(e.currentTarget.name === 'previousButton') setPage(page - 1);
    else setPage(page + 1);
  }

  useEffect(() => {
    async function getAnimes() {
      const response = await fetch(`${apiUrl}/anime?genres=${genre}&type=${type}&status=${status}${year !== 0 ? `&start_date=${year}-01-01` : ''}&limit=24&page=${page}`).then(res => res.json());

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
  }, [genre, status, type, year, page]);


  return (
    <Layout>
      <section className="w-full py-[60px] cl-2:w-[540px] md:w-[720px] lg:w-[960px] xl:w-[1170px] px-[15px]">
        <h4 className="w-[45%] md:w-[50%] font-oswald leading-[21px] text-[#212529] dark:text-white text-2xl pl-[20px] border-l-4 border-myOrange-50 mb-10">
          <FaHome className="inline" /> COMPLETE LIST OF ANIMES
        </h4>
        <div className="mb-5">
          <DirectoryFilter />
          <div className="flex gap-1 flex-wrap mt-10">
            <select onChange={selectHandler} name="orderBy" className="p-3 w-24 font-mulish text-sm bg-white border border-[#dbdbdb] rounded">
              <option value="start_date">By date</option>
              <option value="title">By name</option>
            </select>
            <select onChange={selectHandler} name="sort" className="p-3 w-26 font-mulish text-sm bg-white border border-[#dbdbdb] rounded">
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
            <select onChange={selectHandler} name="genre" className="p-3 w-24 font-mulish text-sm bg-white border border-[#dbdbdb] rounded">
              <option value="">Genre</option>
              {
                genres.map(genre => 
                  <option key={genre.mal_id} value={genre.mal_id}>{genre.name}</option>  
                )
              }
            </select>
            <select onChange={selectHandler} name="type" className="p-3 w-24 font-mulish text-sm bg-white border border-[#dbdbdb] rounded">
              <option value="">Type</option>
              {
                types.map(types => 
                  <option key={types.id} value={types.id}>{types.name}</option>  
                )
              }
            </select>
            <select name="status" onChange={selectHandler} className="p-3 w-26 font-mulish text-sm bg-white border border-[#dbdbdb] rounded">
              <option value="">Status</option>
              <option value="airing">Airing</option>
              <option value="complete">Finished</option>
              <option value="upcoming">Upcoming</option>
            </select>
            <select onChange={selectHandler} name="year" className="p-3 w-26 font-mulish text-sm bg-white border border-[#dbdbdb] rounded">
              <option value={0}>Year</option>
              {
                years.map(year => 
                  <option key={year} value={year}>{year}</option>  
                )
              }
            </select>
            

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