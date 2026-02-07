import React, { useEffect } from 'react';
import styles from './Modal.module.css';
import { createPortal } from 'react-dom';
import { SocialLinks } from '@/shared/ui/socialLinks';
import {ModalProps} from "@shared/ui/modal/ui/modal-props.ts";

export const Modal: React.FC<ModalProps> = ({
                                                isOpen,
                                                onClose,
                                                title,
                                                children,
                                                image,
                                                vkLink,
                                                tgLink,
                                                showSocialLinks = true,
                                                socialLinksVariant = 'default'
                                            }) => {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const modalContent = (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div
                className={styles.modalContent}
                onClick={(e) => e.stopPropagation()}
            >
                <button className={styles.closeButton} onClick={onClose} aria-label="Закрыть">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                </button>

                {image && (
                    <div className={styles.modalImageContainer}>
                        <img src={image} alt={title} className={styles.modalImage} />
                    </div>
                )}

                <div className={styles.modalBody}>
                    <h2 className={styles.modalTitle}>{title}</h2>
                    <div className={styles.modalText}>
                        {children}
                    </div>

                    {showSocialLinks && (
                        <SocialLinks
                            vkLink={vkLink}
                            tgLink={tgLink}
                            variant={socialLinksVariant}
                            showLabels={true}
                        />
                    )}
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
};