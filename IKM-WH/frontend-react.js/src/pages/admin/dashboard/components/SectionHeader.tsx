import { ReactNode } from 'react';
import style from '../ui/Dashboard.module.css';

interface SectionHeaderProps {
    title: string;
    icon?: ReactNode;
}

export const SectionHeader = ({ title, icon }: SectionHeaderProps) => {
    return (
        <div className={style.sectionHeader}>
            <h3>{title}</h3>
            {icon}
        </div>
    );
};