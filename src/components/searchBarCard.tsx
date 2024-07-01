import { Link } from "react-router-dom";
interface Props {
  children:string,
  cover:string,
  showType:string,
  link:string
}

function SearchBarCard(props: Props) {
  return (
    <Link to={props.link} className="w-full flex gap-x-[9px] hover:bg-gray-100 transition-colors duration-300 rounded dark:hover:bg-dark-200">
      <section className="h-[72px] p-[5px] shrink-0">
        <img className="w-full h-full" src={props.cover} alt={props.children} />
      </section> 
      <p className="text-[#111111] text-[15px] dark:text-white">
        {props.children}
        <b className="ml-[5px] align-middle bg-[#607d8b] dark:bg-myOrange-50 rounded px-[6px] py-[2px] font-normal text-white text-[10px]">{props.showType}</b>
      </p>
    </Link>
  )
}

export default SearchBarCard;