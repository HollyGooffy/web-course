import { useState, useEffect } from 'react';
import { Event, CreateEventData } from '@shared/api/endpoints/events.endpoints';
import { getImageUrl } from '@shared/lib/utils/getImageUrl';
import { useImageUpload } from '@shared/hooks/useImageUpload';
import { validateEventForm } from '../lib/validation';

interface UseEventFormProps {
    event?: Event | null;
}

export const useEventForm = ({ event }: UseEventFormProps) => {
    const [formData, setFormData] = useState<CreateEventData>({
        title: '',
        description: '',
        date: '',
        time: '',
        venue: '',
        address: '',
        performers: [],
        status: 'upcoming',
    });

    const [performersText, setPerformersText] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});

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
        if (event) {
            setFormData({
                title: event.title,
                description: event.description || '',
                date: event.date.split('T')[0],
                time: event.time,
                venue: event.venue,
                address: event.address,
                performers: event.performers,
                status: event.status,
            });
            setPerformersText(event.performers.join('\n'));
            if (event.image) {
                setImagePreview(getImageUrl(event.image) || '');
            }
        } else {
            setFormData({
                title: '',
                description: '',
                date: '',
                time: '',
                venue: '',
                address: '',
                performers: [],
                status: 'upcoming',
            });
            setPerformersText('');
            removeImage();
        }
        setErrors({});
    }, [event, removeImage, setImagePreview]);

    const updateFormData = (data: Partial<CreateEventData>) => {
        setFormData(prev => ({ ...prev, ...data }));
    };

    const validate = (): boolean => {
        const newErrors = validateEventForm(formData, performersText, imageError);
        setErrors(newErrors as Record<string, string>);
        return Object.keys(newErrors).length === 0;
    };

    return {
        formData,
        performersText,
        errors,
        imageFile,
        imagePreview,
        imageLoading,
        updateFormData,
        setPerformersText,
        handleImageChange,
        removeImage,
        validate,
        setErrors
    };
};