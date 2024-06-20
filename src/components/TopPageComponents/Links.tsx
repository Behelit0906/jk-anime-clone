import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Links () {

  const location = useLocation();

  let classes1 = 'text-blue-100 hover:text-myOrange-50 transition-colors' 
  let classes2 = 'text-blue-100 hover:text-myOrange-50 transition-colors'

  if(location.pathname.includes('/top')) {
    classes1 = 'bg-[#27343B] text-white'
  }
  else {
    classes2 = 'bg-[#27343B] text-white';
  }

  return (
    <div className="flex h-[44px] text-center shadow rounded-[5px]">
      <Link className={`w-2/4 flex items-center justify-center h-full rounded-[5px] ${classes1}`} to={'/top'}>
        Most voted
      </Link>
      <Link className={`w-2/4 flex items-center justify-center h-full text-center rounded-[5px] ${classes2}`} to={'/ranking'}>
        Global ranking
      </Link>
    </div>
  )
}

export default Links;