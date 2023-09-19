import React, { useState, useEffect } from "react";

function useTimer(initialSeconds = 30) {
    const [seconds, setSeconds] = useState(initialSeconds);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let interval;

        if (isActive && seconds > 0) {
            interval = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds - 1);
            }, 1000);
        } else if (seconds === 0) {
            setIsActive(false);
        }

        return () => clearInterval(interval);
    }, [isActive, seconds]);

    const startTimer = () => {
        setSeconds(initialSeconds);
        setIsActive(true);
    };

    const resetTimer = () => {
        setIsActive(false);
        setSeconds(initialSeconds);
    };

    return {
        seconds,
        isActive,
        startTimer,
        resetTimer,
    };
}

export default useTimer;
