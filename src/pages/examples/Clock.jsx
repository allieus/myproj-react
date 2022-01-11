import { useEffect, useState } from 'react';
import './Clock.css';

function Clock() {
  const [date, setDate] = useState(new Date());

  useEffect(
    // 이 함수는 현 컴포넌트가 mount 시에 호출됩니다.
    () => {
      const interval = setInterval(() => {
        setDate(new Date());
      }, 1000);
      // 리턴된 함수는 현 컴포넌트 unmount 시에 호출됩니다.
      return () => {
        clearInterval(interval);
      };
    },
    [],
  );

  return (
    <div className="clock-wrapper">
      <h2>시계</h2>

      <div class="clock">
        <p class="date">2021-10-05 TUE</p>
        <p class="time">{date.toISOString().slice(11, 19)}</p>
        <p class="text">Powered by React.js</p>
      </div>
    </div>
  );
}

export default Clock;
