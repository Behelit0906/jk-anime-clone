import AnimeType from "../types/AnimeType";
import SpecialCard from "./SpecialCard";
import useSWR from 'swr';
import { apiUrl } from "../constants";

function SpecialTable() {
  const { data: data1, error: error1, isValidating: isValidating1 } = useSWR(
    `${apiUrl}/anime?type=ova&limit=4&page=1&status=complete&order_by=end_date`
  );

  const { data: data2, error: error2, isValidating: isValidating2 } = useSWR(
    `${apiUrl}/anime?type=movie&limit=4&page=1&status=complete&order_by=end_date`
  );

  const specials: AnimeType[] = [...(data1?.data || []), ...(data2?.data || [])];

  if (isValidating1 || isValidating2) return <div>Loading...</div>;
  if (error1 || error2) return <div>Error loading data</div>;

  return (
    <div className="hidden lg:flex lg:flex-col lg:gap-3 mt-3">
      <h4 className="font-oswald pl-5 py-3 text-2xl text-[#333] dark:text-white border-l-4 border-myOrange-50">
        OVAS / ONAS / SPECIALS
      </h4>
      <ul className="flex flex-wrap gap-6">
        {
          specials.map(item => 
            <li key={item.mal_id}>
              <SpecialCard 
                id={item.mal_id} 
                name={item.title} 
                image={item.images.jpg.image_url}
                type={item.type} 
              />   
            </li>  
          )
        }
      </ul>
    </div>
  );
}

export default SpecialTable;
