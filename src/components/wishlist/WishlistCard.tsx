import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Unlock, Edit, Trash2, PlusCircle } from 'lucide-react';
import Card, { CardBody, CardFooter } from '../ui/Card';
import Button from '../ui/Button';
import { Wishlist } from '../../types';
import { useWishlists } from '../../contexts/WishlistContext';

interface WishlistCardProps {
  wishlist: Wishlist;
  onEdit: () => void;
  onDelete: () => void;
}

const WishlistCard: React.FC<WishlistCardProps> = ({ wishlist, onEdit, onDelete }) => {
  const navigate = useNavigate();
  const { addItemToWishlist } = useWishlists();
  
  const handleClick = () => {
    navigate(`/wishlists/${wishlist.id}`);
  };
  
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete();
  };
  
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit();
  };
  
  const handleAddItem = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/recommendations?wishlistId=${wishlist.id}`);
  };
  
  return (
    <Card 
      hoverable
      className="border border-gray-200 dark:border-gray-700 h-full flex flex-col transform transition-all duration-200 hover:scale-[1.02]"
    >
      <div className="p-6 cursor-pointer flex-grow" onClick={handleClick}>
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
            {wishlist.name}
          </h3>
          <span className="inline-flex items-center text-gray-500 dark:text-gray-400">
            {wishlist.isPublic ? (
              <Unlock size={16} className="text-green-500" />
            ) : (
              <Lock size={16} className="text-blue-500" />
            )}
          </span>
        </div>
        
        {wishlist.description && (
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
            {wishlist.description}
          </p>
        )}
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
            <span>Элементов:</span>
            <span className="font-medium">{wishlist.items.length}</span>
          </div>
          
          <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
            <span>Создан:</span>
            <span className="font-medium">
              {new Date(wishlist.createdAt).toLocaleDateString('ru-RU')}
            </span>
          </div>
          
          <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
            <span>Статус:</span>
            <span className={`font-medium ${wishlist.isPublic ? 'text-green-500' : 'text-blue-500'}`}>
              {wishlist.isPublic ? 'Публичный' : 'Приватный'}
            </span>
          </div>
        </div>
      </div>
      
      <CardFooter className="flex justify-between pt-2 pb-2 bg-gray-50 dark:bg-gray-800/50">
        <div className="flex space-x-1">
          <Button 
            variant="ghost" 
            size="sm" 
            icon={<Edit size={16} />}
            onClick={handleEdit}
            aria-label="Редактировать список желаний"
          />
          <Button 
            variant="ghost" 
            size="sm" 
            icon={<Trash2 size={16} />}
            onClick={handleDelete}
            className="text-red-500 hover:text-red-600"
            aria-label="Удалить список желаний"
          />
        </div>
        <Button 
          variant="primary" 
          size="sm" 
          icon={<PlusCircle size={16} />}
          onClick={handleAddItem}
          aria-label="Добавить элемент"
        >
          Добавить
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WishlistCard;