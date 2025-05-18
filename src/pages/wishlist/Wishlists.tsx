import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import WishlistCard from '../../components/wishlist/WishlistCard';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import WishlistForm from '../../components/wishlist/WishlistForm';
import { useAuth } from '../../contexts/AuthContext';
import { useWishlists } from '../../contexts/WishlistContext';
import { Wishlist } from '../../types';

const Wishlists: React.FC = () => {
  const { authState } = useAuth();
  const { wishlists, createWishlist, updateWishlist, deleteWishlist } = useWishlists();
  
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedWishlist, setSelectedWishlist] = useState<Wishlist | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  if (!authState.isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  const handleCreate = async (data: { name: string; description: string; isPublic: boolean }) => {
    setIsLoading(true);
    
    try {
      await createWishlist(data.name, data.description, data.isPublic);
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error('Failed to create wishlist:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleUpdate = async (data: { name: string; description: string; isPublic: boolean }) => {
    if (!selectedWishlist) return;
    
    setIsLoading(true);
    
    try {
      await updateWishlist(selectedWishlist.id, data);
      setIsEditModalOpen(false);
      setSelectedWishlist(null);
    } catch (error) {
      console.error('Failed to update wishlist:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDelete = async () => {
    if (!selectedWishlist) return;
    
    setIsLoading(true);
    
    try {
      await deleteWishlist(selectedWishlist.id);
      setIsDeleteModalOpen(false);
      setSelectedWishlist(null);
    } catch (error) {
      console.error('Failed to delete wishlist:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const openEditModal = (wishlist: Wishlist) => {
    setSelectedWishlist(wishlist);
    setIsEditModalOpen(true);
  };
  
  const openDeleteModal = (wishlist: Wishlist) => {
    setSelectedWishlist(wishlist);
    setIsDeleteModalOpen(true);
  };
  
  return (
    <div className="py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Мои списки желаний
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Управляйте своими списками желаний и добавляйте новые предметы
          </p>
        </div>
        
        <Button 
          variant="primary" 
          icon={<Plus size={18} />}
          onClick={() => setIsCreateModalOpen(true)}
        >
          Создать список
        </Button>
      </div>
      
      {wishlists.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            У вас пока нет списков желаний
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Создайте свой первый список желаний и начните добавлять в него предметы.
          </p>
          <Button 
            variant="primary" 
            icon={<Plus size={18} />}
            onClick={() => setIsCreateModalOpen(true)}
          >
            Создать список
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlists.map((wishlist) => (
            <WishlistCard
              key={wishlist.id}
              wishlist={wishlist}
              onEdit={() => openEditModal(wishlist)}
              onDelete={() => openDeleteModal(wishlist)}
            />
          ))}
        </div>
      )}
      
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Создать список желаний"
      >
        <WishlistForm
          onSubmit={handleCreate}
          isLoading={isLoading}
        />
      </Modal>
      
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedWishlist(null);
        }}
        title="Редактировать список желаний"
      >
        {selectedWishlist && (
          <WishlistForm
            initialData={selectedWishlist}
            onSubmit={handleUpdate}
            isLoading={isLoading}
          />
        )}
      </Modal>
      
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedWishlist(null);
        }}
        title="Удалить список желаний"
        footer={
          <>
            <Button
              variant="outline"
              onClick={() => {
                setIsDeleteModalOpen(false);
                setSelectedWishlist(null);
              }}
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
          <span className="font-semibold">{selectedWishlist?.name}</span>?
        </p>
        <p className="text-gray-700 dark:text-gray-300 mt-2">
          Это действие нельзя отменить. Все элементы в списке также будут удалены.
        </p>
      </Modal>
    </div>
  );
};

export default Wishlists;