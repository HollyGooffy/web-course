export const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB'
    }).format(price);
};

export const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

export const getStatusText = (status: string): string => {
    switch (status) {
        case 'completed':
            return 'Прошёл';
        case 'ongoing':
            return 'Идёт сейчас';
        default:
            return 'Предстоящий';
    }
};