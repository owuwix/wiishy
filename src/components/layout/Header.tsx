import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sun, Moon, Menu, X, User, LogOut } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { authState, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-sm transition-colors duration-200">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link 
          to="/" 
          className="text-2xl font-bold text-purple-600 dark:text-purple-400 flex items-center"
        >
          <span className="mr-2"><svg width="32" height="34" viewBox="0 0 32 34" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="31.5311" height="6.75666" transform="matrix(-1 0 0 1 31.7655 27.0267)" fill="#A85BEE"/>
<rect width="31.5311" height="6.75666" transform="matrix(-0.996195 -0.0871557 -0.0871557 0.996195 32 21.6569)" fill="#BE84F2"/>
<rect width="31.5311" height="6.75666" transform="matrix(-0.996195 0.0871557 0.0871557 0.996195 31.4111 12.1521)" fill="#D3ADF6"/>
<rect width="31.5311" height="6.75666" transform="matrix(-0.996195 -0.0871557 -0.0871557 0.996195 32 8.1436)" fill="#E9D6FA"/>
<path d="M13.9977 4.59012C13.9977 5.48192 14.7207 6.20487 15.6125 6.20487H16.3876C17.2793 6.20487 18.0023 5.48192 18.0023 4.59012V3.71833C18.0023 2.82662 17.2793 2.10362 16.3876 2.10362H15.6125C14.7207 2.10362 13.9977 2.82662 13.9977 3.71833V4.59012Z" fill="#9333EA"/>
<path d="M25.0079 2.30147C25.0079 2.30155 25.0079 2.30163 25.0079 2.30171C25.0078 2.30779 25.0077 2.31314 25.0075 2.31815C25.0077 2.31224 25.0079 2.30653 25.0079 2.30147Z" fill="#9333EA"/>
<path d="M17.9289 1.95256C18.3463 2.33691 18.6161 2.87895 18.643 3.48326C18.6454 3.52544 18.6468 3.56784 18.6468 3.61068V4.552C18.6468 4.59117 18.6458 4.63013 18.6438 4.66881C18.6252 5.13644 18.461 5.56721 18.1953 5.91708C19.7436 7.19367 23.1237 9.27094 24.5289 7.799C25.301 6.99024 24.6633 5.53723 24.6981 4.57363C24.7261 3.8033 24.9918 3.07157 25.0079 2.30153C25.0079 2.30137 25.0079 2.30125 25.0079 2.30104C25.0079 2.30096 25.0079 2.30084 25.0079 2.30084C25.0079 2.30076 25.0079 2.30067 25.0079 2.30067C25.0085 2.27566 25.0083 2.28329 25.0079 2.30018C25.089 -1.69719 19.9389 0.411785 17.9289 1.95256Z" fill="#9333EA"/>
<path d="M13.3287 4.66911C13.3267 4.63035 13.3256 4.59127 13.3256 4.55193V3.61061C13.3256 3.56777 13.3271 3.52529 13.3295 3.48306C13.3565 2.87713 13.6276 2.3337 14.047 1.94927C11.5008 -0.0625137 6.04877 -1.3939 7.13159 3.48205C7.43189 4.83456 6.24294 8.12301 8.43781 8.17471C10.3139 8.21918 12.343 7.17598 13.7854 5.92746C13.5151 5.57584 13.3476 5.14135 13.3287 4.66911Z" fill="#9333EA"/>
<path d="M18.1698 5.96913C17.759 6.4933 17.1208 6.83109 16.4048 6.83109H15.5679C14.8623 6.83109 14.2323 6.50325 13.821 5.99222C13.391 7.06133 12.255 9.23836 9.58483 11.2602L12.0387 10.9694L11.3687 13.6159C13.8248 11.756 15.2243 9.76918 16.0001 8.30977C16.7758 9.76918 18.1752 11.756 20.6314 13.6159L19.9614 10.9694L22.4153 11.2602C19.7257 9.22371 18.5926 7.02983 18.1698 5.96913Z" fill="#9333EA"/>
</svg></span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500 dark:from-purple-400 dark:to-pink-400">
            Wiishy
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
            Главная
          </Link>
          {authState.isAuthenticated ? (
            <>
              <Link to="/wishlists" className="text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                Мои списки
              </Link>
              <Link to="/recommendations" className="text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                Рекомендации
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                Вход
              </Link>
              <Link to="/register" className="text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                Регистрация
              </Link>
            </>
          )}
        </nav>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label={theme === 'dark' ? 'Включить светлую тему' : 'Включить тёмную тему'}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {authState.isAuthenticated && (
            <div className="hidden md:block">
              <div className="relative group">
                <button className="flex items-center space-x-2 p-2 rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <User size={20} />
                  <span>{authState.user?.username}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <Link 
                    to="/profile" 
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-t-md"
                  >
                    Профиль
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-b-md flex items-center"
                  >
                    <LogOut size={16} className="mr-2" /> Выйти
                  </button>
                </div>
              </div>
            </div>
          )}

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 md:hidden rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-md">
          <div className="container mx-auto px-4 py-2 flex flex-col space-y-3">
            <Link 
              to="/" 
              className="py-2 text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Главная
            </Link>
            
            {authState.isAuthenticated ? (
              <>
                <Link 
                  to="/wishlists" 
                  className="py-2 text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Мои списки
                </Link>
                <Link 
                  to="/recommendations" 
                  className="py-2 text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Рекомендации
                </Link>
                <Link 
                  to="/profile" 
                  className="py-2 text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Профиль
                </Link>
                <button 
                  onClick={handleLogout}
                  className="w-full text-left py-2 text-red-500 hover:text-red-600 transition-colors flex items-center"
                >
                  <LogOut size={16} className="mr-2" /> Выйти
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="py-2 text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Вход
                </Link>
                <Link 
                  to="/register" 
                  className="py-2 text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Регистрация
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;