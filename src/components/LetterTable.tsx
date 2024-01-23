import { Link } from "react-router-dom";

function LetterTable() {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  return (
    <ul className="flex font-mulish gap-[3px] flex-wrap text-white text-[13px] font-bold">
      {
        alphabet.map((letter, key) => 
          <li key={key}>
            <Link className="flex items-center justify-center w-[29px] h-[46px] hover:bg-white hover:text-[#666]" to="./">
              {letter}
            </Link>
          </li>  
        )
      }
      <li>
        <Link className="flex items-center justify-center w-[29px] h-[46px] hover:bg-white hover:text-[#666]" to="./">
          0-9
        </Link>
      </li>
    </ul>
  )
}

export default LetterTable;