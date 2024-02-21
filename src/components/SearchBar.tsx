/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState, useRef } from "react";
import { IoSearchOutline } from "react-icons/io5";
import AnimeType from "../types/AnimeType";
import SearchList from "./SearchList";
import { FaUserCircle } from "react-icons/fa";
import useSWR from 'swr';
import { apiUrl } from '../constants'


const fetcher = (url: string) => fetch(url).then(res => res.json());

function SearchBar() {
  const [text, setText] = useState('');
  const [query, setQuery] = useState('');
  const [showSearchList, setShowSearchList] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const { data, isLoading} = useSWR(query ? `${apiUrl}/anime?q=${query}&limit=6&page=1&swf&type=tv` : null, fetcher, {
    revalidateOnFocus: false, // No revalidamos en el foco para este caso
    shouldRetryOnError: false, // No re intentamos en error para este caso
    dedupingInterval: 60000, // Tiempo en ms para de duplicar peticiones
  });

  // Los animes ahora vienen directo de data
  const animes:AnimeType[] = data?.data || null;

  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setText(e.target.value);
    setShowSearchList(true);
  }

  const handleOutsideClick = (event: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
      setShowSearchList(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);
  
  useEffect(() => {
    if(text !== '') {
      const handler = setTimeout(() => {
        setQuery(text);
      }, 1500);

      return () => {
        clearTimeout(handler);
      };
    }
    else {
      setQuery('');
    }
  }, [text])


  return (
    <div className="relative flex items-center gap-2">
      <article className="flex justify-between items-center gap-2 p-[15px] w-full lg:w-[204px] xl:w-[274px] h-12 bg-white dark:bg-dark-150 rounded-[25px]">
        <input ref={inputRef} onChange={changeHandler} value={text} className="w-full pl-3 lg:w-[135px] xl:w-[205px] placeholder-orange-300 text-orange-400 font-normal focus:outline-none dark:bg-dark-150 dark:text-white dark:placeholder-white" type="text" placeholder="Search anime..." />
        <IoSearchOutline className="text-xl scale-x-[-1] text-blue-50 hover:cursor-pointer" />
      </article>
      <FaUserCircle className="hidden lg:block w-11 h-11 text-white bg-blue-50 dark:bg-dark-200 hover:cursor-pointer" />
      {
        (showSearchList) && (
          isLoading ? (
            <SearchList isLoading={isLoading} />
          ):
          Array.isArray(animes) && (
            <SearchList animes={animes} />
          )
        )

        // {
        //   isLoading ? (
        //     <SearchList isLoading={isLoading} />
        //   ) : (
        //     Array.isArray(animes) && (
        //       <SearchList animes={animes} />
        //     )
        //   ) 
        // }

      }
    </div>
  )
}

export default SearchBar;