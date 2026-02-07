import { Bell } from 'lucide-react';
import { ActivityList } from '@features/dashboard-activity';
import { SectionHeader } from './SectionHeader';
import style from '../ui/Dashboard.module.css';

interface ActivitySectionProps {
    activities: any[];
}

export const ActivitySection = ({ activities }: ActivitySectionProps) => {
    return (
        <div className={style.section}>
            <SectionHeader title="Последняя активность" icon={<Bell size={20} />} />
            <ActivityList activities={activities} />
        </div>
    );
};