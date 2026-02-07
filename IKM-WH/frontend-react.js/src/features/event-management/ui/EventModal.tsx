import { useState, useCallback } from 'react';
import { EventModalProps } from '../model/types';
import { useEventForm } from '../hooks/useEventForm';
import { parsePerformers } from '../lib/validation';
import { ModalHeader } from '../components/ModalHeader';
import { EventForm } from '../components/EventForm';
import { PerformersSection } from '../components/PerformersSection';
import { ModalFooter } from '../components/ModalFooter';
import style from './EventModal.module.css';

export const EventModal = ({ event, onClose, onSave }: EventModalProps) => {
    const [loading, setLoading] = useState(false);
    
    const {
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
    } = useEventForm({ event });

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate() || loading) return;

        setLoading(true);
        try {
            const performers = parsePerformers(performersText);

            await onSave({
                ...formData,
                performers,
            }, imageFile || undefined);
            onClose();
        } catch (error) {
            console.error('Error saving event:', error);
            if (error instanceof Error) {
                setErrors(prev => ({ ...prev, submit: error.message }));
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={style.overlay} onClick={onClose}>
            <div className={style.modal} onClick={(e) => e.stopPropagation()}>
                <ModalHeader isEdit={!!event} onClose={onClose} />

                <form onSubmit={handleSubmit} className={style.form}>
                    <EventForm
                        formData={formData}
                        errors={errors}
                        imagePreview={imagePreview}
                        imageLoading={imageLoading}
                        onFormDataChange={updateFormData}
                        onImageChange={handleFileChange}
                        onRemoveImage={removeImage}
                    />

                    <PerformersSection
                        performersText={performersText}
                        error={errors.performers}
                        onPerformersChange={setPerformersText}
                    />

                    <ModalFooter
                        isEdit={!!event}
                        loading={loading}
                        submitError={errors.submit}
                        onClose={onClose}
                    />
                </form>
            </div>
        </div>
    );
};