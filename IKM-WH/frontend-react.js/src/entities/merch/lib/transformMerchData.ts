import { MerchApiItem, MerchItem } from '../model/types';
import { getImageUrl } from '@shared/lib/utils/getImageUrl';

export const transformMerchData = (apiItems: MerchApiItem[]): MerchItem[] => {
    return apiItems
        .filter(item => item.stock > 0)
        .map((item: MerchApiItem) => ({
            id: item.id,
            title: item.title,
            description: item.description || '',
            price: item.price,
            image: getImageUrl(item.image) || '/images/merch/default.jpg',
            category: item.category || 'Другое',
            stock: item.stock
        }));
};