import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import MobileNavBar from "./MobileNavBar";
import HamburgerButton from "./HamburgerButton";
import Icon from "./Icon";
import { AnimatePresence, motion } from 'framer-motion';
import { FaUserCircle } from "react-icons/fa";  

function Header() {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  function clickHandler() {
    setIsMenuVisible(prevState => !prevState)
  }

  function onHamburgerClick() {
    setIsMenuVisible(prevState => !prevState);
  }

  useEffect(() => {

    function resizeHandler() {
      setIsMenuVisible(false);
    }

    window.addEventListener("resize", resizeHandler);

    return () => window.removeEventListener("resize", resizeHandler);
  }, [])


  return (
    <header className="relative z-20 w-full flex justify-center bg-blue-50 dark:bg-dark-200">
      <div className="flex items-center justify-between w-[540px] md:w-[720px] lg:w-[960px] lg:gap-10 xl:w-[1170px] h-[73px] lg:h-[76px] px-[15px]">
        <div className="shrink-0 transition duration-300 hover:rotate-[-3deg]">
          <Icon />
        </div>
        <div className="flex items-center gap-1 lg:hidden">
          <HamburgerButton onClick={onHamburgerClick} />
          <FaUserCircle className="w-10 h-10 text-white bg-blue-50 hover:cursor-pointer" />
        </div>
        <AnimatePresence>
          {isMenuVisible && (
            <motion.div 
            className="absolute top-0 left-0 w-screen h-screen"
            initial={{backgroundColor: "rgba(0,0,0,0)"}}
            animate={{backgroundColor:"rgba(34,34,34,0.6)"}}
            exit={{backgroundColor: "rgba(0,0,0,0)"}}
            transition={{duration: 0.3, ease:"easeInOut"}}>
               <motion.div 
                className="absolute top-0 left-0 w-screen h-screen"
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                exit={{ x: "-100%" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                onClick={clickHandler}
                >
                <MobileNavBar />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        <NavBar mobile={false} />
      </div>
    </header>
  )
}

export default Header;