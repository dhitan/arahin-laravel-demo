import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { COURSES } from '../constants';
import { useLanguage } from '../App';
import { DICTIONARY } from '../types';

const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const course = COURSES.find(c => c.id === id);
  const { language } = useLanguage();
  const t = DICTIONARY[language];
  
  // State for accordion
  const [openModule, setOpenModule] = useState<number | null>(1);

  if (!course) {
    return <div className="p-8 text-center dark:text-white">Course not found.</div>;
  }

  const toggleModule = (id: number) => {
    setOpenModule(openModule === id ? null : id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Link to="/" className="hover:text-primary transition-colors">{t.home}</Link>
            <span className="material-icons-outlined text-xs">chevron_right</span>
            <span className="text-gray-900 dark:text-white font-medium truncate">{course.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content (Left) */}
            <div className="lg:col-span-2 space-y-6">
                
                {/* Video Player Placeholder */}
                <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg relative group">
                     {/* Fake Video UI */}
                     <div 
                        className="absolute inset-0 bg-cover bg-center opacity-40" 
                        style={{ backgroundImage: `url('${course.thumbnail}')` }} 
                     ></div>
                     <div className="absolute inset-0 flex items-center justify-center">
                        <button className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-transform hover:bg-white/30 text-white">
                            <span className="material-icons-outlined text-4xl">play_arrow</span>
                        </button>
                     </div>
                     <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                         <div className="flex items-center justify-between text-white">
                             <div className="flex items-center gap-4">
                                <span className="material-icons-outlined">play_arrow</span>
                                <div className="w-full bg-gray-600 h-1 rounded-full w-32 md:w-64">
                                    <div className="bg-primary h-1 w-1/3 rounded-full"></div>
                                </div>
                                <span className="text-xs">12:30 / 45:00</span>
                             </div>
                             <div className="flex gap-4">
                                 <span className="material-icons-outlined cursor-pointer hover:text-primary">volume_up</span>
                                 <span className="material-icons-outlined cursor-pointer hover:text-primary">fullscreen</span>
                             </div>
                         </div>
                     </div>
                </div>

                {/* Course Header info */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{course.title}</h1>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                        <span className="flex items-center gap-1">
                             <span className="material-icons-outlined text-base">person</span> {course.instructor}
                        </span>
                        <span className="flex items-center gap-1">
                             <span className="material-icons-outlined text-base">category</span> {course.category}
                        </span>
                        <span className="flex items-center gap-1">
                             <span className="material-icons-outlined text-base">star</span> 4.8 (120 reviews)
                        </span>
                    </div>
                </div>

                {/* Tabs / Description */}
                <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-6">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">{t.aboutCourse}</h2>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {course.description}
                    </p>
                </div>
            </div>

            {/* Sidebar Content (Right) */}
            <div className="space-y-6">
                <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden flex flex-col h-[600px]">
                    <div className="p-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                        <h3 className="font-bold text-gray-900 dark:text-white">{t.courseContent}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{course.modules.length} Modules • {course.modules.reduce((acc, m) => acc + m.lessons.length, 0)} Lessons</p>
                    </div>
                    
                    <div className="overflow-y-auto flex-grow p-2 space-y-2 custom-scrollbar">
                        {course.modules.map((module) => (
                            <div key={module.id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                                <button 
                                    onClick={() => toggleModule(module.id)}
                                    className="w-full flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
                                >
                                    <div className="text-left">
                                        <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200">{module.title}</h4>
                                        <p className="text-[10px] text-gray-500">{module.lessons.length} lessons • {module.duration}</p>
                                    </div>
                                    <span className={`material-icons-outlined text-gray-400 transition-transform ${openModule === module.id ? 'rotate-180' : ''}`}>expand_more</span>
                                </button>
                                
                                {openModule === module.id && (
                                    <div className="bg-white dark:bg-gray-900 divide-y divide-gray-100 dark:divide-gray-800">
                                        {module.lessons.map((lesson) => (
                                            <div key={lesson.id} className="p-3 pl-4 flex items-center gap-3 hover:bg-blue-50 dark:hover:bg-blue-900/10 cursor-pointer group transition-colors">
                                                <div className={`p-1 rounded ${lesson.id === 101 ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'}`}>
                                                    <span className="material-icons-outlined text-sm">
                                                        {lesson.type === 'video' ? 'play_arrow' : 'article'}
                                                    </span>
                                                </div>
                                                <div className="flex-grow">
                                                    <p className={`text-sm ${lesson.id === 101 ? 'font-medium text-primary' : 'text-gray-700 dark:text-gray-300'}`}>{lesson.title}</p>
                                                    <p className="text-[10px] text-gray-400">{lesson.duration}</p>
                                                </div>
                                                {lesson.id === 101 && <span className="material-icons-outlined text-xs text-primary">equalizer</span>}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-6">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-4">{t.instructor}</h3>
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold text-lg">
                            {course.instructor.charAt(0)}
                        </div>
                        <div>
                            <p className="font-medium text-gray-900 dark:text-white">{course.instructor}</p>
                            <p className="text-xs text-gray-500">Senior Developer & Educator</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default CourseDetail;