const { useState, useEffect } = require('react');

// 현재 시각(HH:MM:SS)을 문자열로 리턴

function useCurrentTime() {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      setCurrentTime(
        `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return currentTime;
}

export default useCurrentTime;
