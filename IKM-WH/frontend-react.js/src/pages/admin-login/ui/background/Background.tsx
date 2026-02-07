import style from "./Background.module.css";

export const Background = () => {
    return (
        <div className={style.background}>
            <div className={style.musicLines}>
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        className={style.musicLine}
                        style={{ animationDelay: `${i * 0.3}s` }}
                    ></div>
                ))}
            </div>
        </div>
    )
}