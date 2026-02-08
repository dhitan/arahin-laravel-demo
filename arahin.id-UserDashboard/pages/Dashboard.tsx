import React from 'react';
import { Link } from 'react-router-dom';
import { COURSES, PORTFOLIOS } from '../constants';
import { useLanguage } from '../App';
import { DICTIONARY } from '../types';

const Dashboard: React.FC = () => {
  const { language } = useLanguage();
  const t = DICTIONARY[language];

  // Helper to format string with args
  const format = (str: string, ...args: (string | number)[]) => {
    return str.replace(/{(\d+)}/g, (match, number) => {
      return typeof args[number] !== 'undefined' ? String(args[number]) : match;
    });
  };

  const approvedPortfolios = PORTFOLIOS.filter(p => p.status === 'approved').length;
  const totalPortfolios = PORTFOLIOS.length;
  const approvalRate = totalPortfolios > 0 ? Math.round((approvedPortfolios / totalPortfolios) * 100) : 0;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <section className="bg-gradient-to-r from-blue-50 to-white dark:from-slate-800 dark:to-slate-900 rounded-2xl p-6 mb-8 border border-blue-100 dark:border-slate-700 shadow-sm relative overflow-hidden transition-colors">
        <div className="relative z-10">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
            {t.welcome} Ghufroon Mahasiswa!
            <span className="text-2xl animate-pulse">👋</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
             {format(t.welcomeSub, approvedPortfolios, totalPortfolios, approvalRate)}
          </p>
        </div>
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-blue-100 dark:bg-blue-900 rounded-full opacity-50 blur-3xl"></div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          
          {/* Charts Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Stats Chart */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 transition-colors">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-semibold text-gray-900 dark:text-white">{t.stats}</h3>
                <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded">{t.last4Months}</span>
              </div>
              <div className="h-40 relative flex items-end justify-between px-2 gap-2">
                <div className="absolute inset-x-0 bottom-0 border-b border-gray-200 dark:border-gray-600 h-full flex flex-col justify-between text-xs text-gray-400 dark:text-gray-500 py-1">
                  <span>3</span>
                  <span>0</span>
                </div>
                <div className="w-full h-full flex items-end justify-between z-10 pl-6 pb-1">
                  {['Nov', 'Dec', 'Jan', 'Feb'].map((month, idx) => (
                    <div key={idx} className="w-1 h-1 bg-primary rounded-full relative group">
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-40 w-0.5 bg-gradient-to-t from-primary/20 to-transparent"></div>
                      <div className="absolute top-2 left-1/2 -translate-x-1/2 text-xs text-gray-500 mt-2">{month}</div>
                    </div>
                  ))}
                  <div className="absolute top-[98%] left-0 right-0 h-0.5 bg-primary/30"></div>
                </div>
              </div>
              <div className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400 font-medium">{format(t.totalPortfolio, totalPortfolios)}</div>
            </div>

            {/* Skill Progress */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 transition-colors">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-semibold text-gray-900 dark:text-white">{t.skillProgress}</h3>
                <span className="text-xs bg-blue-50 dark:bg-blue-900/30 text-primary px-2 py-1 rounded">{t.current}</span>
              </div>
              <div className="h-40 relative flex items-end justify-between px-2 gap-2">
                <div className="absolute inset-x-0 bottom-0 border-b border-gray-200 dark:border-gray-600 h-full flex flex-col justify-between text-xs text-gray-400 dark:text-gray-500 py-1">
                  <span>1</span>
                  <span>0</span>
                </div>
                <div className="w-full h-full flex items-end justify-between z-10 pl-6 pb-1">
                  {['Q1', 'Q2', 'Q3', 'Q4'].map((q, idx) => (
                    <div key={idx} className="w-1 h-1 bg-indigo-400 rounded-full relative">
                      <div className="absolute top-2 left-1/2 -translate-x-1/2 text-xs text-gray-500 mt-2">{q}</div>
                    </div>
                  ))}
                  <div className="absolute top-[2%] left-0 right-0 h-0.5 bg-indigo-400"></div>
                </div>
              </div>
              <div className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400 font-medium">{t.skillMastered}</div>
            </div>
          </div>

          {/* Recommendations */}
          <div>
            <div className="flex justify-between items-end mb-4">
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  {t.recommendations} <span className="text-orange-500 text-xl material-icons-outlined">local_fire_department</span>
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{t.basedOnInterest} <a className="text-primary hover:underline" href="#">Web Development</a></p>
              </div>
              <Link className="text-sm font-medium text-primary hover:text-primary-dark flex items-center gap-1" to="/courses">
                {t.seeAll} <span className="material-icons-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {COURSES.slice(0, 3).map((course) => (
                <div key={course.id} className="group bg-surface-light dark:bg-surface-dark rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col h-full">
                  <div className="h-32 relative bg-gray-800">
                    <span className="absolute top-3 left-3 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] px-2 py-0.5 rounded-full z-10">{course.category}</span>
                    <div 
                        className="w-full h-full opacity-60 bg-cover bg-center transition-opacity group-hover:opacity-75"
                        style={{ backgroundImage: `url('${course.thumbnail}')`}}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="font-bold text-gray-900 dark:text-white text-sm line-clamp-2 mb-1 group-hover:text-primary transition-colors">{course.title}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">by {course.instructor}</p>
                    <div className="mt-auto">
                      <Link 
                        to={`/course/${course.id}`}
                        className="w-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 text-xs font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-1"
                      >
                        {t.startLearning} <span className="material-icons-outlined text-[14px]">arrow_right_alt</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Portfolio Section */}
          <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-6 transition-colors">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-gray-900 dark:text-white">{t.recentPortfolio}</h3>
              <Link className="text-sm font-medium text-primary hover:text-primary-dark" to="/competence">{t.seeAll}</Link>
            </div>
            
            {PORTFOLIOS.length > 0 ? (
                <div className="space-y-4">
                  {PORTFOLIOS.slice(0, 2).map(portfolio => (
                    <div key={portfolio.id} className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-700">
                        <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-primary">
                            <span className="material-icons-outlined">folder</span>
                        </div>
                        <div className="flex-grow">
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white">{portfolio.title}</h4>
                            <p className="text-xs text-gray-500">{portfolio.category}</p>
                        </div>
                        <span className={`px-2 py-0.5 text-[10px] rounded-full font-medium ${
                            portfolio.status === 'approved' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 
                            portfolio.status === 'pending' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                            'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                        }`}>
                            {portfolio.status === 'approved' ? t.approved : portfolio.status === 'pending' ? t.pending : t.declined}
                        </span>
                    </div>
                  ))}
                </div>
            ) : (
                <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg p-12 flex flex-col items-center justify-center text-center">
                    <span className="material-icons-outlined text-4xl text-gray-300 dark:text-gray-600 mb-3">image_not_supported</span>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">{t.noPortfolio}</p>
                    <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">{t.startPortfolio}</p>
                </div>
            )}
            
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-8">
          <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 transition-colors">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-gray-900 dark:text-white">{t.calendar}</h3>
              <span className="text-xs bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-2 py-1 rounded font-medium">February 2026</span>
            </div>
            <div className="grid grid-cols-7 text-center text-xs mb-2 text-gray-400 dark:text-gray-500 font-medium">
              <div>MO</div><div>TU</div><div>WE</div><div>TH</div><div>FR</div><div>SA</div><div>SU</div>
            </div>
            <div className="grid grid-cols-7 gap-y-4 text-center text-sm text-gray-700 dark:text-gray-300">
              <div className="col-span-6"></div>
              {[1, 2, 3, 4, 5, 6, 7].map(d => (
                   <div key={d} className="hover:bg-gray-50 dark:hover:bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center mx-auto cursor-pointer">{d}</div>
              ))}
              <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto shadow-md shadow-primary/30">8</div>
              {Array.from({length: 20}, (_, i) => i + 9).map(d => (
                  <div key={d} className="hover:bg-gray-50 dark:hover:bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center mx-auto cursor-pointer">{d}</div>
              ))}
            </div>
          </div>

          <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 flex flex-col items-center text-center transition-colors">
            <div className="flex justify-start w-full mb-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">{t.pendingReview}</h3>
            </div>
            <div className="w-16 h-16 rounded-full bg-green-50 dark:bg-green-900/30 flex items-center justify-center mb-4">
              <span className="material-icons-outlined text-green-500 text-3xl">check_circle</span>
            </div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-1">{t.allSafe}</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400">{t.noPending}</p>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default Dashboard;