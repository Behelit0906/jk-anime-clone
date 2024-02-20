import { Link } from "react-router-dom";
import { genres } from "../constants";

function CategoryTable() {

  return (
    <div className="w-full p-[15px] font-mulish text-[15px] font-bold">
      <h3 className="pb-[5px] px-3 mb-[10px] text-[#1a2c37] border-b-[1px] border-[#56b8e9] dark:text-white">ANIME BY GENRE:</h3>
      <ul className="flex flex-wrap text-white">
        {
          genres.map((genre, key) => 
            <li className="w-2/4" key={key}>
              <Link 
                className="block w-full py-[5px] px-[10px] hover:text-myOrange-50 hover:pl-[15px] transition-all duration-300 ease-in-out" 
                to={`/genre/${genre.mal_id}`}>
                {genre.name}
              </Link>
            </li>
          )
        }
      </ul>
    </div>
  )
}

export default CategoryTable;