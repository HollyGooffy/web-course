export interface Group {
  id: string;
  name: string;
  description: string;
  genre: string;
  image?: string;
  members?: string[];
  vkLink?: string;
  tgLink?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface GroupFormData {
  name: string;
  description: string;
  genre: string;
  members?: string[];
  vkLink?: string;
  tgLink?: string;
}

export interface GroupApiItem {
  id: string;
  name: string;
  description: string;
  genre: string;
  image?: string;
  vkLink?: string;
  tgLink?: string;
}

export interface GroupDisplayItem {
  id: string;
  name: string;
  description: string;
  genre: string;
  image: string;
  vkLink: string;
  tgLink: string;
}