import style from './FloatingMusic.module.css'

export const FloatingMusic = () => {
    return (
        <div className={style.floatingMusic}>
            {['♩', '♪', '♫', '♬', '🎵', '🎶', '🎼'].map((symbol, index) => (
                <div
                    key={index}
                    className={style.musicSymbol}
                    style={{
                        animationDelay: `${index * 0.7}s`,
                        left: `${20 + index * 10}%`
                    }}
                >
                    {symbol}
                </div>
            ))}
        </div>
    )
}