import { Document } from 'mongoose';

export interface ParticipantCardFile {
  originalName: string;
  filename: string;
  mimetype: string;
  size: number;
  compressedSize: number;
  compressionRatio: number;
  uploadedAt: Date;
}

export interface ParticipantCardSettings {
  price: number;
  setsAvailable: number;
  isActive: boolean;
}

export interface ParticipantCardDocument extends Document {
  festivalId: string;
  groupName: string;
  eventId: string;
  cards: ParticipantCardFile[];
  settings: ParticipantCardSettings;
  createdAt: Date;
  updatedAt: Date;
}

export interface SaveParticipantCardsRequest {
  festivalId: string;
  groupName: string;
  eventId: string;
  settings?: string; // JSON строка
}

export interface SaveParticipantCardsResponse {
  message: string;
  participantCard: ParticipantCardDocument;
  cardsCount: number;
  totalSize: number;
}

export interface UpdateSettingsRequest {
  settings: Partial<ParticipantCardSettings>;
}

export interface UpdateSettingsResponse {
  message: string;
  participantCard: ParticipantCardDocument;
}

export interface DeleteResponse {
  message: string;
  deletedCount?: number;
  deletedGroups?: number;
  deletedFiles?: number;
}

export interface CompressionResult {
  originalSize: number;
  compressedSize: number;
  compressionRatio: number;
}