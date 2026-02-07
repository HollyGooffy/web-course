import { CreditCard } from 'lucide-react';
import { LoadingState } from '@shared/ui/loading-state';
import { SectionHeader } from './SectionHeader';
import { EmptyState } from './EmptyState';
import style from '../ui/Dashboard.module.css';

interface CardSet {
    id: string;
    title: string;
    price: number;
    cardsInSet: number;
    setsAvailable: number;
}

interface CardsSectionProps {
    cardSets: CardSet[];
    loading: boolean;
}

export const CardsSection = ({ cardSets, loading }: CardsSectionProps) => {
    return (
        <div className={style.section}>
            <SectionHeader title="Коллекционные карточки" icon={<CreditCard size={20} />} />
            
            {loading ? (
                <LoadingState message="Загрузка карточек..." size="small" />
            ) : cardSets.length > 0 ? (
                <div className={style.cardsList}>
                    {cardSets.slice(0, 3).map((cardSet, index) => (
                        <div key={cardSet.id} className={`${style.cardItem} fadeInStagger`} style={{animationDelay: `${index * 0.1}s`}}>
                            <div className={style.cardInfo}>
                                <span className={style.cardTitle}>{cardSet.title}</span>
                                <span className={style.cardPrice}>
                                    {new Intl.NumberFormat('ru-RU', {
                                        style: 'currency',
                                        currency: 'RUB'
                                    }).format(cardSet.price)}
                                </span>
                            </div>
                            <div className={style.cardStats}>
                                <span>{cardSet.cardsInSet} карточек</span>
                                <span>{cardSet.setsAvailable} наборов</span>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <EmptyState 
                    icon={<CreditCard size={32} style={{ opacity: 0.3, marginBottom: '8px' }} />}
                    message="Нет наборов карточек"
                />
            )}
        </div>
    );
};