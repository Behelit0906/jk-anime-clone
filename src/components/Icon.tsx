import { Link } from "react-router-dom"
import logo from '../assets/logo.png';

function Icon() {
  return (
    <Link to="/">
      <img className="w-[165px] lg:w-[130px] xl:w-[165px]" src={logo} alt="JK Anime logo" />
    </Link>
  )
}

export default Icon;