import React from "react";

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    image?: string;
    vkLink?: string;
    tgLink?: string;
    showSocialLinks?: boolean;
    socialLinksVariant?: 'default' | 'minimal' | 'colored';
}
