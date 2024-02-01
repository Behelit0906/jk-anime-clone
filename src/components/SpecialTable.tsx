import { useState, useEffect } from "react";
import AnimeType from "../types/AnimeType";
import { apiUrl } from "../constants";
import { Link } from "react-router-dom";
import SpecialCard from "./SpecialCard";

function SpecialTable() {
  const [specials, setSpecials] = useState<AnimeType[]>([]);

  function fetchSpecials(type:string) {
    return fetch(`${apiUrl}/anime?type=${type}&limit=4&page=1&status=complete&order_by=end_date`)
      .then(response => response.json());
  }
  
  useEffect(()=> {
    const types = ['ova', 'movie'];
    const promiseArray = types.map(type => fetchSpecials(type)); 

    Promise.all(promiseArray).then(results => {
      const allSpecials = results.map(result => result.data).flat();
      setSpecials(allSpecials);
    }).catch(err => {
      console.error("Error al cargar los especiales:", err);
    }) 
  },[])

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