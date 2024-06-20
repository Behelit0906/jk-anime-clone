import { useEffect, useState } from 'react';
import { MdOutlineWatchLater } from "react-icons/md";

interface Props {
  textSize: string
}

function Timer(props:Props) {
  const calculateTimeLeft = () => {
    const now = new Date();
    const minutes = 59 - now.getUTCMinutes();
    const seconds = 59 - now.getUTCSeconds();

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };


  const [timer, setTimer] = useState<string>(calculateTimeLeft);


  useEffect(() => {
    const intervalId = setInterval(() => setTimer(calculateTimeLeft), 1000)

    return () => clearInterval(intervalId);
  }, [])

  return (
    <span className='text-myOrange-50 font-oswald'>
      <MdOutlineWatchLater className={`inline pb-1 ${props.textSize} font-black`} /> UPDATED IN { timer }
    </span>
  );
}

export default Timer;
