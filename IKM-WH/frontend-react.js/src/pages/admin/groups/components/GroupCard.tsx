import { Users, Edit, Trash2 } from 'lucide-react';
import { Group } from '@shared/api/endpoints/groups.endpoints';
import { AdminBtn, Badge } from "@shared/ui/adminPage";
import { getImageUrl } from '@shared/lib/utils/getImageUrl';
import style from '../ui/Groups.module.css';

interface GroupCardProps {
    group: Group;
    index: number;
    onEdit: (group: Group) => void;
    onDelete: (group: Group) => void;
}

export const GroupCard = ({ group, index, onEdit, onDelete }: GroupCardProps) => {
    return (
        <div 
            key={group.id} 
            className={`${style.groupCard} cardFadeIn`} 
            style={{ animationDelay: `${0.3 + index * 0.1}s` }}
        >
            <div className={style.groupHeader}>
                <div className={style.groupAvatar}>
                    {group.image ? (
                        <img src={getImageUrl(group.image) || ''} alt={group.name} />
                    ) : (
                        group.name.charAt(0)
                    )}
                </div>
                <div className={style.groupInfo}>
                    <h3>{group.name}</h3>
                    <span className={style.genre}>{group.genre}</span>
                </div>
                <Badge variant="active">
                    Активна
                </Badge>
            </div>

            <p className={style.description}>{group.description}</p>

            <div className={style.compactInfo}>
                <div className={style.stat}>
                    <Users size={14} />
                    <span>{group.members?.length || 0} участников</span>
                </div>
                <div className={style.stat}>
                    <span>{new Date(group.createdAt).toLocaleDateString('ru-RU')}</span>
                </div>
            </div>

            {group.members && group.members.length > 0 && (
                <div className={style.membersCompact}>
                    <strong>Участники:</strong>
                    <span>{group.members.join(', ')}</span>
                </div>
            )}

            <div className={style.groupActions}>
                <AdminBtn 
                    variant='secondary'
                    onClick={() => onEdit(group)}
                >
                    <Edit size={16} />
                    Редактировать
                </AdminBtn>
                <AdminBtn 
                    variant='destructive'
                    onClick={() => onDelete(group)}
                >
                    <Trash2 size={16} />
                    Удалить
                </AdminBtn>
            </div>
        </div>
    );
};