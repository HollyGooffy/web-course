import { Package, Edit, Trash2, DollarSign, Archive } from 'lucide-react';
import { MerchItem } from '@shared/api/endpoints/merch.endpoints';
import { AdminBtn, Badge } from "@shared/ui/adminPage";
import { getImageUrl } from '@shared/lib/utils/getImageUrl';
import { formatPrice } from '../lib/formatPrice';
import style from '../ui/Merch.module.css';

interface MerchCardProps {
    item: MerchItem;
    index: number;
    onEdit: (item: MerchItem) => void;
    onDelete: (item: MerchItem) => void;
}

export const MerchCard = ({ item, index, onEdit, onDelete }: MerchCardProps) => {
    return (
        <div 
            key={item.id} 
            className={`${style.merchCard} cardFadeIn`} 
            style={{ animationDelay: `${0.3 + index * 0.1}s` }}
        >
            <div className={style.merchImage}>
                {item.image ? (
                    <img src={getImageUrl(item.image) || ''} alt={item.title} />
                ) : (
                    <div className={style.noImage}>
                        <Package size={48} />
                    </div>
                )}
            </div>

            <div className={style.merchInfo}>
                <div className={style.merchHeader}>
                    <h3>{item.title || 'Без названия'}</h3>
                    <div className={style.badges}>
                        {item.category && (
                            <Badge variant="draft">{item.category}</Badge>
                        )}
                        <Badge variant={item.stock > 0 ? "active" : "inactive"}>
                            {item.stock > 0 ? 'В наличии' : 'Нет в наличии'}
                        </Badge>
                    </div>
                </div>

                {item.description && (
                    <p className={style.description}>{item.description}</p>
                )}

                <div className={style.stats}>
                    <div className={style.stat}>
                        <DollarSign size={16} />
                        <span>{formatPrice(item.price || 0)}</span>
                    </div>
                    <div className={style.stat}>
                        <Archive size={16} />
                        <span>{item.stock || 0} шт.</span>
                    </div>
                </div>

                <div className={style.merchActions}>
                    <AdminBtn 
                        variant='secondary'
                        onClick={() => onEdit(item)}
                    >
                        <Edit size={16} />
                        Редактировать
                    </AdminBtn>
                    <AdminBtn 
                        variant='destructive'
                        onClick={() => onDelete(item)}
                    >
                        <Trash2 size={16} />
                        Удалить
                    </AdminBtn>
                </div>
            </div>
        </div>
    );
};