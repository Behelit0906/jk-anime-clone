import { Link } from "react-router-dom";

function DirectoryFilter() {
  const letters = 'ABCDEFGHIJKLMOPQRSTUVWXYZ'.split('');

  return (
    <ul className="flex justify-center flex-wrap jus p-2 bg-[#607d8b] rounded-xl dark:bg-dark-100">
      {
        letters.map((letter, key) => 
          <li key={key} className="text-white hover:bg-white hover:text-[#607d8b]">
            <Link to={`/anime-by-letter?letter=${letter}`} className="block p-[10px]">{letter}</Link>
          </li>
        )
      }
    </ul>
  )
}

export default DirectoryFilter;