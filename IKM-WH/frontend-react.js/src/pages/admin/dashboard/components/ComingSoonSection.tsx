import { TrendingUp } from 'lucide-react';
import { SectionHeader } from './SectionHeader';
import style from '../ui/Dashboard.module.css';

const COMING_SOON_ITEMS = [
    { title: 'Аналитика продаж', desc: 'Подробная статистика по продажам мерча и билетов' },
    { title: 'Система уведомлений', desc: 'Push-уведомления о новых заявках и событиях' },
    { title: 'Мобильное приложение', desc: 'Управление фестивалем с мобильного устройства' },
    { title: 'Интеграция с соцсетями', desc: 'Автоматическая публикация событий в социальных сетях' }
];

export const ComingSoonSection = () => {
    return (
        <div className={`${style.comingSoonSection} scaleIn`} style={{animationDelay: '0.4s'}}>
            <SectionHeader title="Скоро появится" icon={<TrendingUp size={20} />} />
            <div className={style.comingSoonGrid}>
                {COMING_SOON_ITEMS.map((item, index) => (
                    <div key={index} className={`${style.comingSoonItem} fadeInStagger`} style={{animationDelay: `${0.5 + index * 0.1}s`}}>
                        <h4>{item.title}</h4>
                        <p>{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};