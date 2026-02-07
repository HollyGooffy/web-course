import { Clock, DollarSign } from 'lucide-react';
import style from '../ui/Stats.module.css';

export const StatsCharts = () => {
    return (
        <div className={`${style.chartsSection} fadeIn`} style={{animationDelay: '0.4s'}}>
            <div className={`${style.chart} ${style.comingSoon} cardFadeIn`}>
                <h3>Активность пользователей</h3>
                <div className={style.chartPlaceholder}>
                    <Clock size={48} />
                    <p><strong>Coming Soon</strong></p>
                    <p>График активности будет доступен после внедрения системы аналитики</p>
                </div>
            </div>
            <div className={`${style.chart} ${style.comingSoon} cardFadeIn`} style={{animationDelay: '0.5s'}}>
                <h3>Доход по месяцам</h3>
                <div className={style.chartPlaceholder}>
                    <DollarSign size={48} />
                    <p><strong>Coming Soon</strong></p>
                    <p>График доходов будет доступен после интеграции платежной системы</p>
                </div>
            </div>
        </div>
    );
};