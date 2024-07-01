import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import MobileNavBar from "./MobileNavBar";
import HamburgerButton from "./HamburgerButton";
import Icon from "./Icon";
import { AnimatePresence, motion } from 'framer-motion';
import { FaUserCircle } from "react-icons/fa";  
import { useLocation } from 'react-router-dom';

function Header() {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const location = useLocation();

  function clickHandler(e: React.MouseEvent<HTMLDivElement>) {
    if(e.target === e.currentTarget){
      setIsMenuVisible(prevState => !prevState)
    }
  }

  function onHamburgerClick() {
    setIsMenuVisible(prevState => !prevState);
  }

  useEffect(() => {
    let windowWidth = window.innerWidth;
    function resizeHandler() {
      const newWindowWidth = window.innerWidth;
      if (newWindowWidth !== windowWidth) {
        windowWidth = newWindowWidth;
        setIsMenuVisible(false);
        
      }
    }
  
    window.addEventListener("resize", resizeHandler);
    window.addEventListener("orientationchange", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
      window.removeEventListener("orientationchange", resizeHandler);

    };
  }, []);
  

  useEffect(() => {
    if(isMenuVisible)
      window.document.body.classList.add('overflow-hidden');
    else window.document.body.classList.remove('overflow-hidden')
  }, [isMenuVisible])

  useEffect(() => {
    setIsMenuVisible(false);
  }, [location.pathname])


  return (
    <header className="relative z-20 w-full flex justify-center bg-blue-50 dark:bg-dark-200">
      <div className="flex items-center justify-between w-[540px] md:w-[720px] lg:w-[960px] lg:gap-10 xl:w-[1170px] h-[73px] lg:h-[76px] px-[15px]">
        <div className="shrink-0 transition duration-300 hover:rotate-[-3deg]">
          <Icon />
        </div>
        <div className="flex items-center gap-1 lg:hidden">
          <HamburgerButton onClick={onHamburgerClick} />
          <FaUserCircle className="w-10 h-10 text-white bg-blue-50 hover:cursor-pointer dark:bg-dark-200" />
        </div>
        <AnimatePresence>
          {isMenuVisible && (
            <motion.div
            id="background"
            className="absolute top-0 left-0 w-screen h-screen"
            initial={{backgroundColor: "rgba(0,0,0,0)"}}
            animate={{backgroundColor:"rgba(34,34,34,0.6)"}}
            exit={{backgroundColor: "rgba(0,0,0,0)"}}
            transition={{duration: 0.3, ease:"easeInOut"}}
            onClick={clickHandler}>
               <motion.div
                className="absolute z-20 top-0 left-0 w-[80%] h-screen"
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                exit={{ x: "-100%" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
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