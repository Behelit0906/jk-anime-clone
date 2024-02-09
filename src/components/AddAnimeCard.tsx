import { Link } from "react-router-dom"
import { IoPlayCircle } from "react-icons/io5";

interface Props {
  title: string,
  image: string,
  id: number
  status: string,
  type: string
}

function AddAnimeCard(props:Props) {
  return (
    <Link to='/' className="special-card block relative w-full h-full" >
      <div className="bg-image relative bg-image w-full h-[255px] rounded-lg overflow-hidden" style={{
      backgroundImage: `url('${props.image}')`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      
      }}>
        <span className="play-icon absolute top-0 left-0 w-full h-full bg-[#3D7397] opacity-0 transition-opacity duration-200">
          <IoPlayCircle className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 w-[75px] h-[75px] text-white"/>
        </span>
      </div>
      <div>
        <div className="pl-2 py-2 flex flex-nowrap">
          <span className="py-[1px] px-[10px] rounded-xl font-mulish font-bold bg-myOrange-50 text-white text-[10px] mr-1">
            {props.status.split(' ')[1]}
            </span>
          <span className="py-[1px] px-[10px] rounded-xl font-mulish font-bold bg-blue-100 text-white text-[10px]">{props.type}</span>
        </div>
        <span className="text-[12px] font-mulish font-bold dark:text-white">
          {props.title}
        </span>
      </div>
      
    </Link>
  )
}

export default AddAnimeCard;