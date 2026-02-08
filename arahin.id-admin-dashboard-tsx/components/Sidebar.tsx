
import React from 'react';
import { translations, Language } from '../translations';

interface SidebarProps {
  lang: Language;
  currentView: string;
  onSetView: (view: string) => void;
  pendingCount: number;
}

const Sidebar: React.FC<SidebarProps> = ({ lang, currentView, onSetView, pendingCount }) => {
  const t = translations[lang];

  const menuItems = [
    { id: 'dashboard', label: t.dashboard, icon: 'dashboard' },
    { id: 'verification', label: t.verification, icon: 'verified', badge: pendingCount > 0 ? pendingCount : undefined },
    { id: 'students', label: t.students, icon: 'people' },
    { id: 'jobs', label: t.jobs, icon: 'work_outline' },
    { id: 'courses', label: t.courses, icon: 'auto_stories' },
    { id: 'cms', label: t.cms, icon: 'campaign' },
    { id: 'stats', label: t.stats, icon: 'analytics' },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 flex-shrink-0 hidden md:flex flex-col h-screen transition-colors">
      <div className="h-16 flex items-center px-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-xl cursor-pointer" onClick={() => onSetView('dashboard')}>
          <span className="material-icons-outlined text-yellow-500 dark:text-yellow-400">school</span>
          KKM APP
        </div>
      </div>
      
      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSetView(item.id)}
            className={`w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg transition-colors group ${
              currentView === item.id 
                ? 'bg-indigo-50 dark:bg-indigo-600/20 text-indigo-600 dark:text-indigo-400 border-l-4 border-indigo-600' 
                : 'text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className={`material-icons-outlined text-lg ${currentView === item.id ? 'text-indigo-600 dark:text-indigo-400' : 'group-hover:text-indigo-600 dark:group-hover:text-indigo-400'}`}>
                {item.icon}
              </span>
              {item.label}
            </div>
            {item.badge && (
              <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full animate-pulse">
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-200 dark:border-slate-800">
        <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
          <span className="material-icons-outlined text-lg">logout</span>
          {t.logout}
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;
