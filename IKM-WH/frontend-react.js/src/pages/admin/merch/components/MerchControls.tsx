import { AdminSelect } from "@shared/ui/adminPage";
import { SearchInput } from "@shared/ui";
import style from '../ui/Merch.module.css';

interface MerchControlsProps {
    searchTerm: string;
    selectedCategory: string;
    categories: string[];
    onSearchChange: (value: string) => void;
    onCategoryChange: (value: string) => void;
}

export const MerchControls = ({
    searchTerm,
    selectedCategory,
    categories,
    onSearchChange,
    onCategoryChange
}: MerchControlsProps) => {
    return (
        <div className={`${style.controls} slideUp`} style={{ animationDelay: '0.2s' }}>
            <SearchInput
                value={searchTerm}
                onChange={onSearchChange}
                placeholder="Поиск по названию товара..."
            />
            <AdminSelect 
                value={selectedCategory} 
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onCategoryChange(e.target.value)}
            >
                <option value="">Все категории</option>
                {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                ))}
            </AdminSelect>
        </div>
    );
};