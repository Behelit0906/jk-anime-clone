import Layout from "./Layout";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { apiUrl } from "../constants";
import AnimeType from "../types/AnimeType";
import MobileAnimeDetailCard from "../components/AnimeDetailComponents/MobileAnimeDetailCard";
import AnimeDetailCard from "../components/AnimeDetailComponents/AnimeDetailCard";
import CharacterType from "../types/CharacterType";
import ChapterCard from "../components/AnimeDetailComponents/ChapterCard";
import useSWR from 'swr';

function AnimeDetails() {
  const [groupsOfEpisodes, setGroupOfEpisodes] = useState<number[]>([]);
  const [chaptersToRender, setChaptersToRender] = useState<number[]>([]);
  const [characters, setCharacters] = useState<CharacterType[]>();
  const { id } = useParams();
  const navigate = useNavigate();

  const characterButton = useRef<HTMLButtonElement>(null);
  const chapterButton = useRef<HTMLButtonElement>(null);
  const characterTable = useRef<HTMLDivElement>(null);
  const chapterTable = useRef<HTMLDivElement>(null);

  const { data } = useSWR(`${apiUrl}/anime/${id}`);

  const anime:AnimeType = data?.data || null;

  useEffect(() => {
    if(!Number.isInteger(Number(id))) navigate('/')
  }, [id, navigate])


  useEffect(() => {
    if(anime?.episodes) {
      
      if(anime.episodes > 12) {
        const groups = Math.floor(anime.episodes / 12) < 1 ? 1 : Math.floor(anime.episodes / 12);
        const groupsOfEpisodes:number[] = [1];
        for(let i = 1; i < groups; i ++) {
          groupsOfEpisodes.push((i * 12) + 1)
        }
        const exceden = anime.episodes % 12;
        if(exceden > 0) groupsOfEpisodes.push(groupsOfEpisodes[groupsOfEpisodes.length - 1] + 12);
        setGroupOfEpisodes(groupsOfEpisodes);
      }
      else setGroupOfEpisodes([1]);
    }
  }, [anime])

  useEffect(() => {
    async function getAnimeCharacters() {
      const response = await fetch(`${apiUrl}/anime/${id}/characters`).then(res => res.json());

      if(response) setCharacters(response.data);
    }

    getAnimeCharacters();
  }, [id])

  useEffect(() => {
    if(anime) {
      const temp = [];
      if(anime.episodes < 13) 
        for(let i = 1; i <= anime.episodes; i++)
          temp.push(i);

      else
        for(let i = 1; i <= 12; i++)
          temp.push(i);

      setChaptersToRender(temp);
    }

  }, [anime])

  function generateRandomNumber():number {
    return Math.floor(Math.random() * 101);
  }

  const toView = generateRandomNumber();
  const viewed = generateRandomNumber();
  const peopleWatching = generateRandomNumber();

  function generateStudioAndGenreStrings(items: {name:string}[]) {
    return items.map(item => item.name).join(', ')
  }

  function clickHandler() {
    characterButton.current?.classList.toggle('bg-blue-50');
    characterButton.current?.classList.toggle('text-white');
    chapterButton.current?.classList.toggle('bg-blue-50');
    chapterButton.current?.classList.toggle('text-white');
    characterTable.current?.classList.toggle('hidden');
    chapterTable.current?.classList.toggle('hidden');
  }

  function chaptersHandler(e:React.MouseEvent<HTMLLIElement>) {
    const start = Number(e.currentTarget.getAttribute('data-start'));
    const end = Number(e.currentTarget.getAttribute('data-end'));
    const temp = [];

    for(let i = start; i <= end; i++)
      temp.push(i);
    
    setChaptersToRender(temp);
  }
  

  return(
    <Layout>
      <section className="w-full py-[30px] cl-2:w-[540px] md:w-[720px] lg:w-[960px] xl:w-[1170px] px-[15px] mb-20">
        {
          anime && 
          <MobileAnimeDetailCard
            anime={anime}
            peopleWatching={peopleWatching}
            toView={toView}
            viewed={viewed}
            genres={generateStudioAndGenreStrings(anime.genres)}
            studios={generateStudioAndGenreStrings(anime.studios)}
          />
        }
        {
          anime && 
          <AnimeDetailCard 
            anime={anime} 
            peopleWatching={peopleWatching}
            toView={toView}
            viewed={viewed}
            genres={generateStudioAndGenreStrings(anime.genres)}
            studios={generateStudioAndGenreStrings(anime.studios)}
          />
        }
        <section className="mt-5">
          <div className="flex bg-white font-mulish rounded overflow-hidden mb-4">
            <button onClick={clickHandler} ref={chapterButton} id="chapters" className="w-2/4 p-2 bg-blue-50 text-white">Chapters</button>
            <button onClick={clickHandler} ref={characterButton} id="characters" className="w-2/4 p-2">Characters</button>
          </div>
          <div className="hidden" ref={characterTable}>
            {
              characters ?  
              <ul className="flex flex-wrap gap-y-6 justify-between lg:justify-start lg:gap-6 xl:gap-[30px] font-mulish">
                {
                  characters.map((character, key) => 
                  <li key={key} className="relative w-[47%] lg:w-[23%] mb-5">
                    <img className="w-full h-full" src={character.character.images.jpg.image_url} />
                    <span className="w-[70%] py-1 rounded bg-blue-50 text-white text-center absolute bottom-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2">{character.role}</span>
                    <p className="text-center dark:text-white">{character.character.name}</p>
                  </li>
                  ) 
                }
              </ul>
              : <p className="font-mulish dark:text-white">Sorry, we don't have the characters of this anime yet. Please be patient.</p>
            }
          </div>
          {
            anime?.episodes ? 
            <div ref={chapterTable}>
              <ul className="flex flex-wrap gap-y-7 justify-between lg:justify-start lg:gap-x-[30px] mb-6">
                {
                  anime && chaptersToRender.map(item =>
                    <ChapterCard 
                      image={anime?.images.jpg.image_url}
                      number={item}
                      key={item}
                    /> 
                  )
                }
              </ul>
              <ul className="flex flex-wrap w-full gap-3">
                {
                  anime && groupsOfEpisodes.map((group, key) => 
                    <li 
                    data-start={group}
                    data-end={group + 11 < anime.episodes ? group + 11 : anime.episodes}
                    className="py-2 px-3 rounded-xl bg-blue-50 text-white font-mulish text-xs hover:cursor-pointer" 
                    key={key}
                    onClick={chaptersHandler}>
                      {
                        `${group} - ${`${group + 11 < anime.episodes ? `${group + 11}` : anime.episodes}`}`
                      }
                    </li>
                  )
                }
              </ul>
            </div>
            : <p className="font-mulish dark:text-white">Sorry, we don't have the chapters of this anime yet. Please be patient.</p>
          }
          
        </section>
      </section>
      
    </Layout>
  )
}


export default AnimeDetails