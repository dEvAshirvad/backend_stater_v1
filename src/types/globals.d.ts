export interface JWTPayload {
  id: string;
  email: string;
  role: string;
  isVerified: boolean;
  imageUrl?: string;
  collection: string;
}

export interface QueryOptions {
  page: number;
  limit: number;
  sort?: string;
}

export interface PaginatedResult<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  nextPage: boolean;
  prevPage: boolean;
}

export interface DeviceInfo {
  type: 'Desktop' | 'Mobile' | 'Tablet';
  os: string;
  browser: string;
}

declare module 'express' {
  interface Request {
    categoryLoader?: DataLoader;
    user?: JWTPayload;
    device?: DeviceInfo;
  }
}
