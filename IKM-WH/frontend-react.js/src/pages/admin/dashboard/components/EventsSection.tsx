import { EventsList } from '@features/dashboard-events';
import { SectionHeader } from './SectionHeader';
import style from '../ui/Dashboard.module.css';

interface Event {
    id: string;
    name: string;
    date: string;
    stage: string;
    groups: number;
}

interface EventsSectionProps {
    events: Event[];
}

export const EventsSection = ({ events }: EventsSectionProps) => {
    return (
        <div className={style.section}>
            <SectionHeader title="Ближайшие события" />
            <EventsList events={events} />
        </div>
    );
};