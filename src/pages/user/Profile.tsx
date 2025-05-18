import React from 'react';
import { Navigate } from 'react-router-dom';
import { User, Mail, MapPin, Calendar, Tag } from 'lucide-react';
import Card, { CardBody } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

const Profile: React.FC = () => {
  const { authState } = useAuth();
  
  if (!authState.isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  const { user } = authState;
  
  if (!user) {
    return <div className="text-center py-8">Loading...</div>;
  }
  
  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Профиль пользователя
      </h1>
      
      <Card>
        <CardBody>
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <div className="w-24 h-24 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400">
                <User size={40} />
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {user.username}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Участник с {new Date(user.createdAt).toLocaleDateString('ru-RU')}
                </p>
              </div>
              
              <div className="sm:ml-auto">
                <Link to="/profile/edit">
                  <Button variant="outline">
                    Редактировать профиль
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Личная информация
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <User className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                  <span className="text-gray-600 dark:text-gray-400 mr-2">Пол:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {user.gender === 'male'
                      ? 'Мужской'
                      : user.gender === 'female'
                      ? 'Женский'
                      : 'Другое'}
                  </span>
                </div>
                
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                  <span className="text-gray-600 dark:text-gray-400 mr-2">Страна:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {user.country}
                  </span>
                </div>
                
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                  <span className="text-gray-600 dark:text-gray-400 mr-2">Дата рождения:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {new Date(user.birthDate).toLocaleDateString('ru-RU')}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Интересы
              </h3>
              
              <div className="flex flex-wrap gap-2">
                {user.interests && user.interests.length > 0 ? (
                  user.interests.map((interest) => (
                    <span
                      key={interest}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
                    >
                      <Tag className="h-4 w-4 mr-1" />
                      {interest}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">
                    Интересы не указаны
                  </p>
                )}
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Profile;