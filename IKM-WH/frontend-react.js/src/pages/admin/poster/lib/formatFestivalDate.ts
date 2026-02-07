export const formatFestivalDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('ru-RU');
};