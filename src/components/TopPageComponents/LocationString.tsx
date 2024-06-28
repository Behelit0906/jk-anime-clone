import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";

function seasonMessage () {
  let message = '';
  const currentDate = new Date();
  const currentMonth = currentDate.getUTCMonth();

  if(currentMonth >= 3 || currentMonth <= 5)
    message = `Spring season schedule ${currentDate.getUTCFullYear()} ( April - May - June )`
  if(currentMonth >= 0 || currentMonth <= 2)
    message = `Winter season schedule ${currentDate.getUTCFullYear()} ( January - February - March )`
  if(currentMonth >= 6 || currentMonth <= 8)
    message = `Summer season schedule ${currentDate.getUTCFullYear()} ( July - August - September )`
  if(currentMonth >= 9 || currentMonth <= 11)
    message = `Fall season schedule ${currentDate.getUTCFullYear()} ( October - November - December )`
  
  return message
}

function LocationString() {
  const location = useLocation();

  const pageName = location.pathname.includes('/top') ? 'Current top' : 'Schedules';

  return (
    <div className="flex flex-wrap gap-1">
      <Link className="flex gap-1 items-center font-mulish text-[15px] dark:text-white" to={'/'}>
        <FaHome className="mr-2" />
          Home
        <IoIosArrowForward />
      </Link>
        <span className={`font-mulish text-[15px] ${location.pathname.includes('/top') ? 'text-myOrange-50' : 'dark:text-white'}`}>     
          { pageName }
        </span>
        {
          location.pathname.includes('/schedules') && 
          <span className="flex items-center text-myOrange-50 text-[15px]">
            <IoIosArrowForward className="mr-1 text-black dark:text-white" /> {seasonMessage()}
          </span>
        }
    </div>
  )
}

export default LocationString;