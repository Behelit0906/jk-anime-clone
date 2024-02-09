import { useEffect, useState } from 'react';
import { MdOutlineWatchLater } from "react-icons/md";


function Timer() {
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
    <span className='ml-2 text-myOrange-50'>
      <MdOutlineWatchLater className='inline pb-1 text-3xl font-bold' /> UPDATED IN { timer }
    </span>
  );
}

export default Timer;
