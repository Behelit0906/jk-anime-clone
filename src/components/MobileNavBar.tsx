import NavBar from "./NavBar";
import LetterTable from "./LetterTable";
import { Link } from "react-router-dom";
import CategoryTable from "./CategoryTable";

function MobileNavBar() {
  
  return (
    <nav className="top-0 left-0 flex flex-col items-center w-full h-screen pt-2 pb-10 overflow-y-scroll bg-blue-50 dark:bg-dark-200">
      <NavBar mobile={true} />
      <div className="mt-5 px-[15px]"> 
        <LetterTable />
      </div>
      <div className="w-full p-[15px] font-mulish text-[15px] font-bold">
        <h3 className="pb-[5px] px-3 mb-[10px] text-[#1a2c37] border-b-[1px] border-[#56b8e9] dark:text-white">ANIME BY TYPE:</h3>
        <ul className="w-full flex justify-between text-white"> 
          <li className="w-2/4">
            <Link className="block w-full py-[5px] px-[10px] hover:text-myOrange-50 hover:pl-[15px] transition-all duration-300 ease-in-out" to="./">Ovas</Link>
          </li>
          <li className="w-2/4">
            <Link className="block w-full py-[5px] px-[10px] hover:text-myOrange-50 hover:pl-[15px] transition-all duration-300 ease-in-out" to="./">Movies</Link>
          </li>
        </ul>
      </div>
      <div className="w-full p-[15px] mb-4 font-mulish text-[15px] font-bold">
        <h3 className="pb-[5px] px-3 mb-[10px] text-[#1a2c37] border-b-[1px] border-[#56b8e9] dark:text-white">ANIME BY LANGUAGE:</h3>
        <ul>
          <li className="w-full">
            <Link className="block w-full py-[5px] px-[10px] text-white hover:text-myOrange-50 hover:pl-[15px] transition-all duration-300 ease-in-out" to="./">Anime in Spanish</Link>
          </li>
        </ul>
      </div>
      <CategoryTable />
    </nav>
  )
}

export default MobileNavBar;