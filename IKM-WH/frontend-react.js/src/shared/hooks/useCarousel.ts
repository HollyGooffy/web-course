import { useState, useEffect } from 'react';

export const useCarousel = (totalItems: number) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [itemsPerSlide, setItemsPerSlide] = useState(4);

    useEffect(() => {
        const updateItemsPerSlide = () => {
            const width = window.innerWidth;
            if (width <= 480) {
                setItemsPerSlide(1);
            } else if (width <= 768) {
                setItemsPerSlide(2);
            } else if (width <= 1024) {
                setItemsPerSlide(3);
            } else {
                setItemsPerSlide(4);
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