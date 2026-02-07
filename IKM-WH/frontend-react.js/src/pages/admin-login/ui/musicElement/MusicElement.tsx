import style from './MusicElement.module.css'

export const MusicElement = () => {
    return (
        <div className={style.musicElements}>
            <div className={style.musicElement}></div>
            <div className={style.musicElement}></div>
            <div className={style.musicElement}></div>
        </div>
    )
}