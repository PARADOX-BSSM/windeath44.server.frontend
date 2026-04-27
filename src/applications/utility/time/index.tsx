import React, { useState, useEffect } from 'react';
import * as _ from './style';

const getTime: Function = () => {
    const now = new Date();
    let hour = now.getHours();
    const minute = now.getMinutes();
    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12;
    hour = hour ? hour : 12;
    return `${hour}:${minute < 10 ? '0' + minute : minute} ${ampm}`;
}

export const Time: React.FC = () => {
    const [time, setTime] = useState(getTime());

    useEffect(() => {
        const id = setInterval(() => {
            setTime(getTime());
        }, 1000);
        return () => clearInterval(id);
    }, [])

    return <_.TimeContainer>{time}</_.TimeContainer>;
}