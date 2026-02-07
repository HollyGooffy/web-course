import style from "./Visualizer.module.css"

export const Visualizer = () => {
    return (
        <div className={style.visualizer}>
            {[...Array(12)].map((_, i) => (
                <div
                    key={i}
                    className={style.bar}
                    style={{ animationDelay: `${i * 0.1}s` }}
                >
                </div>
            ))}
        </div>
    )
}