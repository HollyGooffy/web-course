import style from './LoginLogo.module.css'

export const LoginLogo = () => {
    return (
        <div className={style.logo}>
            <div className={style.logoIcon}>♪</div>
            <span className={style.logoText}>SoundAdmin</span>
        </div>
    )
}