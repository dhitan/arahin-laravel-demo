import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../App';
import { DICTIONARY } from '../types';

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ darkMode, toggleDarkMode }) => {
  const { language, setLanguage } = useLanguage();
  const t = DICTIONARY[language];
  const location = useLocation();

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'id' ? 'en' : 'id');
  };

  const isActive = (path: string) => location.pathname === path;

  const linkClass = (path: string) => `
    inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200
    ${isActive(path) 
      ? 'border-primary text-gray-900 dark:text-white' 
      : 'border-transparent text-gray-500 dark:text-gray-400 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-300'}
  `;

  return (
    <nav className="sticky top-0 z-50 bg-surface-light dark:bg-surface-dark border-b border-gray-200 dark:border-gray-700 shadow-sm transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-tr from-blue-400 to-green-400 rounded-lg flex items-center justify-center text-white font-bold">A</div>
              <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">Arahin<span className="text-primary">.id</span></span>
            </Link>
            <div className="hidden sm:ml-10 sm:flex sm:space-x-8">
              <Link to="/" className={linkClass('/')}>
                {t.home}
              </Link>
              <Link to="/courses" className={linkClass('/courses')}>
                {t.courses}
              </Link>
              <Link to="/competence" className={linkClass('/competence')}>
                {t.competence}
              </Link>
              <Link to="/psychologist" className={linkClass('/psychologist')}>
                {t.psychologist}
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            
            {/* Language Toggle */}
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border border-gray-200 dark:border-gray-700"
              aria-label="Toggle Language"
            >
               {language === 'id' ? (
                  <>
                    <img src="https://flagcdn.com/w20/id.png" alt="Indonesian" className="w-5 h-auto rounded-sm object-cover" />
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-300">ID</span>
                  </>
               ) : (
                 <>
                    <img src="https://flagcdn.com/w20/gb.png" alt="English" className="w-5 h-auto rounded-sm object-cover" />
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-300">EN</span>
                 </>
               )}
            </button>

            {/* Dark Mode Toggle */}
            <button 
              onClick={toggleDarkMode}
              className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full focus:outline-none transition-colors"
            >
              <span className="material-icons-outlined text-xl">
                {darkMode ? 'light_mode' : 'dark_mode'}
              </span>
            </button>

            {/* User Profile */}
            <div className="ml-3 relative flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">G</div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-200">Ghufroon Mahasiswa</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Student Account</p>
              </div>
              <span className="material-icons-outlined text-gray-400">expand_more</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;