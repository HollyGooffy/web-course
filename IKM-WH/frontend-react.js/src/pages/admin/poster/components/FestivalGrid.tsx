import { Grid } from "@shared/ui/adminPage";
import { FestivalCard } from './FestivalCard';
import style from '../ui/Poster.module.css';

interface FestivalGridProps {
    festivals: any[];
    onEdit: (festival: any) => void;
    onDelete: (id: string) => Promise<void>;
}

export const FestivalGrid = ({ festivals, onEdit, onDelete }: FestivalGridProps) => {
    return (
        <Grid className={style.eventsGrid}>
            {festivals.map((festival) => (
                <FestivalCard
                    key={festival.id}
                    festival={festival}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </Grid>
    );
};