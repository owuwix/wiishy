import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../../types';
import { countries, categories } from '../../data/mockData';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { useAuth } from '../../contexts/AuthContext';

interface ProfileFormProps {
  isEdit?: boolean;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ isEdit = false }) => {
  const navigate = useNavigate();
  const { authState, updateProfile } = useAuth();
  
  const [formData, setFormData] = useState<Partial<User>>({
    gender: 'other',
    country: '',
    birthDate: '',
    interests: [],
  });
  
  const [errors, setErrors] = useState({
    country: '',
    birthDate: '',
    form: '',
  });
  
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    if (isEdit && authState.user) {
      setFormData({
        gender: authState.user.gender,
        country: authState.user.country,
        birthDate: authState.user.birthDate,
        interests: authState.user.interests,
      });
    }
  }, [isEdit, authState.user]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const handleInterestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target;
    
    if (checked) {
      setFormData(prev => ({
        ...prev,
        interests: [...(prev.interests || []), value]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        interests: (prev.interests || []).filter(interest => interest !== value)
      }));
    }
  };
  
  const validate = (): boolean => {
    const newErrors = {
      country: '',
      birthDate: '',
      form: '',
    };
    let isValid = true;
    
    if (!formData.country) {
      newErrors.country = 'Выберите страну';
      isValid = false;
    }
    
    if (!formData.birthDate) {
      newErrors.birthDate = 'Укажите дату рождения';
      isValid = false;
    } else {
      const birthDate = new Date(formData.birthDate);
      const now = new Date();
      const minAge = new Date();
      minAge.setFullYear(now.getFullYear() - 13); // Minimum age 13
      
      if (birthDate > now) {
        newErrors.birthDate = 'Дата рождения не может быть в будущем';
        isValid = false;
      } else if (birthDate > minAge) {
        newErrors.birthDate = 'Минимальный возраст - 13 лет';
        isValid = false;
      }
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsLoading(true);
    setErrors(prev => ({ ...prev, form: '' }));
    
    try {
      await updateProfile(formData);
      navigate('/wishlists');
    } catch (error) {
      setErrors(prev => ({ 
        ...prev, 
        form: error instanceof Error ? error.message : 'Произошла ошибка при обновлении профиля' 
      }));
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.form && (
        <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-md text-sm">
          {errors.form}
        </div>
      )}
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Пол
        </label>
        <div className="flex gap-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="gender"
              value="male"
              checked={formData.gender === 'male'}
              onChange={handleChange}
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
            />
            <span className="ml-2 text-gray-700 dark:text-gray-300">Мужской</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="gender"
              value="female"
              checked={formData.gender === 'female'}
              onChange={handleChange}
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
            />
            <span className="ml-2 text-gray-700 dark:text-gray-300">Женский</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="gender"
              value="other"
              checked={formData.gender === 'other'}
              onChange={handleChange}
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
            />
            <span className="ml-2 text-gray-700 dark:text-gray-300">Другое</span>
          </label>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Страна
        </label>
        <select
          name="country"
          value={formData.country}
          onChange={handleChange}
          className="block w-full rounded-md shadow-sm border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          required
        >
          <option value="">Выберите страну</option>
          {countries.map(country => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        {errors.country && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.country}
          </p>
        )}
      </div>
      
      <div>
        <Input
          label="Дата рождения"
          name="birthDate"
          type="date"
          value={formData.birthDate}
          onChange={handleChange}
          error={errors.birthDate}
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Интересы
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-3 border border-gray-200 dark:border-gray-700 rounded-md">
          {categories.map(category => (
            <label key={category} className="inline-flex items-center">
              <input
                type="checkbox"
                name="interests"
                value={category}
                checked={(formData.interests || []).includes(category)}
                onChange={handleInterestChange}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{category}</span>
            </label>
          ))}
        </div>
      </div>
      
      <div className="pt-2">
        <Button 
          type="submit" 
          variant="primary" 
          fullWidth 
          isLoading={isLoading}
        >
          {isEdit ? 'Сохранить изменения' : 'Сохранить профиль'}
        </Button>
      </div>
    </form>
  );
};

export default ProfileForm;