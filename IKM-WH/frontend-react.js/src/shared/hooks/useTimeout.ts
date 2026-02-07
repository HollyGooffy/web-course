import { useState, useEffect } from 'react';

export const useTimeout = (delay: number) => {
    const [isTimeout, setIsTimeout] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsTimeout(true);
        }, delay);

        return () => clearTimeout(timer);
    }, [delay]);

    return isTimeout;
};