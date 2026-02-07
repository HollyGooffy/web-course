import { useState, useEffect } from 'react';

export const useFestivalCarousel = (totalItems: number) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [itemsPerSlide, setItemsPerSlide] = useState(2);

    useEffect(() => {
        const updateItemsPerSlide = () => {
            const width = window.innerWidth;
            if (width <= 768) {
                setItemsPerSlide(1); // 1 карточка на мобилке и планшетах
            } else {
                setItemsPerSlide(2); // 2 карточки на десктопе
            }
        };

        updateItemsPerSlide();
        window.addEventListener('resize', updateItemsPerSlide);
        return () => window.removeEventListener('resize', updateItemsPerSlide);
    }, []);

    const maxSlides = Math.max(0, Math.ceil(totalItems / itemsPerSlide) - 1);

    const nextSlide = () => {
        setCurrentSlide(prev => (prev >= maxSlides ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide(prev => (prev <= 0 ? maxSlides : prev - 1));
    };

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    return {
        currentSlide,
        itemsPerSlide,
        maxSlides,
        nextSlide,
        prevSlide,
        goToSlide
    };
};
