import style from '../ui/Stats.module.css';

export const StatsLegend = () => {
    return (
        <div className={`${style.legend} scaleIn`} style={{animationDelay: '1s'}}>
            <h3>Обозначения</h3>
            <div className={style.legendItems}>
                <div className={`${style.legendItem} slideRight`} style={{animationDelay: '1.1s'}}>
                    <div className={style.legendDot}></div>
                    <span>Реальные данные системы</span>
                </div>
                <div className={`${style.legendItem} slideRight`} style={{animationDelay: '1.2s'}}>
                    <div className={`${style.legendDot} ${style.comingSoonDot}`}></div>
                    <span>Coming Soon - функции в разработке</span>
                </div>
            </div>
        </div>
    );
};