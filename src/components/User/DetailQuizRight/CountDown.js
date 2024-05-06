import { useState, useEffect } from 'react';

const CountDown = ({ onTimeUp }) => {
    const [duration, setDuration] = useState(2700);

    useEffect(() => {
        if (duration === 0) {
            onTimeUp();
            return;
        }
        const timerId = setInterval(() => {
            setDuration((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timerId);
    }, [duration]);

    const timerFunc = (secs) => {
        const sec_num = parseInt(secs, 10);
        const hours = Math.floor(sec_num / 3600);
        const minutes = Math.floor(sec_num / 60) % 60;
        const seconds = sec_num % 60;

        return [hours, minutes, seconds]
            .map((v) => (v < 10 ? '0' + v : v))
            .filter((v, i) => v !== '00' || i > 0)
            .join(':');
    };

    return <div>{timerFunc(duration)}</div>;
};

export default CountDown;
