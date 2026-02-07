export interface Event {
    id: string;
    name: string;
    date: string;
    time?: string;
    venue: string;
    address?: string;
    description?: string;
    image?: string;
    performers?: string[];
}

export interface EventDisplayData extends Event {
    formattedDate: string;
    imageUrl: string;
    hasPerformers: boolean;
    venueWithAddress: string;
}