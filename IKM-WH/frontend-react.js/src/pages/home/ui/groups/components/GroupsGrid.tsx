import { GroupCard } from "@entities/group/ui/GroupCard.tsx";
import { GroupDisplayItem } from '@entities/group';
import style from '../Groups.module.css';

interface GroupsGridProps {
    groups: GroupDisplayItem[];
    loadMoreCount: number;
}

export const GroupsGrid = ({ groups, loadMoreCount }: GroupsGridProps) => {
    return (
        <div className={style.groupsGrid}>
            {groups.map((group, index) => (
                <div 
                    key={group.id}
                    className={style.groupCardWrapper}
                    style={{
                        animationDelay: `${(index % loadMoreCount) * 100}ms`
                    }}
                >
                    <GroupCard group={group} />
                </div>
            ))}
        </div>
    );
};