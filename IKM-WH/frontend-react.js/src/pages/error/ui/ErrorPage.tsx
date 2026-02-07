import { useState} from 'react';
import style from './ErrorPage.module.css';
import { Button } from "@shared/ui/button/ui";
import { useNavigate } from "react-router-dom";
import {MusicStaff, FloatingMusic, Visualizer, Message} from './index.ts'

export const ErrorPage = () => {
    const navigate = useNavigate();
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlayMusic = () => {
        setIsPlaying(true);
        setTimeout(() => {
            navigate('/');
        }, 2000);
    };

    return (
        <div className={style.errorPage}>
            <div className={style.container}>
                <Visualizer/>
                <MusicStaff/>
                <Message/>
                <Button
                    onClick={handlePlayMusic}
                >
                    <span className={style.btnText}>
                        {isPlaying ? 'Воспроизведение...' : 'Вернуться на главную'}
                    </span>
                </Button>
            </div>
            <FloatingMusic />
        </div>
    );
};