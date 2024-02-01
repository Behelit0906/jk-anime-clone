import { Link } from "react-router-dom";
import { IoPlayCircle } from "react-icons/io5";


interface Props {
  name: string,
  image: string,
  type: string,
  id: number
}

function SpecialCard(props:Props) {
  return(
    <Link className="special-card block w-[130px] xl:w-[165px] h-[218px] overflow-hidden" to='/'>
      <div className="bg-image relative w-full h-[150px] rounded-lg overflow-hidden mb-1" style={{
        backgroundImage: `url('${props.image}')`, 
        backgroundSize: 'cover', 
      }}>
        <span className="absolute z-10 top-2 left-2 px-[10px] py-[1px] rounded-3xl text-white text-[10px] bg-red-600">{props.type}</span>
        <div className="play-icon relative z-20 w-full h-full opacity-0">
          <span className="block w-full h-full bg-[#3D7397] opacity-65"></span>
          <IoPlayCircle className="absolute top-10 left-7 xl:left-11 z-20 w-[75px] h-[75px] text-white"/>
        </div>
      </div>
      <p className="text-xs text-[#333] dark:text-white font-mulish font-bold leading-5">{props.name}</p>
    </Link>
  )
}

export default SpecialCard;