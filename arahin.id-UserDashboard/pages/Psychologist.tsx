import React from 'react';
import { useLanguage } from '../App';
import { DICTIONARY } from '../types';

const Psychologist: React.FC = () => {
  const { language } = useLanguage();
  const t = DICTIONARY[language];

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-8 animate-fade-in text-center">
      <div className="w-48 h-48 bg-yellow-50 dark:bg-yellow-900/20 rounded-full flex items-center justify-center mb-6">
        <span className="material-icons-outlined text-8xl text-yellow-500">construction</span>
      </div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t.underConstruction}</h1>
      <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">{t.underConstructionDesc}</p>
    </div>
  );
};

export default Psychologist;