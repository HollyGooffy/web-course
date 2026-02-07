import style from './Poster.module.css'
import { Container } from "@shared/ui/container";
import { SectionTitle } from "@shared/ui/sectionTitle";
import { LoadingState } from '@shared/ui/loading-state';
import { useUpcomingEvent } from '@entities/event';
import { PosterEmptyState } from './components/PosterEmptyState';
import { EventCard } from './components/EventCard';

export const Poster = () => {
    const { event, loading, error, hasEvent } = useUpcomingEvent();

    if (loading) {
        return (
            <section id="poster" className={style.section}>
                <Container>
                    <SectionTitle>Афиша месяца</SectionTitle>
                    <LoadingState message="Загрузка событий..." />
                </Container>
            </section>
        );
    }

    if (error) {
        return (
            <section id="poster" className={style.section}>
                <Container>
                    <SectionTitle>Афиша месяца</SectionTitle>
                    <PosterEmptyState message={`Ошибка загрузки: ${error}`} />
                </Container>
            </section>
        );
    }

    if (!hasEvent || !event) {
        return (
            <section id="poster" className={style.section}>
                <Container>
                    <SectionTitle>Афиша месяца</SectionTitle>
                    <PosterEmptyState message="Концертов пока нет. Следите за обновлениями!" />
                </Container>
            </section>
        );
    }

    return (
        <section id="poster" className={style.section}>
            <Container>
                <SectionTitle>Афиша месяца</SectionTitle>
                <EventCard event={event} />
            </Container>
        </section>
    );
};