import React, { useState, useEffect } from 'react';

function OTPTimer() {
  const [time, setTime] = useState<{ seconds: number; milliseconds: number }>({
    seconds: 30,
    milliseconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      if (time.seconds === 0 && time.milliseconds === 0) {
        clearInterval(timer);
      } else {
        if (time.milliseconds === 0) {
          setTime(prevTime => ({ seconds: prevTime.seconds - 1, milliseconds: 99 }));
        } else {
          setTime(prevTime => ({ ...prevTime, milliseconds: prevTime.milliseconds - 1 }));
        }
      }
    }, 10); // Interval set to 10 milliseconds

    return () => clearInterval(timer);
  }, [time]);

  return (
    <div>
      {time.seconds > 0 || time.milliseconds > 0 ? (
        <span>{time.seconds}s {time.milliseconds}ms</span>
      ) : (
        <span>OTP Expired</span>
      )}
    </div>
  );
}

export default OTPTimer;
