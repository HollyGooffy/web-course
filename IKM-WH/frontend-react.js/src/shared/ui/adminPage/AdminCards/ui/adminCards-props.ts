export interface AdminCardProps {
    children: React.ReactNode;
    className?: string;
    padding?: 'none' | 'small' | 'medium' | 'large';
    hover?: boolean;
    onClick?: () => void;
}