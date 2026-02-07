import { X } from 'lucide-react';
import { AdminBtn } from '@shared/ui/adminPage';
import { AdminInput } from '@shared/ui/adminPage/AdminInput';
import { MembersSectionProps } from '../model/types';
import { useMembers } from '../hooks/useMembers';
import style from '../ui/GroupModal.module.css';

export const MembersSection = ({ members, error, onMembersChange }: MembersSectionProps) => {
    const { addMember, removeMember, updateMember } = useMembers(members, onMembersChange);

    return (
        <div className={style.formGroup}>
            <label>Участники группы *</label>
            {members.map((member, index) => (
                <div key={index} className={style.memberRow}>
                    <AdminInput
                        type="text"
                        placeholder={`Участник ${index + 1}`}
                        value={member}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateMember(index, e.target.value)}
                    />
                    {members.length > 1 && (
                        <button
                            type="button"
                            className={style.removeMemberBtn}
                            onClick={() => removeMember(index)}
                        >
                            <X size={16} />
                        </button>
                    )}
                </div>
            ))}
            {error && <span className={style.error}>{error}</span>}
            <AdminBtn
                type="button"
                variant="accent"
                className="addMemberBtn"
                onClick={addMember}
                style={{ marginTop: '8px' }}
            >
                Добавить участника
            </AdminBtn>
        </div>
    );
};