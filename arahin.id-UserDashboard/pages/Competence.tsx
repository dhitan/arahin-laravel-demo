import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage, usePortfolios } from '../App';
import { DICTIONARY } from '../types';

const Competence: React.FC = () => {
  const { language } = useLanguage();
  const t = DICTIONARY[language];
  const { portfolios, deletePortfolio } = usePortfolios();
  const navigate = useNavigate();

  const handleDelete = (id: number) => {
    const portfolio = portfolios.find(p => p.id === id);
    if (portfolio?.status === 'approved') {
      alert(t.cantDeleteApproved);
      return;
    }
    
    if (window.confirm(t.confirmDelete)) {
      deletePortfolio(id);
    }
  };

  const handleReupload = (id: number) => {
    navigate(`/competence/reupload/${id}`);
  };

  const handleView = (filePath: string) => {
    window.open(filePath, '_blank');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'declined': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'approved': return t.approved;
      case 'pending': return t.pending;
      case 'declined': return t.declined;
      default: return status;
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t.myCertificates}</h1>
        <Link 
          to="/competence/upload"
          className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
        >
          <span className="material-icons-outlined">upload_file</span>
          {t.uploadCertificate}
        </Link>
      </div>

      <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t.formTitle}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t.formCategory}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t.status}
                </th>
                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t.feedback}
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t.actions}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-surface-dark divide-y divide-gray-200 dark:divide-gray-700">
              {portfolios.length > 0 ? (
                portfolios.map((portfolio) => (
                  <tr 
                    key={portfolio.id} 
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer"
                    onClick={() => handleView(portfolio.file_path)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center text-blue-500">
                          <span className="material-icons-outlined">description</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{portfolio.title}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">{portfolio.created_at}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">{portfolio.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(portfolio.status)}`}>
                        {getStatusLabel(portfolio.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500 dark:text-gray-400 max-w-xs truncate">
                        {portfolio.admin_feedback || '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        {/* View Button - Always Active */}
                        <button
                            onClick={(e) => { e.stopPropagation(); handleView(portfolio.file_path); }}
                            className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 transition-colors p-1 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20"
                            title={t.view}
                        >
                            <span className="material-icons-outlined text-[20px]">visibility</span>
                        </button>

                        {/* Reupload Button - Active only if declined */}
                        <button 
                            onClick={(e) => { 
                                e.stopPropagation(); 
                                if (portfolio.status === 'declined') handleReupload(portfolio.id); 
                            }}
                            disabled={portfolio.status !== 'declined'}
                            className={`p-1 rounded-full transition-colors ${
                                portfolio.status === 'declined' 
                                ? 'text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 cursor-pointer' 
                                : 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
                            }`}
                            title={t.reupload}
                        >
                            <span className="material-icons-outlined text-[20px]">refresh</span>
                        </button>

                        {/* Delete Button - Active if NOT approved */}
                        <button 
                            onClick={(e) => { 
                                e.stopPropagation(); 
                                if (portfolio.status !== 'approved') handleDelete(portfolio.id); 
                            }}
                            disabled={portfolio.status === 'approved'}
                            className={`p-1 rounded-full transition-colors ${
                                portfolio.status !== 'approved' 
                                ? 'text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer' 
                                : 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
                            }`}
                            title={t.delete}
                        >
                            <span className="material-icons-outlined text-[20px]">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                    {t.noPortfolio}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default Competence;