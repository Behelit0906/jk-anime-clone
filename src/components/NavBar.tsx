import SearchBar from "./SearchBar";
import LinkComponent from "./LinkComponent";
import { FaFacebookF } from "react-icons/fa6";
import { TfiYoutube } from "react-icons/tfi";


interface Props {
  mobile: boolean
}

function NavBar(props:Props) {
  const classes = props.mobile ? 'w-full flex flex-col px-[15px] items-center gap-y-[11px] lg:hidden' : 'hidden w-full lg:flex flex-row-reverse items-center';
  const socialMediaClasses = props.mobile ? 'flex lg:hidden gap-1' : 'hidden xl:flex xl:gap-1';
  
  return (
    <div className={classes}>
      <div className="w-full">
        <SearchBar />
      </div>
      <div className="flex items-center flex-wrap lg:flex-nowrap justify-center gap-1 lg:gap-5 lg:mr-3">
        <LinkComponent link="/directory" padding="p-[10px] lg:p-[15px]">Directory</LinkComponent>
        <LinkComponent link="/schedules" padding="p-[10px] lg:p-[15px]">Schedules</LinkComponent>
        <LinkComponent link="/top" padding="p-[10px] lg:p-[15px]">Top</LinkComponent>
        <a className="relative bg-white p-[10px] lg:p-[14px] rounded-[10px] text-[#c454d7] font-mulish hover:bg-gray-100 transition-colors duration-300 font-bold" href="./" target="_blank">
          <span className="w-[20px] p-[2px] absolute top-0 right-0 text-[9px] bg-[#c454d7] text-[#ffc107] rounded-tr-[10px]">+18</span>
          Hentai
        </a>
        <div className={socialMediaClasses}>
          <a href="https://www.youtube.com/@JKanimeOficial" target="_blank" className="py-[5px] lg:py-[9px] px-[7px] rounded-[10px] bg-blue-100 hover:dark:bg-dark-50 dark:bg-dark-100 hover:bg-blue-150 transition-colors duration-300">
          <TfiYoutube className="text-white text-[37px]" />
          </a>
          <a href="https://www.facebook.com/jkanimado" target="_blank" className="py-[5px] lg:py-[9px] px-[7px] rounded-[10px] bg-blue-100 dark:bg-dark-100 dark:hover:bg-dark-50 hover:bg-blue-150 transition-colors duration-300">
            <FaFacebookF className="text-white text-[37px]" />
          </a>
        </div>
      </div>
    </div>
  )
}

export default NavBar;