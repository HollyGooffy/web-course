import { EventStatus } from '../model/types';

export const EVENT_STATUSES: { value: EventStatus; label: string }[] = [
    { value: 'upcoming', label: 'Предстоящее' },
    { value: 'completed', label: 'Завершено' },
    { value: 'cancelled', label: 'Отменено' },
] as const;