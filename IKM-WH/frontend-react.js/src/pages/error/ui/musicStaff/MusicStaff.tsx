import style from "./MusicStaff.module.css";

export const MusicStaff = () => {
    return (
        <div className={style.musicStaff}>
            <div className={style.staffLine}></div>
            <div className={style.staffLine}></div>
            <div className={style.staffLine}></div>
            <div className={style.staffLine}></div>
            <div className={style.staffLine}></div>

            <div className={style.errorNumber}>
                <span className={style.musicDigit}>4</span>
                <span className={style.musicDigit}>0</span>
                <span className={style.musicDigit}>4</span>
            </div>
        </div>
    )
}
