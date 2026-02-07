import style from '../ui/Stats.module.css';

export const StatsPeriodSelector = () => {
    return (
        <div className={style.periodSelector}>
            <select className={style.select} disabled>
                <option>Период: Все время</option>
            </select>
        </div>
    );
};