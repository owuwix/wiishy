import React, { useState, useEffect } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { Wishlist } from '../../types';

interface WishlistFormProps {
  initialData?: Partial<Wishlist>;
  onSubmit: (data: { name: string; description: string; isPublic: boolean }) => void;
  isLoading?: boolean;
}

const WishlistForm: React.FC<WishlistFormProps> = ({ 
  initialData, 
  onSubmit, 
  isLoading = false 
}) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    isPublic: initialData?.isPublic !== undefined ? initialData.isPublic : true,
  });
  
  const [errors, setErrors] = useState({
    name: '',
  });
  
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        description: initialData.description || '',
        isPublic: initialData.isPublic !== undefined ? initialData.isPublic : true,
      });
    }
  }, [initialData]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const handleToggleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };
  
  const validate = (): boolean => {
    const newErrors = { name: '' };
    let isValid = true;
    
    if (!formData.name.trim()) {
      newErrors.name = 'Название списка обязательно';
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
          label="Название списка"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Например: День рождения"
          error={errors.name}
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Описание (необязательно)
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Опишите ваш список желаний..."
          className="block w-full rounded-md shadow-sm border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50 dark:bg-gray-800 dark:border-gray-700 dark:text-white min-h-[100px]"
        />
      </div>
      
      <div className="flex items-center">
        <input
          type="checkbox"
          id="isPublic"
          name="isPublic"
          checked={formData.isPublic}
          onChange={handleToggleChange}
          className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
        />
        <label htmlFor="isPublic" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
          Публичный список (виден всем)
        </label>
      </div>
      
      <div className="flex justify-end space-x-3 pt-2">
        <Button 
          type="submit" 
          variant="primary"
          isLoading={isLoading}
        >
          {initialData?.id ? 'Сохранить изменения' : 'Создать список'}
        </Button>
      </div>
    </form>
  );
};

export default WishlistForm;