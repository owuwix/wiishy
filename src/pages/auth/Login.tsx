import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../../components/auth/LoginForm';

const Login: React.FC = () => {
  return (
    <div className="max-w-md mx-auto py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Вход</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Войдите в ваш аккаунт для доступа к спискам желаний
          </p>
        </div>
        
        <LoginForm />
        
        <div className="mt-6 text-center text-gray-600 dark:text-gray-400">
          Нет аккаунта?{' '}
          <Link to="/register" className="text-purple-600 dark:text-purple-400 hover:underline">
            Зарегистрироваться
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;