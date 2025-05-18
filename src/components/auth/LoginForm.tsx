import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { useAuth } from '../../contexts/AuthContext';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  
  const [errors, setErrors] = useState({
    username: '',
    password: '',
    form: '',
  });
  
  const [isLoading, setIsLoading] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const validate = (): boolean => {
    const newErrors = {
      username: '',
      password: '',
      form: '',
    };
    let isValid = true;
    
    if (!formData.username.trim()) {
      newErrors.username = 'Имя пользователя обязательно';
      isValid = false;
    }
    
    if (!formData.password) {
      newErrors.password = 'Пароль обязателен';
      isValid = false;
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
      await login(formData.username, formData.password);
      navigate('/wishlists');
    } catch (error) {
      setErrors(prev => ({ 
        ...prev, 
        form: error instanceof Error ? error.message : 'Произошла ошибка при входе' 
      }));
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errors.form && (
        <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-md text-sm">
          {errors.form}
        </div>
      )}
      
      <Input
        label="Имя пользователя"
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Ваше имя пользователя"
        icon={<User size={18} />}
        error={errors.username}
        required
      />
      
      <Input
        label="Пароль"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Введите пароль"
        icon={<Lock size={18} />}
        error={errors.password}
        required
      />
      
      <div className="pt-2">
        <Button 
          type="submit" 
          variant="primary" 
          fullWidth 
          isLoading={isLoading}
        >
          Войти
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;