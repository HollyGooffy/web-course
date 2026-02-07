import { useNavigate } from 'react-router-dom';
import { SectionTitle } from "@shared/ui/sectionTitle";
import { Container } from "@shared/ui/container";
import { LoadingState } from '@shared/ui';
import { useFestivals } from '@shared/hooks/useFestivals';
import { ConcertCard } from './components/ConcertCard';
import { ConcertsEmptyState } from './components/ConcertsEmptyState';
import style from './Concerts.module.css';

export const Concerts = () => {
    const { festivals, loading, error } = useFestivals();
    const navigate = useNavigate();

    const handleViewAll = () => {
        navigate('/festivals');
    };

    // Показываем только первые 4 концерта
    const displayedFestivals = festivals.slice(0, 4);

    if (loading) {
        return (
            <section id="concerts">
                <Container>
                    <SectionTitle>Наши концерты</SectionTitle>
                    <LoadingState message="Загрузка концертов..." />
                </Container>
            </section>
        );
    }

    if (error) {
        return (
            <section id="concerts">
                <Container>
                    <SectionTitle>Наши концерты</SectionTitle>
                    <ConcertsEmptyState />
                </Container>
            </section>
        );
    }

    return (
        <section id="concerts">
            <Container>
                <SectionTitle>Наши концерты</SectionTitle>
                {festivals.length === 0 ? (
                    <ConcertsEmptyState />
                ) : (
                    <>
                        <div className={style.concertsGrid}>
                            {displayedFestivals.map((festival) => (
                                <ConcertCard key={festival.id} festival={festival} />
                            ))}
                        </div>
                        
                        <div className={style.viewAllContainer}>
                            <button className={style.viewAllButton} onClick={handleViewAll}>
                                Посмотреть все концерты
                            </button>
                        </div>
                    </>
                )}
            </Container>
        </section>
    );
};
