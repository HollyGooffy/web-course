import { FestivalControls } from './FestivalControls';
import { FestivalGrid } from './FestivalGrid';
import { FestivalEmptyState } from './FestivalEmptyState';
import { PosterErrorMessage } from './PosterErrorMessage';
import style from '../ui/Poster.module.css';

interface PosterContentProps {
    error?: string;
    festivals: any[];
    onRefresh: () => void;
    onToggleSort: () => void;
    onCreate: () => void;
    onEdit: (festival: any) => void;
    onDelete: (id: string) => Promise<void>;
}

export const PosterContent = ({
    error,
    festivals,
    onRefresh,
    onToggleSort,
    onCreate,
    onEdit,
    onDelete
}: PosterContentProps) => {
    return (
        <div className={style.posterContent}>
            {error && <PosterErrorMessage error={error} />}

            <FestivalControls
                onRefresh={onRefresh}
                onToggleSort={onToggleSort}
                onCreate={onCreate}
            />

            {festivals.length === 0 ? (
                <FestivalEmptyState onCreate={onCreate} />
            ) : (
                <FestivalGrid
                    festivals={festivals}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            )}
        </div>
    );
};