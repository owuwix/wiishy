import React, { useState, useEffect } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, Lock, Unlock, Plus, AlertCircle } from 'lucide-react';
import Button from '../../components/ui/Button';
import ItemCard from '../../components/wishlist/ItemCard';
import Modal from '../../components/ui/Modal';
import WishlistForm from '../../components/wishlist/WishlistForm';
import ItemForm from '../../components/wishlist/ItemForm';
import { useAuth } from '../../contexts/AuthContext';
import { useWishlists } from '../../contexts/WishlistContext';
import { Wishlist, WishlistItem } from '../../types';

const WishlistDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { authState } = useAuth();
  const { wishlists, updateWishlist, deleteWishlist, addItemToWishlist, removeItemFromWishlist } = useWishlists();
  
  const [wishlist, setWishlist] = useState<Wishlist | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [isEditItemModalOpen, setIsEditItemModalOpen] = useState(false);
  const [isDeleteItemModalOpen, setIsDeleteItemModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<WishlistItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    if (id) {
      const foundWishlist = wishlists.find(list => list.id === id);
      setWishlist(foundWishlist || null);
    }
  }, [id, wishlists]);
  
  if (!authState.isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (!wishlist && !isLoading) {
    return (
      <div className="py-8 text-center">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Список желаний не найден
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Запрошенный список желаний не существует или был удален.
          </p>
          <Button 
            variant="primary" 
            onClick={() => navigate('/wishlists')}
          >
            Вернуться к спискам
          </Button>
        </div>
      </div>
    );
  }
  
  const handleUpdate = async (data: { name: string; description: string; isPublic: boolean }) => {
    if (!wishlist) return;
    
    setIsLoading(true);
    
    try {
      await updateWishlist(wishlist.id, data);
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Failed to update wishlist:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDelete = async () => {
    if (!wishlist) return;
    
    setIsLoading(true);
    
    try {
      await deleteWishlist(wishlist.id);
      setIsDeleteModalOpen(false);
      navigate('/wishlists');
    } catch (error) {
      console.error('Failed to delete wishlist:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleAddItem = async (data: Partial<WishlistItem>) => {
    if (!wishlist) return;
    
    setIsLoading(true);
    
    try {
      const newItem: WishlistItem = {
        id: `item-${Date.now()}`,
        name: data.name || '',
        description: data.description,
        category: data.category || '',
        price: data.price,
        imageUrl: data.imageUrl,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      await addItemToWishlist(wishlist.id, newItem);
      setIsAddItemModalOpen(false);
    } catch (error) {
      console.error('Failed to add item:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleUpdateItem = async (data: Partial<WishlistItem>) => {
    if (!wishlist || !selectedItem) return;
    
    setIsLoading(true);
    
    try {
      await removeItemFromWishlist(wishlist.id, selectedItem.id);
      
      const updatedItem: WishlistItem = {
        ...selectedItem,
        ...data,
        updatedAt: new Date().toISOString(),
      };
      
      await addItemToWishlist(wishlist.id, updatedItem);
      setIsEditItemModalOpen(false);
      setSelectedItem(null);
    } catch (error) {
      console.error('Failed to update item:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDeleteItem = async () => {
    if (!wishlist || !selectedItem) return;
    
    setIsLoading(true);
    
    try {
      await removeItemFromWishlist(wishlist.id, selectedItem.id);
      setIsDeleteItemModalOpen(false);
      setSelectedItem(null);
    } catch (error) {
      console.error('Failed to delete item:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const openEditItemModal = (item: WishlistItem) => {
    setSelectedItem(item);
    setIsEditItemModalOpen(true);
  };
  
  const openDeleteItemModal = (item: WishlistItem) => {
    setSelectedItem(item);
    setIsDeleteItemModalOpen(true);
  };
  
  return (
    <div className="py-8">
      <div className="mb-8">
        <button
          onClick={() => navigate('/wishlists')}
          className="flex items-center text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors mb-4"
        >
          <ArrowLeft size={16} className="mr-1" /> Назад к спискам
        </button>
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mr-2">
                {wishlist?.name}
              </h1>
              {wishlist?.isPublic ? (
                <Unlock size={18} className="text-green-500" title="Публичный список" />
              ) : (
                <Lock size={18} className="text-blue-500" title="Приватный список" />
              )}
            </div>
            {wishlist?.description && (
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {wishlist.description}
              </p>
            )}
          </div>
          
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              icon={<Edit size={16} />}
              onClick={() => setIsEditModalOpen(true)}
            >
              Редактировать
            </Button>
            <Button 
              variant="danger" 
              icon={<Trash2 size={16} />}
              onClick={() => setIsDeleteModalOpen(true)}
            >
              Удалить
            </Button>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Элементы списка
          </h2>
          <Button 
            variant="primary" 
            icon={<Plus size={16} />}
            onClick={() => setIsAddItemModalOpen(true)}
          >
            Добавить элемент
          </Button>
        </div>
        
        {wishlist?.items.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              В этом списке пока нет элементов
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Добавьте свой первый элемент в список или выберите из рекомендаций.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                variant="primary" 
                icon={<Plus size={16} />}
                onClick={() => setIsAddItemModalOpen(true)}
              >
                Добавить вручную
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate(`/recommendations?wishlistId=${wishlist?.id}`)}
              >
                Выбрать из рекомендаций
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist?.items.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                onEdit={() => openEditItemModal(item)}
                onDelete={() => openDeleteItemModal(item)}
                showActions
                isRecommendation={false}
              />
            ))}
          </div>
        )}
      </div>
      
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Редактировать список желаний"
      >
        {wishlist && (
          <WishlistForm
            initialData={wishlist}
            onSubmit={handleUpdate}
            isLoading={isLoading}
          />
        )}
      </Modal>
      
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Удалить список желаний"
        footer={
          <>
            <Button
              variant="outline"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Отмена
            </Button>
            <Button
              variant="danger"
              onClick={handleDelete}
              isLoading={isLoading}
            >
              Удалить
            </Button>
          </>
        }
      >
        <p className="text-gray-700 dark:text-gray-300">
          Вы уверены, что хотите удалить список желаний{' '}
          <span className="font-semibold">{wishlist?.name}</span>?
        </p>
        <p className="text-gray-700 dark:text-gray-300 mt-2">
          Это действие нельзя отменить. Все элементы в списке также будут удалены.
        </p>
      </Modal>
      
      <Modal
        isOpen={isAddItemModalOpen}
        onClose={() => setIsAddItemModalOpen(false)}
        title="Добавить элемент"
      >
        <ItemForm
          onSubmit={handleAddItem}
          isLoading={isLoading}
        />
      </Modal>
      
      <Modal
        isOpen={isEditItemModalOpen}
        onClose={() => {
          setIsEditItemModalOpen(false);
          setSelectedItem(null);
        }}
        title="Редактировать элемент"
      >
        {selectedItem && (
          <ItemForm
            initialData={selectedItem}
            onSubmit={handleUpdateItem}
            isLoading={isLoading}
          />
        )}
      </Modal>
      
      <Modal
        isOpen={isDeleteItemModalOpen}
        onClose={() => {
          setIsDeleteItemModalOpen(false);
          setSelectedItem(null);
        }}
        title="Удалить элемент"
        footer={
          <>
            <Button
              variant="outline"
              onClick={() => {
                setIsDeleteItemModalOpen(false);
                setSelectedItem(null);
              }}
            >
              Отмена
            </Button>
            <Button
              variant="danger"
              onClick={handleDeleteItem}
              isLoading={isLoading}
            >
              Удалить
            </Button>
          </>
        }
      >
        <p className="text-gray-700 dark:text-gray-300">
          Вы уверены, что хотите удалить элемент{' '}
          <span className="font-semibold">{selectedItem?.name}</span> из списка желаний?
        </p>
      </Modal>
    </div>
  );
};

export default WishlistDetail;