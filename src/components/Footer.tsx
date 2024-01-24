import { Link } from "react-router-dom";

function Footer() {

  return(
    <footer className="w-full flex relative justify-center items-center bg-blue-50 h-[188px] md:h-[161px] lg:h-[126px]">
      <a href="#" className="absolute bottom-40 md:bottom-[135px] lg:bottom-[100px] w-[50px] h-[50px] bg-myOrange-50 rounded-full">
        <span className="absolute left-[19px] bottom-5 rotate-45 border-t-[2.8px] border-l-[2.8px] w-[13px] h-[13px] border-white"></span>
      </a>
      <div className="flex flex-wrap items-center justify-center gap-5 w-[540px] md:w-[720px] lg:w-[960px] xl:w-[1170px] px-[15px]">
        <Link className="block h-[26px] py-[2px] px-[10px] font-mulish text-white font-bold  rounded-[10px] bg-blue-100" to='/'>
          Home
        </Link>
        <Link className="block h-[26px] py-[2px] px-[10px] font-mulish text-white font-bold  rounded-[10px] bg-blue-100" to='/'>
          Categories
        </Link>
        <Link className="block h-[26px] py-[2px] px-[10px] font-mulish text-white font-bold  rounded-[10px] bg-blue-100" to='/'>
          Anime chapters
        </Link>
        <Link className="block h-[26px] py-[2px] px-[10px] font-mulish text-white font-bold  rounded-[10px] bg-blue-100" to='/'>
          Chapter
        </Link>
        <Link className="block h-[26px] py-[2px] px-[10px] font-mulish text-white font-bold  rounded-[10px] bg-blue-100" to='/'>
          Chat
        </Link>
      </div>
    </footer>
  )
}

export default Footer;