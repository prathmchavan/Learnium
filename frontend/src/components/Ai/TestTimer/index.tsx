// components/TestTimer.tsx
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
    <div className="text-xl font-bold">
      Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? '0' : ''}{timeLeft % 60}
    </div>
  );
};

export default TestTimer;
