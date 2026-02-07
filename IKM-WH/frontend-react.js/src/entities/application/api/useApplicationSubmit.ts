import { useState } from 'react';
import { applicationsApi } from '@shared/api/endpoints/applications.endpoints';
import { transformApplicationData } from '../lib/transformApplicationData';
import { ApplicationFormData, ApplicationSubmitStatus } from '../model/types';

export const useApplicationSubmit = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<ApplicationSubmitStatus>({ 
        type: null, 
        message: '' 
    });

    const submitApplication = async (formData: ApplicationFormData) => {
        setIsLoading(true);
        setSubmitStatus({ type: null, message: '' });

        try {
            const applicationData = transformApplicationData(formData);
            const response = await applicationsApi.create(applicationData);

            if (response.success) {
                setSubmitStatus({
                    type: 'success',
                    message: 'Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.'
                });
                return { success: true };
            } else {
                throw new Error('Ошибка отправки заявки');
            }
        } catch (error: any) {
            setSubmitStatus({
                type: 'error',
                message: error.response?.data?.error || error.message || 'Произошла ошибка при отправке заявки. Попробуйте еще раз.'
            });
            return { success: false, error };
        } finally {
            setIsLoading(false);
        }
    };

    const clearStatus = () => {
        setSubmitStatus({ type: null, message: '' });
    };

    return {
        isLoading,
        submitStatus,
        submitApplication,
        clearStatus
    };
};