import { useState, useEffect } from 'react';
import { Group, CreateGroupData } from '@shared/api/endpoints/groups.endpoints';
import { getImageUrl } from '@shared/lib/utils/getImageUrl';
import { useImageUpload } from '@shared/hooks/useImageUpload';
import { validateGroupForm } from '../lib/validation';
import { FormErrors } from '../model/types';

interface UseGroupFormProps {
    group?: Group | null;
    mode: 'create' | 'edit';
    isOpen: boolean;
}

export const useGroupForm = ({ group, mode, isOpen }: UseGroupFormProps) => {
    const [formData, setFormData] = useState<CreateGroupData>({
        name: '',
        genre: '',
        description: '',
        members: [''],
        vkLink: '',
        tgLink: ''
    });
    const [errors, setErrors] = useState<FormErrors>({});

    const {
        imageFile,
        imagePreview,
        error: imageError,
        isLoading: imageLoading,
        handleImageChange,
        removeImage,
        setImagePreview,
    } = useImageUpload();

    useEffect(() => {
        if (group && mode === 'edit') {
            setFormData({
                name: group.name,
                genre: group.genre,
                description: group.description,
                members: group.members.length > 0 ? group.members : [''],
                vkLink: group.vkLink || '',
                tgLink: group.tgLink || ''
            });
            if (group.image) {
                setImagePreview(getImageUrl(group.image) || '');
            }
        } else {
            setFormData({
                name: '',
                genre: '',
                description: '',
                members: [''],
                vkLink: '',
                tgLink: ''
            });
            removeImage();
        }
        setErrors({});
    }, [group, mode, isOpen, removeImage, setImagePreview]);

    const updateFormData = (data: Partial<CreateGroupData>) => {
        setFormData(prev => ({ ...prev, ...data }));
    };

    const validate = (): boolean => {
        const newErrors = validateGroupForm(formData, imageError);
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const getSubmitData = (): CreateGroupData => ({
        ...formData,
        members: formData.members.filter(m => m.trim() !== '')
    });

    return {
        formData,
        errors,
        imageFile,
        imagePreview,
        imageLoading,
        updateFormData,
        handleImageChange,
        removeImage,
        validate,
        getSubmitData,
        setErrors
    };
};