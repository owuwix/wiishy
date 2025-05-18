import React from 'react';
import { Link } from 'react-router-dom';
import { Gift, ShoppingBag, Heart, Star, UserPlus, LogIn } from 'lucide-react';
import Button from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';

const Home: React.FC = () => {
  const { authState } = useAuth();
  
  return (
    <div className="space-y-16 py-8">
      <section className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900 dark:text-white mb-6">
            Создавайте списки желаний легко с
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500 dark:from-purple-400 dark:to-pink-400 ml-2">
              Wiishy
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Собирайте все ваши желания в одном месте и делитесь ими с друзьями и близкими.
            Никаких больше неудачных подарков!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {authState.isAuthenticated ? (
              <Link to="/wishlists">
                <Button variant="primary" size="lg" icon={<ShoppingBag size={20} />}>
                  Мои списки желаний
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/register">
                  <Button variant="primary" size="lg" icon={<UserPlus size={20} />}>
                    Зарегистрироваться
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="lg" icon={<LogIn size={20} />}>
                    Войти
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50 dark:bg-gray-900 rounded-2xl">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Почему стоит выбрать Wiishy?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm transition-transform duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
                <Gift size={28} className="text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Удобные списки желаний</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Создавайте и организуйте списки желаний для любого случая — дни рождения, свадьбы, праздники.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm transition-transform duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                <Heart size={28} className="text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Делитесь с близкими</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Поделитесь своими списками с друзьями и семьей, чтобы они всегда знали, что вам подарить.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm transition-transform duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center mb-4">
                <Star size={28} className="text-pink-600 dark:text-pink-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Персональные рекомендации</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Получайте рекомендации на основе ваших интересов и предпочтений для вдохновения.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Как это работает?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-purple-600 dark:bg-purple-500 text-white flex items-center justify-center text-xl font-bold mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Создайте аккаунт</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Зарегистрируйтесь на платформе и заполните свой профиль, чтобы получать персонализированные рекомендации.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-purple-600 dark:bg-purple-500 text-white flex items-center justify-center text-xl font-bold mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Создайте списки желаний</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Создавайте списки для разных случаев и добавляйте в них товары из наших рекомендаций или собственные идеи.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-purple-600 dark:bg-purple-500 text-white flex items-center justify-center text-xl font-bold mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Поделитесь с друзьями</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Отправьте списки друзьям и родным, чтобы они всегда знали, что подарить вам на особые случаи.
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            {!authState.isAuthenticated && (
              <Link to="/register">
                <Button variant="primary" size="lg">
                  Начать сейчас
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>
      
      <section className="py-12 bg-gray-50 dark:bg-gray-900 rounded-2xl">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Отзывы пользователей
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-800 flex items-center justify-center">
                  <span className="text-purple-600 dark:text-purple-300 font-semibold">АК</span>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Анна К.</h4>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                "Благодаря Wiishy мои друзья теперь всегда знают, что мне подарить. Больше никаких неловких моментов и ненужных подарков!"
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-300 font-semibold">ИС</span>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Иван С.</h4>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                "Отличная платформа! Очень удобно создавать списки желаний и делиться ими. Рекомендации помогают найти интересные идеи."
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-pink-100 dark:bg-pink-800 flex items-center justify-center">
                  <span className="text-pink-600 dark:text-pink-300 font-semibold">ЕВ</span>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Елена В.</h4>
                  <div className="flex text-yellow-400">
                    {[...Array(4)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                    <Star size={16} />
                  </div>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                "Использую Wiishy для планирования подарков на праздники. Простой и понятный интерфейс, множество категорий товаров."
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
            Готовы создать свой первый список желаний?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Присоединяйтесь к Wiishy сегодня и начните собирать ваши желания в одном месте.
          </p>
          {!authState.isAuthenticated ? (
            <Link to="/register">
              <Button variant="primary" size="lg">
                Зарегистрироваться бесплатно
              </Button>
            </Link>
          ) : (
            <Link to="/wishlists">
              <Button variant="primary" size="lg">
                Мои списки желаний
              </Button>
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;