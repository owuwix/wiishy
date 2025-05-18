import React, { createContext, useContext, useState, useEffect } from 'react';
import { Wishlist, WishlistItem, FilterState, SortOption } from '../types';
import { mockWishlists, mockItems } from '../data/mockData';
import { useAuth } from './AuthContext';

interface WishlistContextType {
  wishlists: Wishlist[];
  recommendedItems: WishlistItem[];
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
  createWishlist: (name: string, description: string, isPublic: boolean) => Promise<Wishlist>;
  updateWishlist: (id: string, data: Partial<Wishlist>) => Promise<Wishlist>;
  deleteWishlist: (id: string) => Promise<void>;
  addItemToWishlist: (wishlistId: string, item: WishlistItem) => Promise<Wishlist>;
  removeItemFromWishlist: (wishlistId: string, itemId: string) => Promise<Wishlist>;
  getFilteredItems: () => WishlistItem[];
}

const defaultFilterState: FilterState = {
  search: '',
  categories: [],
  sortBy: 'nameAsc',
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { authState } = useAuth();
  const [wishlists, setWishlists] = useState<Wishlist[]>([]);
  const [recommendedItems, setRecommendedItems] = useState<WishlistItem[]>([]);
  const [filterState, setFilterState] = useState<FilterState>(defaultFilterState);

  useEffect(() => {
    if (authState.user) {
      const userWishlists = mockWishlists.filter(list => list.userId === authState.user?.id);
      setWishlists(userWishlists);
      
      setRecommendedItems(mockItems);
    } else {
      setWishlists([]);
    }
  }, [authState.user]);

  const createWishlist = async (name: string, description: string, isPublic: boolean): Promise<Wishlist> => {
    if (!authState.user) {
      throw new Error('Пользователь не авторизован');
    }
    
    const newWishlist: Wishlist = {
      id: `wishlist-${Date.now()}`,
      name,
      description,
      isPublic,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: authState.user.id,
      items: [],
    };
    
    setWishlists(prev => [...prev, newWishlist]);
    return newWishlist;
  };

  const updateWishlist = async (id: string, data: Partial<Wishlist>): Promise<Wishlist> => {
    const index = wishlists.findIndex(list => list.id === id);
    if (index === -1) {
      throw new Error('Список желаний не найден');
    }
    
    const updatedWishlist = {
      ...wishlists[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    
    const newWishlists = [...wishlists];
    newWishlists[index] = updatedWishlist;
    setWishlists(newWishlists);
    
    return updatedWishlist;
  };

  const deleteWishlist = async (id: string): Promise<void> => {
    setWishlists(prev => prev.filter(list => list.id !== id));
  };

  const addItemToWishlist = async (wishlistId: string, item: WishlistItem): Promise<Wishlist> => {
    const index = wishlists.findIndex(list => list.id === wishlistId);
    if (index === -1) {
      throw new Error('Список желаний не найден');
    }
    
    const newItem: WishlistItem = {
      ...item,
      id: item.id || `item-${Date.now()}`,
      createdAt: item.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    const updatedWishlist = {
      ...wishlists[index],
      items: [...wishlists[index].items, newItem],
      updatedAt: new Date().toISOString(),
    };
    
    const newWishlists = [...wishlists];
    newWishlists[index] = updatedWishlist;
    setWishlists(newWishlists);
    
    return updatedWishlist;
  };

  const removeItemFromWishlist = async (wishlistId: string, itemId: string): Promise<Wishlist> => {
    const index = wishlists.findIndex(list => list.id === wishlistId);
    if (index === -1) {
      throw new Error('Список желаний не найден');
    }
    
    const updatedWishlist = {
      ...wishlists[index],
      items: wishlists[index].items.filter(item => item.id !== itemId),
      updatedAt: new Date().toISOString(),
    };
    
    const newWishlists = [...wishlists];
    newWishlists[index] = updatedWishlist;
    setWishlists(newWishlists);
    
    return updatedWishlist;
  };

  const getFilteredItems = (): WishlistItem[] => {
    let filtered = [...recommendedItems];
    
    if (filterState.search) {
      const lowerSearch = filterState.search.toLowerCase();
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(lowerSearch) || 
        (item.description && item.description.toLowerCase().includes(lowerSearch))
      );
    }
    
    if (filterState.categories.length > 0) {
      filtered = filtered.filter(item => filterState.categories.includes(item.category));
    }
    
    filtered.sort((a, b) => {
      switch (filterState.sortBy) {
        case 'priceAsc':
          return (a.price || 0) - (b.price || 0);
        case 'priceDesc':
          return (b.price || 0) - (a.price || 0);
        case 'nameAsc':
          return a.name.localeCompare(b.name);
        case 'nameDesc':
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });
    
    return filtered;
  };

  return (
    <WishlistContext.Provider 
      value={{ 
        wishlists, 
        recommendedItems, 
        filterState, 
        setFilterState,
        createWishlist, 
        updateWishlist, 
        deleteWishlist, 
        addItemToWishlist, 
        removeItemFromWishlist,
        getFilteredItems
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlists = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlists must be used within a WishlistProvider');
  }
  return context;
};