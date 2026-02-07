import style from '../ui/Application.module.css';

export const ApplicationLoadingState = () => {
    return (
        <div className={style.loadingState}>
            <div className={style.spinner}></div>
            <p>Загрузка заявок...</p>
        </div>
    );
};