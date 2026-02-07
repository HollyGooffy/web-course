import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Header } from '@/widgets';
import { Footer } from '@/widgets/footer';
import { Container } from '@shared/ui/container';
import { LoadingState } from '@shared/ui/loading-state';
import { useFestivals } from '@shared/hooks/useFestivals';
import { useFestivalCarousel } from '../hooks/useFestivalCarousel';
import { FestivalCard } from './components/FestivalCard';
import style from './FestivalsPage.module.css';

export const FestivalsPage = () => {
    const { festivals, loading, error } = useFestivals();
    const { currentSlide, itemsPerSlide, nextSlide, prevSlide, goToSlide } = useFestivalCarousel(festivals.length);

    const totalSlides = Math.ceil(festivals.length / itemsPerSlide);
    const showControls = festivals.length > itemsPerSlide;

    return (
        <>
            <Header />
            <main className={style.page}>
                <Container>
                    <div className={style.header}>
                        <h1>Наши фестивали</h1>
                        <p>Выберите фестиваль и посмотрите карточки участников</p>
                    </div>

                    {loading && <LoadingState message="Загрузка фестивалей..." />}

                    {error && (
                        <div className={style.error}>
                            <p>Ошибка загрузки: {error}</p>
                        </div>
                    )}

                    {!loading && !error && festivals.length === 0 && (
                        <div className={style.empty}>
                            <p>Фестивали пока не запланированы. Следите за обновлениями!</p>
                        </div>
                    )}

                    {!loading && !error && festivals.length > 0 && (
                        <div className={style.carouselContainer}>
                            {showControls && (
                                <button 
                                    className={`${style.carouselButton} ${style.carouselButtonPrev}`}
                                    onClick={prevSlide}
                                    aria-label="Предыдущий слайд"
                                >
                                    <ChevronLeft size={24} />
                                </button>
                            )}

                            <div className={style.carouselWrapper}>
                                <div 
                                    className={style.carouselTrack}
                                    style={{
                                        transform: `translateX(-${currentSlide * 100}%)`
                                    }}
                                >
                                    {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                                        <div key={slideIndex} className={style.carouselSlide}>
                                            <div className={style.festivalsGrid}>
                                                {festivals
                                                    .slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide)
                                                    .map((festival) => (
                                                        <FestivalCard key={festival.id} festival={festival} />
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {showControls && (
                                <button 
                                    className={`${style.carouselButton} ${style.carouselButtonNext}`}
                                    onClick={nextSlide}
                                    aria-label="Следующий слайд"
                                >
                                    <ChevronRight size={24} />
                                </button>
                            )}

                            {showControls && (
                                <div className={style.carouselDots}>
                                    {Array.from({ length: totalSlides }).map((_, index) => (
                                        <button
                                            key={index}
                                            className={`${style.carouselDot} ${index === currentSlide ? style.carouselDotActive : ''}`}
                                            onClick={() => goToSlide(index)}
                                            aria-label={`Перейти к слайду ${index + 1}`}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </Container>
            </main>
            <Footer />
        </>
    );
};
