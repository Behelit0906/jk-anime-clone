import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";


function LocationString() {
  const location = useLocation();

  const pageName = location.pathname.includes('/top') ? 'Current top' : 'Ranking global';

  return (
    <div className="flex gap-1">
      <Link className="flex gap-1 items-center font-mulish text-[15px]" to={'/'}>
        <FaHome className="mr-2" />
          Home
        <IoIosArrowForward />
      </Link>
        <span className="font-mulish text-[15px] text-myOrange-50">     
          { pageName }
        </span>
    </div>
  )
}

export default LocationString;