export interface AdminHeaderProps {
    title: string;
    description?: string;
    actions?: React.ReactNode;
    children: React.ReactNode;
    maxWidth?: string;
}