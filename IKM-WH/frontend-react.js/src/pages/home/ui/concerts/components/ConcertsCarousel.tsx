import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Festival } from '@shared/api/endpoints/festivals.endpoints';
import { useCarousel } from '@shared/hooks/useCarousel';
import { ConcertCard } from './ConcertCard';
import style from '../Concerts.module.css';

interface ConcertsCarouselProps {
    festivals: Festival[];
    onViewAll: () => void;
}

export const ConcertsCarousel = ({ festivals, onViewAll }: ConcertsCarouselProps) => {
    const { currentSlide, itemsPerSlide, nextSlide, prevSlide, goToSlide } = useCarousel(festivals.length);

    const totalSlides = Math.ceil(festivals.length / itemsPerSlide);
    const showControls = festivals.length > itemsPerSlide;

    return (
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
                        transform: `translateX(-${currentSlide * 100}%)`,
                    }}
                >
                    {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                        <div key={slideIndex} className={style.carouselSlide}>
                            <div className={style.concertsGrid}>
                                {festivals
                                    .slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide)
                                    .map((festival) => (
                                        <ConcertCard key={festival.id} festival={festival} />
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

            <div className={style.viewAllContainer}>
                <button className={style.viewAllButton} onClick={onViewAll}>
                    Посмотреть все концерты
                </button>
            </div>
        </div>
    );
};
