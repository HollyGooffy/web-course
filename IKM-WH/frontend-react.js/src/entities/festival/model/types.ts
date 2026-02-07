export interface Festival {
  id: string;
  name: string;
  description?: string;
  date: string;
  venue?: string;
  address?: string;
  image?: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt?: string;
}

export interface FestivalFormData {
  name: string;
  description?: string;
  date: string;
  venue?: string;
  address?: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
}