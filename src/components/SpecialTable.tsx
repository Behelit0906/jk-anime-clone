import SpecialCard from "./SpecialCard";
import specials from '../json/specials.json';

function SpecialTable() {
  
  return (
    <div className="hidden lg:flex lg:flex-col lg:gap-3 mt-3">
      <h4 className="font-oswald pl-5 py-3 text-2xl text-[#333] dark:text-white border-l-4 border-myOrange-50">
        OVAS / ONAS / SPECIALS
      </h4>  
      <ul className="flex flex-wrap gap-6">
        {
          specials.data.map(item => 
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
