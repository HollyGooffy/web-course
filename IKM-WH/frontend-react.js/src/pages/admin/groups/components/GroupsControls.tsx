import { AdminSelect } from "@shared/ui/adminPage";
import { SearchInput } from "@shared/ui";
import style from '../ui/Groups.module.css';

interface GroupsControlsProps {
    searchTerm: string;
    selectedGenre: string;
    genres: string[];
    onSearchChange: (value: string) => void;
    onGenreChange: (value: string) => void;
}

export const GroupsControls = ({
    searchTerm,
    selectedGenre,
    genres,
    onSearchChange,
    onGenreChange
}: GroupsControlsProps) => {
    return (
        <div className={`${style.controls} slideUp`} style={{ animationDelay: '0.2s' }}>
            <SearchInput
                value={searchTerm}
                onChange={onSearchChange}
                placeholder="Поиск по названию группы..."
            />
            <AdminSelect 
                value={selectedGenre} 
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onGenreChange(e.target.value)}
            >
                <option value="">Все жанры</option>
                {genres.map(genre => (
                    <option key={genre} value={genre}>{genre}</option>
                ))}
            </AdminSelect>
        </div>
    );
};