import AnimeType from "../types/AnimeType";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaWandMagicSparkles } from "react-icons/fa6";
import dataFetcher from "../utils/dataFetcher";

function ProgramList() {
  const [animes, setAnimes] =useState<AnimeType[]>([]);

  const darkModeInput = useRef<HTMLInputElement>(null);

  function clickHandler() {
    const inputValue = !darkModeInput.current?.checked;
    if(inputValue) {
      document.getElementById('root')?.classList.add('dark');
    }
    else {
      document.getElementById('root')?.classList.remove('dark');
    }
    localStorage.setItem('darkMode', String(inputValue));
  }

  useEffect(() => {
    const getAnimes = async () => {
      const response = await dataFetcher(['/anime?status=airing&type=tv&order_by=start_date&sort=desc'])
      setAnimes(response);
    }

    const id = setTimeout(getAnimes, 1000);

    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    const darkMode = localStorage.getItem('darkMode');
    if(darkMode) {
      if(darkModeInput.current) {
        darkModeInput.current.checked = darkMode === 'true';
      }
    }
  }, [])

  return (
    <section>
      <div className="flex flex-col mb-6 xl:flex-row-reverse xl:gap-3">
        <div className="flex justify-between items-center mb-2 xl:gap-1">
            <div className="flex justify-end w-[180px] h-[35px] font-mulish text-white">
              <input ref={darkModeInput} type="checkbox" name="toggle" id="toggle" className="w-0 h-0 opacity-0" />
              <label onClick={clickHandler} htmlFor="toggle" className="switch relative flex items-center w-full h-full bg-[#ccc] rounded-3xl hover:cursor-pointer transition-colors duration-300">
                <span className="left-circle absolute left-[-20px] w-[26px] h-[26px] ml-2 bg-white rounded-full opacity-0 transition duration-300"></span>
                <p className="text absolute left-[50px] top-1 transition-transform duration-300">
                  Dark mode
                </p>
                <span className="right-circle absolute right-2 w-[26px] h-[26px] ml-2 bg-white rounded-full transition duration-300"></span>
              </label>
            </div>
            <Link className="flex justify-center items-center rounded-[20px] w-9 h-8 bg-blue-50 transition-colors duration-300 hover:bg-myOrange-50" to='/'>
              <FaWandMagicSparkles className="text-white" />
            </Link>
        </div>
        <h4 className="font-oswald text-[#333] dark:text-white text-[18px] pl-5 border-l-4 border-myOrange-50 py-1">
          SCHEDULING
        </h4>
      </div>
      <div className="w-full flex rounded-[10px] text-white overflow-hidden font-mulish mb-3">
        <p className="w-2/4 p-[6px] text-center bg-[#DC821B] hover:cursor-pointer">Animes</p>
        <p className="w-2/4 p-[6px] text-center bg-[#FB9800] hover:cursor-pointer">Donghuas</p>
      </div>
      <ul className="w-full overflow-y-auto h-[900px] rounded-[10px] bg-white dark:bg-dark-100 scrollBarColor mi-div">
      {
        animes.length > 0 && animes.map((anime, key) => 
          <li className="w-full min-h-[93px] hover:bg-[#E6E6E6] dark:hover:bg-[#303240] transition-colors duration-300" key={key}>
            <Link className="flex gap-x-3 items-center py-[10px] px-[6px] h-fit border-b border-[#efefef] dark:border-[#303240]" to='/'>
              <div className="relative w-[114px] h-[73px] rounded-[10px] overflow-hidden shrink-0">
                <img className="absolute left-0 top-[-55%] w-[110px] h-[155px]" src={anime.images.jpg.image_url} alt={anime.title} />
              </div>
              <div className="flex justify-between w-full h-fit pr-3">
                <div className="flex flex-col gap-1 font-mulish text-[13px]">
                  <h5 className="font-bold text-[#323232] dark:text-white">{anime.title}</h5>
                  <h6 className="text-myOrange-50 font-semibold">Episode 5</h6>
                </div>
                <div className="flex items-center shrink-0">
                  <img src="https://cdn.jkdesu.com/assets2/css/img/flecha.png" />
                </div>
              </div>
            </Link>
          </li>  
        )
      }
      </ul>
    </section>
  )
}

export default ProgramList;