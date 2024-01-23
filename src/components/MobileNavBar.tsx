import NavBar from "./NavBar";
import LetterTable from "./LetterTable";
import { Link } from "react-router-dom";
import CategoryTable from "./CategoryTable";

function MobileNavBar() {
  const stopClickPropagation = (event: React.MouseEvent) => {
    event.stopPropagation();
  };
  return (
    <nav onClick={stopClickPropagation} className="top-0 left-0 flex flex-col items-center w-[77%] h-screen pt-2 pb-10 px-4 max-w-[760px] overflow-y-scroll bg-blue-50">
      <NavBar mobile={true} />
      <div className="mt-5 pl-3"> 
        <LetterTable />
      </div>
      <div className="w-full p-[15px] font-mulish text-[15px] font-bold">
        <h3 className="pb-[5px] px-3 mb-[10px] text-[#1a2c37] border-b-[1px] border-[#56b8e9]">ANIME BY TYPE:</h3>
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
        <h3 className="pb-[5px] px-3 mb-[10px] text-[#1a2c37] border-b-[1px] border-[#56b8e9]">ANIME BY LANGUAGE:</h3>
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