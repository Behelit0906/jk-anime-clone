import { useState, useEffect } from 'react';
import CarouselArrow from "./CarouselArrow";
import { Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";

interface Props {
  items: { title: string, img: string, id: number }[]
}

function Carousel(props: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextItem = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % props.items.length);
  };

  const prevItem = () => {
    setActiveIndex((prevIndex) => prevIndex === 0 ? props.items.length - 1 : prevIndex - 1);
  };
 
  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % props.items.length);
    }, 3000)

    return () => {
      clearInterval(intervalId);
    }

  },[props.items])

  const slideStyles = {
    transform: `translateX(-${activeIndex * 100}%)`,
    transition: 'transform 0.5s ease'
  };

  return (
    <div className="relative w-full h-[427px] cl-1:h-[397px]">
      <button className="hidden cl-1:block absolute z-10 top-[45%] left-[-20px]" onClick={prevItem}>
        <CarouselArrow direction="left" />
      </button>
      <div className='w-full h-full overflow-hidden rounded-[5px]'>
        <ul className="z-20 flex flex-nowrap w-full h-full" style={slideStyles}>
          {props.items.map((item, key) =>
            <li key={key} className="min-w-[100%] h-full" style={{ 
              backgroundImage: `url('${item.img}')`, 
              backgroundSize: 'cover', 
              backgroundPosition: 'center' 
            }}>
              <div  className={`px-2 pt-16 cl-1:pt-14 cl-1:px-10 ${activeIndex === key ? 'slide-down-enter' : ''}`}>
                <h2 className='font-oswald text-white text-[32px] cl-1:text-[42px] leading-[52px] mb-5 text-s text-shadow'>
                  {item.title}
                </h2>
                <div className='flex items-center gap-1'>
                  <Link to={`/anime/details/${item.id}`} className='w-[145px] tracking-[2px] text-center h-[50px] rounded-tl rounded-bl text-[13px] text-white font-mulish font-bold bg-myOrange-50 py-[14px] px-5'>
                    WATCH NOW
                  </Link>
                  <span className='flex flex-col justify-center items-center bg-myOrange-50 w-5 h-[50px] rounded-tr rounded-br'>
                    <FaAngleRight className='text-white' />
                  </span>
                </div>
              </div>
            </li>
          )}
        </ul>
      </div>
      <button className="hidden cl-1:block absolute top-[45%] right-[-20px]" onClick={nextItem}>
        <CarouselArrow direction="right" />
      </button>
      <div className='absolute bottom-3 flex gap-2 justify-center items-center' style={{
        left: ('50%'),
        transform: 'translate(-50%)' 
      }}>
        {
          props.items.map((_, key) =>
            activeIndex === key ? 
            <button onClick={() => {setActiveIndex(key)}} key={key} className='w-2 h-2 bg-white rounded-full'></button>
            :
            <button onClick={() => {setActiveIndex(key)}} key={key} className='w-2 h-2 bg-[#b7b7b7] rounded-full'></button>
          )
        }
      </div>
    </div>
  );
}

export default Carousel;
