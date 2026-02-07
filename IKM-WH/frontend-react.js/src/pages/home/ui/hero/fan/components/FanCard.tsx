import style from '../Fan.module.css';

interface FanCardProps {
    src: string;
    alt: string;
    index: number;
    refreshKey: number;
}

export const FanCard = ({ src, alt, index, refreshKey }: FanCardProps) => {
    return (
        <img
            key={`${refreshKey}-${index}`}
            src={src}
            alt={alt}
            className={style.heroFanImg}
        />
    );
};