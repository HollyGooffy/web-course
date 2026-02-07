import { Event, CreateEventData } from '@shared/api/endpoints/events.endpoints';

export interface EventModalProps {
    event?: Event | null;
    onClose: () => void;
    onSave: (data: CreateEventData, imageFile?: File) => Promise<void>;
}

export interface ModalHeaderProps {
    isEdit: boolean;
    onClose: () => void;
}

export interface EventFormProps {
    formData: CreateEventData;
    errors: Record<string, string>;
    imagePreview: string;
    imageLoading: boolean;
    onFormDataChange: (data: Partial<CreateEventData>) => void;
    onImageChange: (file: File | null) => void;
    onRemoveImage: () => void;
}

export interface PerformersSectionProps {
    performersText: string;
    error?: string;
    onPerformersChange: (text: string) => void;
}

export interface ModalFooterProps {
    isEdit: boolean;
    loading: boolean;
    submitError?: string;
    onClose: () => void;
}

export interface FormErrors {
    title?: string;
    date?: string;
    time?: string;
    venue?: string;
    address?: string;
    performers?: string;
    image?: string;
    submit?: string;
}

export type EventStatus = 'upcoming' | 'completed' | 'cancelled';