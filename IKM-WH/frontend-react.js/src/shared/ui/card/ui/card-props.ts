export interface CardProps {
    image?: string;
    title: string;
    description: string;
    modalDescription?: string;
    buttonText?: string;
    onButtonClick?: () => void;
    children?: React.ReactNode;
    vkLink?: string;
    tgLink?: string;
}