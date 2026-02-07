import { Group } from '@shared/api/endpoints/groups.endpoints';
import { Grid } from "@shared/ui/adminPage";
import { GroupCard } from './GroupCard';
import style from '../ui/Groups.module.css';

interface GroupsGridProps {
    groups: Group[];
    searchTerm: string;
    selectedGenre: string;
    onEdit: (group: Group) => void;
    onDelete: (group: Group) => void;
}

export const GroupsGrid = ({ groups, searchTerm, selectedGenre, onEdit, onDelete }: GroupsGridProps) => {
    if (groups.length === 0) {
        return (
            <Grid className={style.groupGrid}>
                <div className="fadeIn" style={{ 
                    gridColumn: '1 / -1', 
                    textAlign: 'center', 
                    padding: '40px',
                    color: '#666',
                    animationDelay: '0.3s'
                }}>
                    {searchTerm || selectedGenre ? 'Группы не найдены' : 'Нет групп для отображения'}
                </div>
            </Grid>
        );
    }

    return (
        <Grid className={style.groupGrid}>
            {groups.map((group, index) => (
                <GroupCard
                    key={group.id}
                    group={group}
                    index={index}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </Grid>
    );
};