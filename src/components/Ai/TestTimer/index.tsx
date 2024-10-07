"use client"
import { IconAlarm} from '@tabler/icons-react';
import React, { useState, useEffect } from 'react';

interface Props {
  duration: number; // duration in seconds
}

const TestTimer: React.FC<Props> = ({ duration }) => {
  const [timeLeft, setTimeLeft] = useState<number>(duration);

  useEffect(() => {
    if (timeLeft === 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <div className="text-xl font-bold flex justify-end">
        <div className='border-5 border-[#432c83] rounded-xl my-2 px-5 py-2 flex gap-2 items-center'>
       <IconAlarm/> {Math.floor(timeLeft / 60)} Min : {timeLeft % 60 < 10 ? '0' : ''}{timeLeft % 60} Sec 
        </div>
    </div>
  );
};

export default TestTimer;
