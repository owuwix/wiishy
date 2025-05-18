export interface User {
  id: string;
  username: string;
  gender: 'male' | 'female' | 'other';
  country: string;
  birthDate: string;
  interests: string[];
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface WishlistItem {
  id: string;
  name: string;
  description?: string;
  category: string;
  price?: number;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Wishlist {
  id: string;
  name: string;
  description?: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
  items: WishlistItem[];
}

export type SortOption = 'priceAsc' | 'priceDesc' | 'nameAsc' | 'nameDesc';

export interface FilterState {
  search: string;
  categories: string[];
  sortBy: SortOption;
}

export type Theme = 'light' | 'dark';