import { SearchInput } from '@shared/ui';
import style from '../ui/ParticipantCardsManager.module.css';

interface ParticipantCardsControlsProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
}

export const ParticipantCardsControls = ({
    searchTerm,
    onSearchChange
}: ParticipantCardsControlsProps) => {
    return (
        <div className={style.controls}>
            <SearchInput
                value={searchTerm}
                onChange={onSearchChange}
                placeholder="Поиск по названию группы или жанру..."
            />
        </div>
    );
};