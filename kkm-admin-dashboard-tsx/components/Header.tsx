
import React, { useState, useEffect, useRef } from 'react';
import { Language } from '../translations';
import { StudentVerification } from '../types';

interface UserProfile {
  name: string;
  email: string;
  username: string;
  avatar: string;
  role: string;
}

interface HeaderProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  lang: Language;
  onToggleLang: () => void;
  user: UserProfile;
  onProfileClick: () => void;
  pendingVerifications: StudentVerification[];
  onNotificationClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  theme, onToggleTheme, lang, onToggleLang, user, onProfileClick,
  pendingVerifications, onNotificationClick
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (seconds < 60) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 z-20 shadow-sm transition-colors">
      <button className="md:hidden text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white">
        <span className="material-icons-outlined">menu</span>
      </button>
      
      <div className="ml-auto flex items-center gap-2 sm:gap-4">
        {/* Language Selection Button */}
        <button 
          onClick={onToggleLang}
          className="h-10 px-3 flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all"
          title={lang === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'}
        >
          <span className="material-icons-outlined text-lg">language</span>
          <span className="text-xs font-bold uppercase">{lang}</span>
        </button>

        {/* Theme Toggle Button */}
        <button 
          onClick={onToggleTheme}
          className="w-10 h-10 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all"
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          <span className="material-icons-outlined">
            {theme === 'dark' ? 'light_mode' : 'dark_mode'}
          </span>
        </button>

        {/* Notifications Icon and Dropdown */}
        <div className="relative" ref={notificationRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-10 h-10 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all relative"
          >
            <span className="material-icons-outlined">notifications</span>
            {pendingVerifications.length > 0 && (
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-slate-900 animate-pulse"></span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
                <h4 className="font-bold text-slate-800 dark:text-white">{lang === 'id' ? 'Notifikasi' : 'Notifications'}</h4>
                {pendingVerifications.length > 0 && (
                  <button 
                    onClick={() => { setShowNotifications(false); onNotificationClick(); }}
                    className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold uppercase tracking-wider hover:underline"
                  >
                    {lang === 'id' ? 'Lihat Semua' : 'View All'}
                  </button>
                )}
              </div>
              <div className="max-h-64 overflow-y-auto">
                {pendingVerifications.length === 0 ? (
                  <div className="p-4 text-center text-slate-500 text-sm">
                    {lang === 'id' ? 'Tidak ada notifikasi baru' : 'No new notifications'}
                  </div>
                ) : (
                  pendingVerifications.map(item => (
                    <div 
                      key={item.id} 
                      onClick={() => { setShowNotifications(false); onNotificationClick(); }}
                      className="px-4 py-3 border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer flex gap-3 bg-indigo-50/30 dark:bg-indigo-900/10"
                    >
                      <div className="mt-1 w-2 h-2 rounded-full flex-shrink-0 bg-indigo-600"></div>
                      <div>
                        <p className="text-xs font-medium text-slate-800 dark:text-slate-200">
                          {lang === 'id' 
                            ? `${item.name} mengunggah ${item.category}` 
                            : `${item.name} uploaded ${item.category}`}
                        </p>
                        <p className="text-[10px] text-slate-500 mt-1">{getTimeAgo(item.createdAt)}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
        
        <div 
          onClick={onProfileClick}
          className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-800 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 p-1 rounded-lg transition-colors group"
        >
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{user.name}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{user.role}</p>
          </div>
          <img 
            alt="User Avatar" 
            className="w-9 h-9 rounded-full ring-2 ring-slate-100 dark:ring-slate-800 group-hover:ring-indigo-500 transition-all object-cover" 
            src={user.avatar} 
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
