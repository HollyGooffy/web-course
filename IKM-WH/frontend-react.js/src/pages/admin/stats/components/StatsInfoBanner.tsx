import { BarChart3 } from 'lucide-react';
import style from '../ui/Stats.module.css';

export const StatsInfoBanner = () => {
    return (
        <div className={`${style.infoBanner} headerFadeIn`}>
            <div className={style.bannerContent}>
                <div className={style.bannerIcon}>
                    <BarChart3 size={24} />
                </div>
                <div className={style.bannerText}>
                    <h4>Статистика платформы</h4>
                    <p>
                        Показаны реальные данные системы. Элементы с пометкой "Coming Soon" 
                        будут доступны после внедрения соответствующих модулей.
                    </p>
                </div>
            </div>
        </div>
    );
};