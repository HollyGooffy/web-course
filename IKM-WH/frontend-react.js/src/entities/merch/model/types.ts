export interface MerchItem {
    id: string;
    title: string;
    description: string;
    price: number;
    image: string;
    category: string;
    stock: number;
}

export interface MerchApiItem {
    id: string;
    title: string;
    description?: string;
    price: number;
    image?: string;
    category?: string;
    stock: number;
}