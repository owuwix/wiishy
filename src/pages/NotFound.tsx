import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Home, ArrowRight, MessageCircle, Compass } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAuth } from '../contexts/AuthContext';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const { authState } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/recommendations?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const popularPages = [
    { title: 'Популярные подарки', path: '/recommendations' },
    { title: 'Категории подарков', path: '/recommendations?categories=Электроника,Книги' },
    { title: 'Создать список желаний', path: '/wishlists' },
  ];

  const recommendedContent = [
    {
      title: 'Как создать идеальный список желаний',
      description: 'Советы по организации и оформлению вашего списка желаний',
      path: '/recommendations',
    },
    {
      title: 'Топ-10 подарков на день рождения',
      description: 'Самые популярные идеи подарков для особого случая',
      path: '/recommendations?categories=Подарки',
    },
    {
      title: 'Подарки для близких',
      description: 'Идеи подарков для семьи и друзей',
      path: '/recommendations?categories=Подарки',
    },
  ];

  return (
    <div className="min-h-[80vh] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-6xl md:text-8xl font-bold text-purple-600 dark:text-purple-400 mb-6">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mb-4">
            Страница не найдена
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
            К сожалению, запрашиваемая страница не существует или была перемещена.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link to="/">
              <Button variant="primary" size="lg" icon={<Home size={20} />}>
                Вернуться на главную
              </Button>
            </Link>
            <a href="mailto:support@wiishy.com">
              <Button variant="outline" size="lg" icon={<MessageCircle size={20} />}>
                Связаться с поддержкой
              </Button>
            </a>
          </div>

          <div className="max-w-lg mx-auto mb-16">
            <form onSubmit={handleSearch} className="relative">
              <Input
                placeholder="Поиск по сайту..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={<Search size={18} />}
              />
            </form>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Популярные страницы
            </h3>
            <ul className="space-y-3">
              {popularPages.map((page, index) => (
                <li key={index}>
                  <Link
                    to={page.path}
                    className="flex items-center text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  >
                    <Compass size={16} className="mr-2" />
                    {page.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Рекомендуемый контент
            </h3>
            <div className="space-y-4">
              {recommendedContent.map((content, index) => (
                <Link
                  key={index}
                  to={content.path}
                  className="block group"
                >
                  <h4 className="text-gray-900 dark:text-white font-medium group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {content.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {content.description}
                  </p>
                  <span className="inline-flex items-center text-purple-600 dark:text-purple-400 text-sm mt-2">
                    Подробнее
                    <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {!authState.isAuthenticated && (
          <div className="text-center bg-purple-50 dark:bg-purple-900/20 rounded-lg p-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Присоединяйтесь к Wiishy
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Создавайте списки желаний, делитесь ими с друзьями и получайте персональные рекомендации
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/register">
                <Button variant="primary">
                  Зарегистрироваться
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline">
                  Войти
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotFound;