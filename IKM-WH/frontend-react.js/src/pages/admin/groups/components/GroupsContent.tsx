import { Group } from '@shared/api/endpoints/groups.endpoints';
import { GroupsErrorMessage } from './GroupsErrorMessage';
import { GroupsControls } from './GroupsControls';
import { GroupsGrid } from './GroupsGrid';
import style from '../ui/Groups.module.css';

interface GroupsContentProps {
    error?: string;
    filteredGroups: Group[];
    searchTerm: string;
    selectedGenre: string;
    genres: string[];
    onSearchChange: (value: string) => void;
    onGenreChange: (value: string) => void;
    onEdit: (group: Group) => void;
    onDelete: (group: Group) => void;
}

export const GroupsContent = ({
    error,
    filteredGroups,
    searchTerm,
    selectedGenre,
    genres,
    onSearchChange,
    onGenreChange,
    onEdit,
    onDelete
}: GroupsContentProps) => {
    return (
        <div className={`${style.groupsContent} fadeIn`}>
            {error && <GroupsErrorMessage error={error} />}

            <GroupsControls
                searchTerm={searchTerm}
                selectedGenre={selectedGenre}
                genres={genres}
                onSearchChange={onSearchChange}
                onGenreChange={onGenreChange}
            />

            <GroupsGrid
                groups={filteredGroups}
                searchTerm={searchTerm}
                selectedGenre={selectedGenre}
                onEdit={onEdit}
                onDelete={onDelete}
            />
        </div>
    );
};