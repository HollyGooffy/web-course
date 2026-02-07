import { Group, CreateGroupData } from '@shared/api/endpoints/groups.endpoints';

export interface GroupModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: CreateGroupData, imageFile?: File) => Promise<void>;
    group?: Group | null;
    mode: 'create' | 'edit';
}

export interface ModalHeaderProps {
    mode: 'create' | 'edit';
    onClose: () => void;
}

export interface GroupFormProps {
    formData: CreateGroupData;
    errors: Record<string, string>;
    imagePreview: string;
    imageLoading: boolean;
    onFormDataChange: (data: Partial<CreateGroupData>) => void;
    onImageChange: (file: File | null) => void;
    onRemoveImage: () => void;
}

export interface MembersSectionProps {
    members: string[];
    error?: string;
    onMembersChange: (members: string[]) => void;
}

export interface ModalFooterProps {
    mode: 'create' | 'edit';
    isSubmitting: boolean;
    submitError?: string;
    onClose: () => void;
}

export interface FormErrors {
    [key: string]: string | undefined;
    name?: string;
    genre?: string;
    description?: string;
    members?: string;
    image?: string;
    submit?: string;
}