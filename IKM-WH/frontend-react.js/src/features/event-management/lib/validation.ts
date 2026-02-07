import { CreateEventData } from '@shared/api/endpoints/events.endpoints';
import { FormErrors } from '../model/types';

export const validateEventForm = (
    formData: CreateEventData, 
    performersText: string, 
    imageError?: string
): FormErrors => {
    const errors: FormErrors = {};

    if (!formData.title.trim()) {
        errors.title = 'Введите название';
    }

    if (!formData.date) {
        errors.date = 'Выберите дату';
    }

    if (!formData.time.trim()) {
        errors.time = 'Введите время';
    }

    if (!formData.venue.trim()) {
        errors.venue = 'Введите название места';
    }

    if (!formData.address.trim()) {
        errors.address = 'Введите адрес';
    }

    if (performersText.trim() && performersText.split('\n').filter(p => p.trim()).length === 0) {
        errors.performers = 'Введите хотя бы одного исполнителя';
    }

    if (imageError) {
        errors.image = imageError;
    }

    return errors;
};

export const parsePerformers = (performersText: string): string[] => {
    return performersText
        .split('\n')
        .map(p => p.trim())
        .filter(p => p.length > 0);
};