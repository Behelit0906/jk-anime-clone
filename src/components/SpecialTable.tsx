import AnimeType from "../types/AnimeType";
import SpecialCard from "./SpecialCard";
import { useState, useEffect } from "react";
import { apiUrl } from "../constants";

function SpecialTable() {
  const [specials, setSpecials] = useState<AnimeType[]>([]);

  useEffect(() => {
    async function getSpecials() {
      const ovas = await fetch(`${apiUrl}/anime?type=ova&limit=4&page=1&status=complete&order_by=end_date`).then(res => res.json())
      const movies = await fetch(`${apiUrl}/anime?type=movie&limit=4&page=1&status=complete&order_by=end_date`).then(res => res.json())

      setSpecials([...(ovas?.data || []), ...(movies?.data || [])]);
    }
    const id = setTimeout(getSpecials, 1000)

    return () => clearTimeout(id);
  }, [])


  return (
    <div className="hidden lg:flex lg:flex-col lg:gap-3 mt-3">
      <h4 className="font-oswald pl-5 py-3 text-2xl text-[#333] dark:text-white border-l-4 border-myOrange-50">
        OVAS / ONAS / ESPECIALES
      </h4>
      <ul className="flex flex-wrap gap-6">
        {
          specials.map(item => 
            <li key={item.mal_id}>
              <SpecialCard 
              id={item.mal_id} 
              name={item.title} 
              image={item.images.jpg.image_url}
              type={item.type} />   
            </li>  
          )
        }
      </ul>
    </div>
  )
}

export default SpecialTable;