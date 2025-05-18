import React from 'react';
import { Navigate } from 'react-router-dom';
import Card, { CardHeader, CardBody } from '../../components/ui/Card';
import ProfileForm from '../../components/auth/ProfileForm';
import { useAuth } from '../../contexts/AuthContext';

const EditProfile: React.FC = () => {
  const { authState } = useAuth();
  
  if (!authState.isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Редактирование профиля
      </h1>
      
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Личная информация
          </h2>
        </CardHeader>
        <CardBody>
          <ProfileForm isEdit />
        </CardBody>
      </Card>
    </div>
  );
};

export default EditProfile;