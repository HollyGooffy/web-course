export interface ApplicationFormData {
    groupName: string;
    contactTelegram: string;
    contactPhone: string;
    genre: string;
    description: string;
    members: string;
}

export interface ApplicationSubmitData {
    groupName: string;
    contactTelegram: string;
    contactPhone: string;
    genre: string;
    description: string;
    members: string[];
}

export interface ApplicationSubmitStatus {
    type: 'success' | 'error' | null;
    message: string;
}