import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { COURSES } from '../constants';
import { useLanguage } from '../App';
import { DICTIONARY } from '../types';

const Courses: React.FC = () => {
  const { language } = useLanguage();
  const t = DICTIONARY[language];
  const [filter, setFilter] = useState('All');

  const categories = ['All', ...Array.from(new Set(COURSES.map(c => c.category)))];

  const filteredCourses = filter === 'All' 
    ? COURSES 
    : COURSES.filter(c => c.category === filter);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
           <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t.courseCatalog}</h1>
           <p className="text-gray-500 dark:text-gray-400 mt-1">{t.startLearning}</p>
        </div>
        
        {/* Filter */}
        <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-2 md:pb-0">
          <span className="text-sm font-medium text-gray-500 whitespace-nowrap hidden md:block">{t.filterByCategory}:</span>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                filter === cat 
                ? 'bg-primary text-white' 
                : 'bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              {cat === 'All' ? t.allCategories : cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div key={course.id} className="group bg-surface-light dark:bg-surface-dark rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col h-full">
            <div className="h-48 relative bg-gray-800">
              <span className="absolute top-3 left-3 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] px-2 py-0.5 rounded-full z-10">{course.category}</span>
              <div 
                  className="w-full h-full opacity-60 bg-cover bg-center transition-opacity group-hover:opacity-75"
                  style={{ backgroundImage: `url('${course.thumbnail}')`}}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-3 left-3 right-3">
                 <h3 className="font-bold text-white text-lg line-clamp-2 mb-1 group-hover:text-primary-300 transition-colors">{course.title}</h3>
                 <p className="text-xs text-gray-300">by {course.instructor}</p>
              </div>
            </div>
            <div className="p-4 flex flex-col flex-grow">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {course.description}
              </p>
              <div className="mt-auto flex items-center justify-between gap-4">
                 <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1"><span className="material-icons-outlined text-sm">menu_book</span> {course.modules.length} Modules</span>
                 </div>
                <Link 
                  to={`/course/${course.id}`}
                  className="bg-primary hover:bg-primary-dark text-white text-xs font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-1"
                >
                  {t.startLearning}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Courses;