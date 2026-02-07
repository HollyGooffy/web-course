import { MerchItem } from '@shared/api/endpoints/merch.endpoints';
import { MerchErrorMessage } from './MerchErrorMessage';
import { MerchControls } from './MerchControls';
import { MerchGrid } from './MerchGrid';
import style from '../ui/Merch.module.css';

interface MerchContentProps {
    error?: string;
    filteredItems: MerchItem[];
    searchTerm: string;
    selectedCategory: string;
    categories: string[];
    onSearchChange: (value: string) => void;
    onCategoryChange: (value: string) => void;
    onEdit: (item: MerchItem) => void;
    onDelete: (item: MerchItem) => void;
}

export const MerchContent = ({
    error,
    filteredItems,
    searchTerm,
    selectedCategory,
    categories,
    onSearchChange,
    onCategoryChange,
    onEdit,
    onDelete
}: MerchContentProps) => {
    return (
        <div className={`${style.merchContent} fadeIn`}>
            {error && <MerchErrorMessage error={error} />}

            <MerchControls
                searchTerm={searchTerm}
                selectedCategory={selectedCategory}
                categories={categories}
                onSearchChange={onSearchChange}
                onCategoryChange={onCategoryChange}
            />

            <MerchGrid
                items={filteredItems}
                searchTerm={searchTerm}
                selectedCategory={selectedCategory}
                onEdit={onEdit}
                onDelete={onDelete}
            />
        </div>
    );
};