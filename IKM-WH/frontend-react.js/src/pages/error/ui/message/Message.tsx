import style from './Message.module.css'
import {useEffect, useState} from "react";

export const Message = () => {
    const [currentMessage, setCurrentMessage] = useState(0);
    const messages = [
        "Упс, эта страница не в тональности...",
        "404 - Музыкальная пауза",
        "Здесь тишина... ничего не найдено",
        "Эта мелодия не найдена в нашем плейлисте",
        "Кажется, вы пропустили такт!"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentMessage((prev) => (prev + 1) % messages.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [messages.length]);

    return (
        <h2 className={style.title}>{messages[currentMessage]}</h2>
    )
}