import { Plus, SortAsc, RefreshCw } from 'lucide-react';
import { AdminBtn, Grid } from "@shared/ui/adminPage";

interface FestivalControlsProps {
    onRefresh: () => void;
    onToggleSort: () => void;
    onCreate: () => void;
}

export const FestivalControls = ({ onRefresh, onToggleSort, onCreate }: FestivalControlsProps) => {
    return (
        <Grid columns={3}>
            <AdminBtn
                variant="positive"
                onClick={onRefresh}
                title="Обновить список фестивалей"
            >
                <RefreshCw size={16} />
                Обновить
            </AdminBtn>
            <AdminBtn
                variant="blue"
                onClick={onToggleSort}
                title="Изменить порядок сортировки (Ctrl+S)"
            >
                <SortAsc size={16} />
                Сортировка
            </AdminBtn>
            <AdminBtn variant="primary" onClick={onCreate}>
                <Plus size={16} />
                Добавить фестиваль
            </AdminBtn>
        </Grid>
    );
};