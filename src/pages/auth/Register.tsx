import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '../../components/auth/RegisterForm';

const Register: React.FC = () => {
  return (
    <div className="max-w-md mx-auto py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Регистрация</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Создайте аккаунт для управления списками желаний
          </p>
        </div>
        
        <RegisterForm />
        
        <div className="mt-6 text-center text-gray-600 dark:text-gray-400">
          Уже есть аккаунт?{' '}
          <Link to="/login" className="text-purple-600 dark:text-purple-400 hover:underline">
            Войти
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;