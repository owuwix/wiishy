import React, { useState, useEffect } from 'react';
import { categories } from '../../data/mockData';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { WishlistItem } from '../../types';

interface ItemFormProps {
  initialData?: Partial<WishlistItem>;
  onSubmit: (data: Partial<WishlistItem>) => void;
  isLoading?: boolean;
}

const ItemForm: React.FC<ItemFormProps> = ({ 
  initialData, 
  onSubmit, 
  isLoading = false 
}) => {
  const [formData, setFormData] = useState<Partial<WishlistItem>>({
    name: initialData?.name || '',
    description: initialData?.description || '',
    category: initialData?.category || categories[0],
    price: initialData?.price,
    imageUrl: initialData?.imageUrl || '',
  });
  
  const [errors, setErrors] = useState({
    name: '',
    category: '',
    price: '',
    imageUrl: '',
  });
  
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        description: initialData.description || '',
        category: initialData.category || categories[0],
        price: initialData.price,
        imageUrl: initialData.imageUrl || '',
      });
    }
  }, [initialData]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    if (value === '') {
      setFormData(prev => ({ ...prev, price: undefined }));
    } else {
      const price = parseFloat(value);
      setFormData(prev => ({ ...prev, price: isNaN(price) ? 0 : price }));
    }
    
    if (errors.price) {
      setErrors(prev => ({ ...prev, price: '' }));
    }
  };
  
  const validate = (): boolean => {
    const newErrors = { 
      name: '',
      category: '',
      price: '',
      imageUrl: '',
    };
    let isValid = true;
    
    if (!formData.name?.trim()) {
      newErrors.name = 'Название элемента обязательно';
      isValid = false;
    }
    
    if (!formData.category) {
      newErrors.category = 'Категория обязательна';
      isValid = false;
    }
    
    if (formData.price !== undefined && formData.price < 0) {
      newErrors.price = 'Цена не может быть отрицательной';
      isValid = false;
    }
    
    if (formData.imageUrl && !/^https?:\/\/.+/.test(formData.imageUrl)) {
      newErrors.imageUrl = 'Некорректный URL изображения';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      onSubmit(formData);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          label="Название элемента"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Например: Смартфон iPhone 14"
          error={errors.name}
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Категория
        </label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="block w-full rounded-md shadow-sm border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          required
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.category}
          </p>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Описание (необязательно)
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Опишите желаемый элемент..."
          className="block w-full rounded-md shadow-sm border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50 dark:bg-gray-800 dark:border-gray-700 dark:text-white min-h-[100px]"
        />
      </div>
      
      <div>
        <Input
          label="Цена (BYN, необязательно)"
          name="price"
          type="number"
          step="0.01"
          value={formData.price !== undefined ? formData.price.toString() : ''}
          onChange={handlePriceChange}
          placeholder="0.00"
          error={errors.price}
        />
      </div>
      
      <div>
        <Input
          label="URL изображения (необязательно)"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
          error={errors.imageUrl}
        />
      </div>
      
      {formData.imageUrl && (
        <div className="border rounded-md p-2 bg-gray-50 dark:bg-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Предпросмотр изображения:</p>
          <img 
            src={formData.imageUrl} 
            alt="Предпросмотр" 
            className="max-h-40 object-contain mx-auto rounded"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=Ошибка+загрузки';
              setErrors(prev => ({ ...prev, imageUrl: 'Не удалось загрузить изображение' }));
            }}
          />
        </div>
      )}
      
      <div className="flex justify-end space-x-3 pt-2">
        <Button 
          type="submit" 
          variant="primary"
          isLoading={isLoading}
        >
          {initialData?.id ? 'Сохранить изменения' : 'Добавить элемент'}
        </Button>
      </div>
    </form>
  );
};

export default ItemForm;