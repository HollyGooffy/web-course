import { Calendar, MapPin, Clock, Edit, Trash2, Users } from 'lucide-react';
import { AdminBtn } from "@shared/ui/adminPage";
import { EventStatusIndicator } from '@shared/ui/event-status-indicator';
import { getImageUrl } from '@shared/lib/utils/getImageUrl';
import { formatFestivalDate } from '../lib/formatFestivalDate';
import style from '../ui/Poster.module.css';

interface FestivalCardProps {
    festival: any;
    onEdit: (festival: any) => void;
    onDelete: (id: string) => Promise<void>;
}

export const FestivalCard = ({ festival, onEdit, onDelete }: FestivalCardProps) => {
    return (
        <div className={style.eventCard}>
            {festival.image && (
                <div 
                    className={style.eventImage}
                    style={{ backgroundImage: `url(${getImageUrl(festival.image)})` }}
                />
            )}
            <div className={style.eventContent}>
                <div className={style.eventHeader}>
                    <h4>{festival.name}</h4>
                    <EventStatusIndicator 
                        event={{
                            ...festival, 
                            title: festival.name, 
                            time: festival.time || '',
                            address: festival.address || '',
                            performers: festival.performers || [],
                            status: festival.status === 'ongoing' ? 'upcoming' : festival.status
                        }}
                        showAutoUpdate={true}
                    />
                </div>

                <div className={style.eventDetails}>
                    <div className={style.detail}>
                        <Calendar size={14} />
                        <span>{formatFestivalDate(festival.date)}</span>
                    </div>
                    <div className={style.detail}>
                        <Clock size={14} />
                        <span>{festival.time}</span>
                    </div>
                    <div className={style.detail}>
                        <MapPin size={14} />
                        <span>{festival.venue}</span>
                    </div>
                    {festival.performers && festival.performers.length > 0 && (
                        <div className={style.detail}>
                            <Users size={14} />
                            <span>{festival.performers.length} исполнителей</span>
                        </div>
                    )}
                </div>

                {festival.description && (
                    <p className={style.eventDescription}>{festival.description}</p>
                )}

                <div className={style.eventActions}>
                    <AdminBtn
                        variant="black-outline"
                        onClick={() => onEdit(festival)}
                    >
                        <Edit size={16} />
                        Редактировать
                    </AdminBtn>
                    <AdminBtn
                        variant="destructive"
                        onClick={() => onDelete(festival.id)}
                    >
                        <Trash2 size={16} />
                        Удалить
                    </AdminBtn>
                </div>
            </div>
        </div>
    );
};