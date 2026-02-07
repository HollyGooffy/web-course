import { CreateGroupData } from '@shared/api/endpoints/groups.endpoints';
import { FormErrors } from '../model/types';

export const validateGroupForm = (formData: CreateGroupData, imageError?: string): FormErrors => {
    const errors: FormErrors = {};

    if (!formData.name.trim()) {
        errors.name = 'Название группы обязательно';
    }

    if (!formData.genre.trim()) {
        errors.genre = 'Жанр обязателен';
    }

    if (!formData.description.trim()) {
        errors.description = 'Описание обязательно';
    }

    const validMembers = formData.members.filter(m => m.trim() !== '');
    if (validMembers.length === 0) {
        errors.members = 'Добавьте хотя бы одного участника';
    }

    if (imageError) {
        errors.image = imageError;
    }

    return errors;
};