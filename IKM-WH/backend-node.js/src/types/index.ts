import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export interface JWTPayload extends JwtPayload {
  id: string;
  email: string;
  role: string;
}

export enum ApplicationStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export enum EventStatus {
  UPCOMING = 'upcoming',
  ONGOING = 'ongoing',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export enum ContentType {
  TEXT = 'text',
  IMAGE = 'image',
  LIST = 'list',
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedApiResponse<T = any> extends ApiResponse<T[]> {
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// Query Parameters
export interface PaginationQuery {
  page?: string;
  limit?: string;
}

export interface SearchQuery extends PaginationQuery {
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// Error Types
export interface ValidationError {
  field: string;
  message: string;
}

export interface ApiError {
  statusCode: number;
  message: string;
  errors?: ValidationError[];
}


