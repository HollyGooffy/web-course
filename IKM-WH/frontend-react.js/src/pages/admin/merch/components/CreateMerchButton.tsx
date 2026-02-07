import { Plus } from 'lucide-react';
import { AdminBtn } from "@shared/ui/adminPage";

interface CreateMerchButtonProps {
    onClick: () => void;
}

export const CreateMerchButton = ({ onClick }: CreateMerchButtonProps) => {
    return (
        <AdminBtn variant="primary" onClick={onClick}>
            <Plus size={16} />
            Добавить товар
        </AdminBtn>
    );
};