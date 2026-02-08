import React, { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import CourseDetail from './pages/CourseDetail';
import Competence from './pages/Competence';
import Psychologist from './pages/Psychologist';
import Courses from './pages/Courses';
import UploadCertificate from './pages/UploadCertificate';
import { Language, DICTIONARY, Portfolio } from './types';
import { PORTFOLIOS } from './constants';

// Language Context
interface LanguageContextType {
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
};

// Portfolio Context
interface PortfolioContextType {
  portfolios: Portfolio[];
  addPortfolio: (portfolio: Omit<Portfolio, 'id' | 'created_at' | 'status' | 'student_id'>) => void;
  updatePortfolio: (id: number, data: Partial<Portfolio>) => void;
  deletePortfolio: (id: number) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const usePortfolios = () => {
  const context = useContext(PortfolioContext);
  if (!context) throw new Error("usePortfolios must be used within a PortfolioProvider");
  return context;
};

// Scroll to top component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
     if (typeof window !== 'undefined') {
         return window.localStorage.getItem('theme') === 'dark' || 
                (!('theme' in window.localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
     }
     return false;
  });

  const [language, setLanguage] = useState<Language>('id');
  
  // State for portfolios to persist changes in memory during session
  const [portfolios, setPortfolios] = useState<Portfolio[]>(PORTFOLIOS);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const t = DICTIONARY[language];

  // Portfolio Context Actions
  const addPortfolio = (data: Omit<Portfolio, 'id' | 'created_at' | 'status' | 'student_id'>) => {
    const newPortfolio: Portfolio = {
      ...data,
      id: Math.max(...portfolios.map(p => p.id), 0) + 1,
      student_id: 1, // Mock user ID
      created_at: new Date().toISOString().replace('T', ' ').substring(0, 19),
      status: 'pending',
      admin_feedback: undefined
    };
    setPortfolios([newPortfolio, ...portfolios]);
  };

  const updatePortfolio = (id: number, data: Partial<Portfolio>) => {
    setPortfolios(portfolios.map(p => p.id === id ? { ...p, ...data } : p));
  };

  const deletePortfolio = (id: number) => {
    setPortfolios(portfolios.filter(p => p.id !== id));
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <PortfolioContext.Provider value={{ portfolios, addPortfolio, updatePortfolio, deletePortfolio }}>
        <Router>
          <ScrollToTop />
          <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-text-light dark:text-text-dark antialiased transition-colors duration-200 flex flex-col">
            <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            
            <div className="flex-grow">
               <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/competence" element={<Competence />} />
                  <Route path="/competence/upload" element={<UploadCertificate />} />
                  <Route path="/competence/reupload/:id" element={<UploadCertificate />} />
                  <Route path="/psychologist" element={<Psychologist />} />
                  <Route path="/courses" element={<Courses />} />
                  <Route path="/course/:id" element={<CourseDetail />} />
               </Routes>
            </div>

            <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-gray-200 dark:border-gray-800 mt-8 w-full">
              <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                  <p>{t.footer}</p>
                  <div className="flex space-x-4 mt-4 md:mt-0">
                      <a className="hover:text-gray-900 dark:hover:text-white" href="#">{t.terms}</a>
                      <a className="hover:text-gray-900 dark:hover:text-white" href="#">{t.privacy}</a>
                  </div>
              </div>
            </footer>
          </div>
        </Router>
      </PortfolioContext.Provider>
    </LanguageContext.Provider>
  );
};

export default App;