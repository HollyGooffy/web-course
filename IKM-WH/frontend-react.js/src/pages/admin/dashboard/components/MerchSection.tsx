import { Package } from 'lucide-react';
import { LoadingState } from '@shared/ui/loading-state';
import { SectionHeader } from './SectionHeader';
import { EmptyState } from './EmptyState';
import style from '../ui/Dashboard.module.css';

interface MerchItem {
    id: string;
    title: string;
    price: number;
    stock: number;
}

interface MerchSectionProps {
    items: MerchItem[];
    loading: boolean;
}

export const MerchSection = ({ items, loading }: MerchSectionProps) => {
    return (
        <div className={style.section}>
            <SectionHeader title="Мерч в наличии" icon={<Package size={20} />} />
            
            {loading ? (
                <LoadingState message="Загрузка мерча..." size="small" />
            ) : items.length > 0 ? (
                <div className={style.merchList}>
                    {items.slice(0, 5).map((item, index) => (
                        <div key={item.id} className={`${style.merchItem} fadeInStagger`} style={{animationDelay: `${index * 0.1}s`}}>
                            <div className={style.merchInfo}>
                                <span className={style.merchTitle}>{item.title}</span>
                                <span className={style.merchPrice}>
                                    {new Intl.NumberFormat('ru-RU', {
                                        style: 'currency',
                                        currency: 'RUB'
                                    }).format(item.price)}
                                </span>
                            </div>
                            <span className={style.merchStock}>
                                {item.stock > 0 ? `${item.stock} шт.` : 'Нет в наличии'}
                            </span>
                        </div>
                    ))}
                </div>
            ) : (
                <EmptyState 
                    icon={<Package size={32} style={{ opacity: 0.3, marginBottom: '8px' }} />}
                    message="Нет товаров в наличии"
                />
            )}
        </div>
    );
};