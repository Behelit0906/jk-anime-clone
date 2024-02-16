import { Link } from "react-router-dom"

interface Props {
  img:string,
  title:string,
  sinopsis:string,
  type:string,
  status:string
}

function DirectoryCard(props:Props) {

  let status = '';
  if(props.status === 'Not yet aired') status = 'Upcoming';
  else if(props.status === 'Currently Airing') status = 'Airing'
  else status = 'Finished'

  

  return (
    <article className="w-[47%] lg:w-[31.5%] xl:w-[23.4%] bg-white shadow rounded-xl overflow-hidden dark:bg-dark-100">
      <Link className="flex flex-col pb-3 md:pb-0 gap-y-3" to='./'>
        <div className="relative h-[250px]">
          <img className="w-full h-full" src={props.img} alt={props.title} />
        
        </div>
        <div className="px-2 mb-5">
          <h5 className="px-1 font-mulish font-light text-[#3a8fd1] text-[18px] mb-3">
            {props.title}
          </h5>
          <div className="flex gap-3 text-[10px] text-white mb-3">
            <span className="p-2 bg-[#4CAF50] rounded">{status}</span>
            <span className="p-2 bg-[#4da8e2] rounded">{props.type}</span>
          </div>
          <p className="text-xs font-mulish max-h-[125px] overflow-y-scroll dark:text-white">
            {props.sinopsis}
          </p>
        </div>
      </Link>
    </article>
  )
}

export default DirectoryCard;