import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Navigate } from 'react-router-dom';
import { Search, Filter, ChevronDown, SortAsc, SortDesc, ArrowRight } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import ItemCard from '../../components/wishlist/ItemCard';
import Modal from '../../components/ui/Modal';
import { useAuth } from '../../contexts/AuthContext';
import { useWishlists } from '../../contexts/WishlistContext';
import { SortOption, WishlistItem } from '../../types';
import { categories } from '../../data/mockData';

const Recommendations: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { authState } = useAuth();
  const { 
    wishlists, 
    filterState, 
    setFilterState, 
    getFilteredItems, 
    addItemToWishlist 
  } = useWishlists();
  
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedWishlistId, setSelectedWishlistId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<WishlistItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const filteredItems = getFilteredItems();
  
  useEffect(() => {
    const wishlistId = searchParams.get('wishlistId');
    if (wishlistId) {
      const exists = wishlists.some(list => list.id === wishlistId);
      if (exists) {
        setSelectedWishlistId(wishlistId);
      }
    }
  }, [searchParams, wishlists]);
  
  if (!authState.isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterState(prev => ({ ...prev, search: e.target.value }));
  };
  
  const handleSortChange = (sortBy: SortOption) => {
    setFilterState(prev => ({ ...prev, sortBy }));
  };
  
  const handleCategoryToggle = (category: string) => {
    setFilterState(prev => {
      const newCategories = prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category];
      
      return { ...prev, categories: newCategories };
    });
  };
  
  const handleResetFilters = () => {
    setFilterState({ search: '', categories: [], sortBy: 'nameAsc' });
  };
  
  const handleAddItem = (item: WishlistItem) => {
    if (selectedWishlistId) {
      handleConfirmAdd(item, selectedWishlistId);
    } else {
      setSelectedItem(item);
      setIsAddModalOpen(true);
    }
  };
  
  const handleConfirmAdd = async (item: WishlistItem, wishlistId: string) => {
    setIsLoading(true);
    
    try {
      await addItemToWishlist(wishlistId, item);
      
      if (selectedWishlistId) {
        navigate(`/wishlists/${wishlistId}`);
      } else {
        setIsAddModalOpen(false);
        setSelectedItem(null);
      }
    } catch (error) {
      console.error('Failed to add item to wishlist:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="py-8">
      <div className="flex flex-col mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Рекомендации
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Найдите интересные товары для ваших списков желаний
        </p>
        
        {selectedWishlistId && (
          <div className="mt-4 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-md text-purple-800 dark:text-purple-200 flex items-center justify-between">
            <span>
              Добавление товаров в список:{' '}
              <strong>{wishlists.find(w => w.id === selectedWishlistId)?.name}</strong>
            </span>
            <Button
              variant="outline"
              size="sm"
              className="text-purple-700 dark:text-purple-300 border-purple-300 dark:border-purple-700"
              onClick={() => navigate(`/wishlists/${selectedWishlistId}`)}
            >
              Перейти к списку <ArrowRight size={16} className="ml-1" />
            </Button>
          </div>
        )}
        
        <div className="flex flex-col md:flex-row gap-4 mt-6">
          <div className="flex-grow">
            <Input
              placeholder="Поиск товаров..."
              value={filterState.search}
              onChange={handleSearch}
              icon={<Search size={18} />}
            />
          </div>
          
          <div className="flex gap-2">
            <div className="relative">
              <Button
                variant="outline"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center"
              >
                <Filter size={16} className="mr-2" />
                Фильтры
                <ChevronDown size={16} className="ml-2" />
              </Button>
              
              {isFilterOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 border border-gray-200 dark:border-gray-700">
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium text-gray-900 dark:text-white">Категории</h3>
                      <button
                        onClick={handleResetFilters}
                        className="text-sm text-purple-600 dark:text-purple-400 hover:underline"
                      >
                        Сбросить
                      </button>
                    </div>
                    
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {categories.map(category => (
                        <label key={category} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={filterState.categories.includes(category)}
                            onChange={() => handleCategoryToggle(category)}
                            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                          />
                          <span className="ml-2 text-gray-700 dark:text-gray-300 text-sm">{category}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="relative group">
              <Button
                variant="outline"
                className="flex items-center"
              >
                {filterState.sortBy.includes('price') ? (
                  <span>По цене</span>
                ) : (
                  <span>По названию</span>
                )}
                <ChevronDown size={16} className="ml-2" />
              </Button>
              
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 border border-gray-200 dark:border-gray-700 hidden group-hover:block">
                <div className="py-1">
                  <button
                    onClick={() => handleSortChange('nameAsc')}
                    className={`flex items-center w-full text-left px-4 py-2 text-sm ${
                      filterState.sortBy === 'nameAsc'
                        ? 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <SortAsc size={16} className="mr-2" /> По названию (А-Я)
                  </button>
                  <button
                    onClick={() => handleSortChange('nameDesc')}
                    className={`flex items-center w-full text-left px-4 py-2 text-sm ${
                      filterState.sortBy === 'nameDesc'
                        ? 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <SortDesc size={16} className="mr-2" /> По названию (Я-А)
                  </button>
                  <button
                    onClick={() => handleSortChange('priceAsc')}
                    className={`flex items-center w-full text-left px-4 py-2 text-sm ${
                      filterState.sortBy === 'priceAsc'
                        ? 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <SortAsc size={16} className="mr-2" /> По цене (возр.)
                  </button>
                  <button
                    onClick={() => handleSortChange('priceDesc')}
                    className={`flex items-center w-full text-left px-4 py-2 text-sm ${
                      filterState.sortBy === 'priceDesc'
                        ? 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <SortDesc size={16} className="mr-2" /> По цене (убыв.)
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {filteredItems.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Ничего не найдено
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Попробуйте изменить параметры поиска или фильтры
          </p>
          <Button 
            variant="outline" 
            onClick={handleResetFilters}
          >
            Сбросить все фильтры
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              onAdd={() => handleAddItem(item)}
              showActions
              isRecommendation
            />
          ))}
        </div>
      )}
      
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setSelectedItem(null);
        }}
        title="Добавить в список желаний"
      >
        {selectedItem && (
          <div className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300">
              Выберите список, в который хотите добавить{' '}
              <span className="font-semibold">{selectedItem.name}</span>:
            </p>
            
            {wishlists.length === 0 ? (
              <div className="text-center py-4">
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  У вас пока нет списков желаний. Создайте свой первый список.
                </p>
                <Button 
                  variant="primary" 
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setSelectedItem(null);
                    navigate('/wishlists');
                  }}
                >
                  Создать список
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                {wishlists.map(wishlist => (
                  <button
                    key={wishlist.id}
                    onClick={() => handleConfirmAdd(selectedItem, wishlist.id)}
                    className="w-full text-left p-3 rounded-md border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
                  >
                    <div className="font-medium text-gray-900 dark:text-white">
                      {wishlist.name}
                    </div>
                    {wishlist.description && (
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-1">
                        {wishlist.description}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Recommendations;