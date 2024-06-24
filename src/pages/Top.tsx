import Layout from "./Layout";
import LocationString from "../components/TopPageComponents/LocationString";
import Timer from "../components/Timer";
import { FaFilter } from "react-icons/fa";
import { useState, useEffect } from "react";
import useSWR from 'swr';
import { apiUrl } from "../constants";
import AnimeType from "../types/AnimeType";
import TopCard from "../components/TopPageComponents/TopCard";
import { useNavigate} from 'react-router-dom';

function getValidYear(year: string|null ) {
  const tempYear = Number(year);
  const currentYear = new Date().getUTCFullYear();

  if(tempYear <= currentYear && tempYear >= currentYear - 4)
    return tempYear;
  else return '';
}

function getDateRange(season:string|null) {
  const result = ['', ''];
  if(!season) return result;

  const seasons = ['winter', 'spring', 'fall', 'summer'];
  const dates = new Map([
    ['winterStart', '-01-01'], ['winterEnd', '-03-31'],
    ['springStart', '-04-01'], ['springEnd', '-06-30'],
    ['summerStart', '-07-01'], ['summerEnd', '-09-30'],
    ['fallStart', '-10-01'], ['fallEnd', '-12-31']
  ])

  if(seasons.includes(season)) {
    result[0] = String(dates.get(`${season}Start`))
    result[1] = String(dates.get(`${season}End`))
  }

  return result;
}

function getSeason (season:string | null):string {
  if(!season) return ''
  const seasons = ['winter', 'spring', 'fall', 'summer'];
  return seasons.includes(String(season)) ?  season : '';
}

const seasonTitles = new Map([
  ['', ''],
  ['spring', 'Most voted anime of April, May, June'],
  ['winter', 'Most voted anime of January, February, March'],
  ['summer', 'Most voted anime of July, August, September'],
  ['fall', 'Most voted anime of October, November, December']
])


function Top () {

  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const yearQuery = getValidYear(searchParams.get('year'));
  const years = new Array(5).fill(0).map((_, i) => new Date().getUTCFullYear() - i);
  const seasonQuery = getSeason(searchParams.get('season'));
  const dateRange = getDateRange(searchParams.get('season'))
  const [animes, setAnimes] = useState<AnimeType[]>([]);
  const [year, setYear] = useState(yearQuery); 
  const [season, setSeason] = useState(seasonQuery);
  const page = yearQuery && seasonQuery ? 1 : 2;
  const count = yearQuery && seasonQuery ? 1 : 11;
  const [isDisabled, setIsDisabled] = useState(false);
  
  
  const url = `${apiUrl}/anime?order_by=score&sort=desc&limit=10&start_date=${yearQuery}${dateRange[0]}&end_date=${yearQuery}${dateRange[1]}&page=${page}&sfw=true`
  const { data } = useSWR(url);

  useEffect(() => {
    if(data?.data)  
      setAnimes(data.data);
  }, [data])

  useEffect(() => {
    setYear(yearQuery);
  }, [yearQuery])
  
  useEffect(() => {
    setSeason(seasonQuery)
  }, [seasonQuery])

  useEffect(() => {
    setIsDisabled(false);
  }, [yearQuery, seasonQuery])

  

  
  function clickHandler() {
    setAnimes([])
    setIsDisabled(false);
    if(!year && !season) {
      navigate('/top')
    } 
    else navigate(`/top?season=${season}&year=${year}`);
  }
  
  function showMoreHandler() {
    async function fetcher () {

      const response1 = await fetch(`${apiUrl}/anime?order_by=score&sort=desc&limit=25&start_date=${year}${dateRange[0]}&end_date=${year}${dateRange[1]}&page=1`);
      const response2 = await fetch(`${apiUrl}/anime?order_by=score&sort=desc&limit=25&start_date=${dateRange[0]}&end_date=${dateRange[1]}&page=2`);
      const data1 = await response1.json();
      const data2 = await response2.json();

      if(page === 2) {
        const result: AnimeType[] = [...(data1?.data.splice(20) || []), ...(data2?.data || [])];
        setAnimes([...animes, ...result])
      }
      else {
        const result: AnimeType[] = [...(data1?.data.splice(11) || []), ...(data2?.data || [])];
        setAnimes([...animes, ...result])
      }
      
      
    }

    fetcher();
    setIsDisabled(true);
  }

  return (
    <Layout>
      <section className="w-full pt-4 pb-[60px] cl-2:w-[540px] md:w-[720px] lg:w-[960px] xl:w-[1170px] px-[15px] font-mulish">
        <section className="flex flex-col gap-10 mb-7">
          <LocationString />
        </section>
        <section className="flex flex-col">
          <p className="text-[26px] mb-5 dark:text-white">Most voted anime | <span className=""><Timer textSize="text-[32px]" /></span></p>
          <div className="flex flex-col gap-[6px] md:flex-row p-5 rounded-[17px] bg-[#E3E3E3] mb-5 dark:bg-dark-50">
            <select 
              onChange={(e) => setSeason(e.currentTarget.value)} 
              value={season} 
              className="w-full pl-[18px] h-10 md:w-2/4 bg-[#F7F7F7] rounded-[5px] dark:bg-dark-150 dark:text-white">
                <option value=''>Season</option>
                <option value={'spring'}>Spring</option>
                <option value={'summer'}>Summer</option>
                <option value={'fall'}>Fall</option>
                <option value={'winter'}>Winter</option>
            </select>
            <select 
              onChange={(e) => setYear(e.currentTarget.value)} 
              value={year} 
              className="w-full pl-[18px] h-10 md:w-2/4 bg-[#F7F7F7] rounded-[5px] dark:bg-dark-150 dark:text-white">
                <option value={''}>Year</option>
                {
                  years.map((item) => 
                    <option value={item} key={item}>{item}</option>
                  )
                }
            </select>
            <button onClick={clickHandler} 
              className="flex py-[6px] px-[12px] md:w-[200px] xl:w-[250px] items-center justify-center bg-[#007bff] hover:bg-[#0069D9] transition-colors rounded text-[18px] text-white font-mulish dark:bg-dark-150">
                <FaFilter className="mr-1" />
                Filter
            </button>
          </div>
          <section>
            {
              seasonQuery && yearQuery &&
              <h3 className="text-myOrange-50 py-3 px-[14px] mb-5 text-3xl border-l-[6px] border-myOrange-50 bg-white">
                {
                  `${seasonTitles.get(seasonQuery)} ${yearQuery}.`
                }
              </h3>
            }
            {
              animes.length > 0 ?
              <ul className="flex flex-col gap-10">
                {
                  animes.map((anime, index) => 
                    <li key={index}>
                      <TopCard anime={anime} number={index + count} />
                    </li>
                  )
                }
              </ul>
              :
              <p>No animes were found</p>
            }
          </section>
        </section>
        <button disabled={isDisabled} onClick={showMoreHandler} 
        className={`w-full p-[11px] rounded-[5px] text-center mt-10 ${isDisabled ? 'bg-slate-400' : 'bg-blue-100'} text-white`}>
          Show more
        </button>
      </section>
    </Layout>
  )
}

export default Top;