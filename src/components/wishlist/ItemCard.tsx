import React from 'react';
import { Edit, Trash2, ShoppingCart } from 'lucide-react';
import Card, { CardBody, CardFooter } from '../ui/Card';
import Button from '../ui/Button';
import { WishlistItem } from '../../types';

interface ItemCardProps {
  item: WishlistItem;
  onEdit?: () => void;
  onDelete?: () => void;
  onAdd?: () => void;
  showActions?: boolean;
  isRecommendation?: boolean;
}

const ItemCard: React.FC<ItemCardProps> = ({ 
  item, 
  onEdit, 
  onDelete, 
  onAdd,
  showActions = true,
  isRecommendation = false
}) => {
  return (
    <Card 
      className="border border-gray-200 dark:border-gray-700 h-full flex flex-col"
      hoverable={isRecommendation}
      onClick={isRecommendation && onAdd ? onAdd : undefined}
    >
      {item.imageUrl && (
        <div className="relative w-full pt-[75%] overflow-hidden">
          <img 
            src={item.imageUrl} 
            alt={item.name}
            className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-2 right-2 bg-gray-100 dark:bg-gray-800 rounded-md px-2 py-1 text-xs font-medium text-gray-800 dark:text-gray-200">
            {item.category}
          </div>
        </div>
      )}
      
      <CardBody className="flex-grow">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {item.name}
        </h3>
        
        {item.description && (
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
            {item.description}
          </p>
        )}
        
        {item.price !== undefined && (
          <div className="mt-2 text-lg font-bold text-purple-600 dark:text-purple-400">
            {item.price.toFixed(2)} BYN
          </div>
        )}
      </CardBody>
      
      {showActions && (
        <CardFooter className="flex justify-between pt-2 pb-2 bg-gray-50 dark:bg-gray-800/50">
          {isRecommendation ? (
            <Button 
              variant="primary" 
              size="sm" 
              fullWidth
              icon={<ShoppingCart size={16} />}
              onClick={onAdd}
              aria-label="Добавить в список желаний"
            >
              Добавить в список
            </Button>
          ) : (
            <>
              <div className="flex space-x-1">
                {onEdit && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    icon={<Edit size={16} />}
                    onClick={onEdit}
                    aria-label="Редактировать элемент"
                  />
                )}
                {onDelete && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    icon={<Trash2 size={16} />}
                    onClick={onDelete}
                    className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-500"
                    aria-label="Удалить элемент"
                  />
                )}
              </div>
            </>
          )}
        </CardFooter>
      )}
    </Card>
  );
};

export default ItemCard;