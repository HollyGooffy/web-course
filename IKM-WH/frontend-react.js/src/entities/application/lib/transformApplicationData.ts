import { ApplicationFormData, ApplicationSubmitData } from '../model/types';

export const transformApplicationData = (formData: ApplicationFormData): ApplicationSubmitData => {
    const membersString = typeof formData.members === 'string' 
        ? formData.members 
        : String(formData.members || '');

    const membersArray = membersString
        .split('\n')
        .map(m => m.trim())
        .filter(m => m.length > 0);

    return {
        groupName: formData.groupName,
        contactTelegram: formData.contactTelegram,
        contactPhone: formData.contactPhone,
        genre: formData.genre,
        description: formData.description,
        members: membersArray
    };
};