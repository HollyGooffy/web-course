import { Search } from 'lucide-react';
import style from './SearchInput.module.css';

interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

export const SearchInput = ({ 
    value, 
    onChange, 
    placeholder = "Поиск...", 
    className 
}: SearchInputProps) => {
    return (
        <div className={`${style.search} ${className || ''}`}>
            <Search size={20} />
            <input 
                type="text" 
                placeholder={placeholder} 
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
};