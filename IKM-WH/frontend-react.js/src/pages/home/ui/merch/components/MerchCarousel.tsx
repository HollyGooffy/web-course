import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MerchCard } from "@entities/merch";
import { CollectibleCardsCard } from '@features/cards-display';
import { CarouselItem } from '@entities/merch';
import { useCarousel } from '@shared/hooks/useCarousel';
import style from '../Merch.module.css';

interface MerchCarouselProps {
    items: CarouselItem[];
}

export const MerchCarousel = ({ items }: MerchCarouselProps) => {
    const { currentSlide, itemsPerSlide, nextSlide, prevSlide, goToSlide } = useCarousel(items.length);

    const totalSlides = Math.ceil(items.length / itemsPerSlide);
    const showControls = items.length > itemsPerSlide;

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
                            <div className={style.merchGrid}>
                                {items
                                    .slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide)
                                    .map((item, index) => (
                                        <div key={`${slideIndex}-${index}`}>
                                            {item.type === 'cards' ? (
                                                <CollectibleCardsCard cardSets={item.data} />
                                            ) : (
                                                <MerchCard merch={item.data} />
                                            )}
                                        </div>
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
    );
};