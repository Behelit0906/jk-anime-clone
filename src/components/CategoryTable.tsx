import { Link } from "react-router-dom";

function CategoryTable() {
  const categories: string[] = [
    "Accion", "Artes Marciales", "Autos", "Aventura", "Colegial", "Comedia",
    "Cosas de la vida", "Dementia", "Demonios", "Deportes", "Drama", "Ecchi",
    "Fantasia", "Harem", "Historico", "Josei", "Juegos", "Magia", "Mecha",
    "Militar", "Misterio", "Musica", "Niños", "Parodia", "Policial", "Psicologico",
    "Romance", "Samurai", "Sci-fi", "Seinen", "Shoujo", "Shoujo ai", "Shounen",
    "Shounen ai", "Sobrenatural", "Space", "Super poderes", "Terror", "Thriller", "Vampiros",
    "Yaoi", "Yuri"
  ];
  
  return (
    <div className="w-full p-[15px] font-mulish text-[15px] font-bold">
      <h3 className="pb-[5px] px-3 mb-[10px] text-[#1a2c37] border-b-[1px] border-[#56b8e9]">ANIME BY CATEGORY:</h3>
      <ul className="flex flex-wrap text-white">
        {
          categories.map((category, key) => 
            <li className="w-2/4" key={key}>
              <Link className="block w-full py-[5px] px-[10px] hover:text-myOrange-50 hover:pl-[15px] transition-all duration-300 ease-in-out" to='./'>
                {category}
              </Link>
            </li>
          )
        }
      </ul>
    </div>
  )
}

export default CategoryTable;