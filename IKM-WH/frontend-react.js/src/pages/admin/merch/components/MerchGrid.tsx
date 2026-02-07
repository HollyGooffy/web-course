import { MerchItem } from '@shared/api/endpoints/merch.endpoints';
import { Grid } from "@shared/ui/adminPage";
import { MerchCard } from './MerchCard';
import style from '../ui/Merch.module.css';

interface MerchGridProps {
    items: MerchItem[];
    searchTerm: string;
    selectedCategory: string;
    onEdit: (item: MerchItem) => void;
    onDelete: (item: MerchItem) => void;
}

export const MerchGrid = ({ items, searchTerm, selectedCategory, onEdit, onDelete }: MerchGridProps) => {
    if (items.length === 0) {
        return (
            <Grid className={style.merchGrid}>
                <div className="fadeIn" style={{ 
                    gridColumn: '1 / -1', 
                    textAlign: 'center', 
                    padding: '40px',
                    color: '#666',
                    animationDelay: '0.3s'
                }}>
                    {searchTerm || selectedCategory ? 'Товары не найдены' : 'Нет товаров для отображения'}
                </div>
            </Grid>
        );
    }

    return (
        <Grid className={style.merchGrid}>
            {items.map((item, index) => (
                <MerchCard
                    key={item.id}
                    item={item}
                    index={index}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </Grid>
    );
};