import { GroupApiItem, GroupDisplayItem } from '../model/types';
import { getImageUrl } from '@shared/lib/utils/getImageUrl';

export const transformGroupData = (apiGroups: GroupApiItem[]): GroupDisplayItem[] => {
    return apiGroups.map((group: GroupApiItem) => ({
        id: group.id,
        name: group.name,
        description: group.description,
        genre: group.genre,
        image: getImageUrl(group.image) || '/images/groups/default.jpg',
        vkLink: group.vkLink || '#',
        tgLink: group.tgLink || '#'
    }));
};