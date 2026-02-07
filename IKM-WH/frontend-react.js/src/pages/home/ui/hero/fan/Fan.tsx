import { useState } from 'react';
import style from './Fan.module.css';
import { useRandomParticipantCards } from '@shared/hooks/useRandomParticipantCards';
import { FanCard } from './components/FanCard';
import { FanEmptyState } from './components/FanEmptyState';

export const Fan = () => {
    const { randomCards, randomGroupName, loading, hasCards } = useRandomParticipantCards();
    const [refreshKey] = useState(() => Math.random());

    if (loading) {
        return <FanEmptyState message="Загрузка участников..." />;
    }

    if (!hasCards || !randomGroupName || randomCards.length === 0) {
        return <FanEmptyState message="Нет доступных карточек участников" />;
    }

    return (
        <div className={style.heroFan} key={refreshKey}>
            {randomCards.map((card, index) => (
                <FanCard
                    key={`${refreshKey}-${index}`}
                    src={card.src}
                    alt={card.alt}
                    index={index}
                    refreshKey={refreshKey}
                />
            ))}
        </div>
    );
};