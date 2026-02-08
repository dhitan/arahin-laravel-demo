import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useLanguage, usePortfolios } from '../App';
import { DICTIONARY } from '../types';

const UploadCertificate: React.FC = () => {
  const { language } = useLanguage();
  const t = DICTIONARY[language];
  const { portfolios, addPortfolio, updatePortfolio } = usePortfolios();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  const isEdit = Boolean(id);
  const existingPortfolio = isEdit ? portfolios.find(p => p.id === Number(id)) : null;

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    file_path: ''
  });

  const categories = [
    "Web Development",
    "UI/UX",
    "Data Science",
    "Mobile Development",
    "Cyber Security",
    "Digital Marketing",
    "Other"
  ];

  useEffect(() => {
    if (existingPortfolio) {
      setFormData({
        title: existingPortfolio.title,
        category: existingPortfolio.category,
        description: existingPortfolio.description,
        file_path: existingPortfolio.file_path
      });
    }
  }, [existingPortfolio]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // Mock file path
      setFormData(prev => ({ ...prev, file_path: `portfolios/${e.target.files![0].name}` }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEdit && existingPortfolio) {
      updatePortfolio(existingPortfolio.id, {
        ...formData,
        status: 'pending', // Reset to pending on reupload
        admin_feedback: undefined // Clear old feedback
      });
    } else {
      addPortfolio(formData);
    }
    
    navigate('/competence');
  };

  if (isEdit && !existingPortfolio) {
    return <div className="p-8 text-center text-red-500">Portfolio not found</div>;
  }

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="mb-6">
        <Link to="/competence" className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex items-center gap-1 mb-2">
            <span className="material-icons-outlined text-xs">arrow_back</span> {t.myCertificates}
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {isEdit ? t.reupload : t.uploadCertificate}
        </h1>
      </div>

      <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t.formTitle} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-primary focus:border-primary transition-colors"
              placeholder="e.g. Android Development Certificate"
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t.formCategory} <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              name="category"
              required
              value={formData.category}
              onChange={handleChange}
              className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-primary focus:border-primary transition-colors"
            >
              <option value="" disabled>{t.selectCategory}</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t.formDescription} <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-primary focus:border-primary transition-colors"
              placeholder="Describe your achievement..."
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t.formFile} <span className="text-red-500">*</span>
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
              <div className="space-y-1 text-center">
                <span className="material-icons-outlined text-4xl text-gray-400">cloud_upload</span>
                <div className="flex text-sm text-gray-600 dark:text-gray-400">
                  <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary-dark focus-within:outline-none">
                    <span>Upload a file</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept=".pdf,.jpg,.jpeg,.png" required={!isEdit} />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  PDF, JPG, PNG up to 10MB
                </p>
                {formData.file_path && (
                    <p className="text-sm text-green-600 dark:text-green-400 mt-2 font-medium">
                        Selected: {formData.file_path.split('/').pop()}
                    </p>
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
             <Link 
                to="/competence"
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
             >
                 {t.formCancel}
             </Link>
             <button
                type="submit"
                className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm font-medium shadow-sm transition-colors"
             >
                 {isEdit ? t.formUpdate : t.formSubmit}
             </button>
          </div>

        </form>
      </div>
    </main>
  );
};

export default UploadCertificate;