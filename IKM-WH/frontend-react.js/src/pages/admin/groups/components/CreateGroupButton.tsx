import { Plus } from 'lucide-react';
import { AdminBtn } from "@shared/ui/adminPage";

interface CreateGroupButtonProps {
    onClick: () => void;
}

export const CreateGroupButton = ({ onClick }: CreateGroupButtonProps) => {
    return (
        <AdminBtn variant="primary" onClick={onClick}>
            <Plus size={16} />
            Добавить группу
        </AdminBtn>
    );
};