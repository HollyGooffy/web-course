import { useState, useCallback } from 'react';
import { GroupModalProps } from '../model/types';
import { useGroupForm } from '../hooks/useGroupForm';
import { ModalHeader } from '../components/ModalHeader';
import { GroupForm } from '../components/GroupForm';
import { ModalFooter } from '../components/ModalFooter';
import style from './GroupModal.module.css';

export const GroupModal: React.FC<GroupModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    group,
    mode
}) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const {
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
    } = useGroupForm({ group, mode, isOpen });

    const handleFileChange = useCallback((file: File | null) => {
        if (file) {
            // Создаем фейковый event для handleImageChange
            const fakeEvent = {
                target: {
                    files: [file]
                }
            } as unknown as React.ChangeEvent<HTMLInputElement>;
            handleImageChange(fakeEvent);
        } else {
            removeImage();
        }
    }, [handleImageChange, removeImage]);

    // Адаптер для errors - преобразуем FormErrors в Record<string, string>
    const adaptedErrors: Record<string, string> = Object.entries(errors).reduce((acc, [key, value]) => {
        if (value !== undefined) {
            acc[key] = value;
        }
        return acc;
    }, {} as Record<string, string>);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate() || isSubmitting) {
            return;
        }

        try {
            setIsSubmitting(true);
            const dataToSubmit = getSubmitData();
            await onSubmit(dataToSubmit, imageFile || undefined);
            onClose();
        } catch (error) {
            console.error('Error submitting form:', error);
            if (error instanceof Error) {
                setErrors(prev => ({ ...prev, submit: error.message }));
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className={style.modalOverlay} onClick={onClose}>
            <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
                <ModalHeader mode={mode} onClose={onClose} />

                <form onSubmit={handleSubmit} className={style.modalBody}>
                    <GroupForm
                        formData={formData}
                        errors={adaptedErrors}
                        imagePreview={imagePreview}
                        imageLoading={imageLoading}
                        onFormDataChange={updateFormData}
                        onImageChange={handleFileChange}
                        onRemoveImage={removeImage}
                    />

                    <ModalFooter
                        mode={mode}
                        isSubmitting={isSubmitting}
                        submitError={errors.submit}
                        onClose={onClose}
                    />
                </form>
            </div>
        </div>
    );
};