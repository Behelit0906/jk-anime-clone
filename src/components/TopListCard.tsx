import { Link } from "react-router-dom"
import { AiFillLike } from "react-icons/ai";


interface Props {
  fontSize?: string
  height: string
  backgroundImage: string,
  rank: number,
  rankColor:string,
  title: string
  marginBottom?:string
  score:number
}

function TopListCard(props:Props) {
  const articleClasses = `topCard relative block w-full ${props.height} ${props.marginBottom ? props.marginBottom : ''} rounded-[10px]`;
  return (
    <Link to='/' className={articleClasses} style={{
      backgroundImage: `url('${props.backgroundImage}')`,
      backgroundSize: 'cover'
    }}>
      <span className={`absolute top-2 left-3 px-3 ${props.rankColor} rounded font-[13px] font-mulish text-white`}>{props.rank}</span>
      <span className={`absolute bottom-0 left-0 w-full py-1 px-2 font-mulish ${props.fontSize ? props.fontSize: ''} bg-[#3D3D3D] text-white rounded-[10px]`}>{props.title}</span>
      <span className="score flex justify-center items-center absolute z-30 w-full h-0 opacity-85 bg-myOrange-50">
        <span className="topCardContent text-white font-mulish font-bold opacity-0 transition-opacity duration-100">
          <AiFillLike className="text-white w-10 h-10" />
          {props.score}
        </span>
      </span>
    </Link>
  )
}

export default TopListCard