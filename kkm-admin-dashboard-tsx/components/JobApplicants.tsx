
import React from 'react';
import { Job, JobApplication, Student } from '../types';
import { translations, Language } from '../translations';
import { INITIAL_APPLICATIONS, INITIAL_STUDENTS } from '../constants';

interface JobApplicantsProps {
  job: Job;
  onBack: () => void;
  lang: Language;
}

const JobApplicants: React.FC<JobApplicantsProps> = ({ job, onBack, lang }) => {
  const t = translations[lang];

  // Get applications for this job
  const applications = INITIAL_APPLICATIONS.filter(app => app.jobId === job.id);

  // Map applications to include student details
  const applicants = applications.map(app => {
    const student = INITIAL_STUDENTS.find(s => s.id === app.studentId);
    return {
      ...app,
      student
    };
  }).filter(item => item.student !== undefined); // Ensure valid student data

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400">
          <span className="material-icons-outlined">arrow_back</span>
        </button>
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {t.applicants}: {job.title}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {job.company} • {applications.length} Applicants
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 uppercase tracking-wider">
                <th className="px-6 py-4">{t.student_col}</th>
                <th className="px-6 py-4">Applied Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Cover Letter</th>
                <th className="px-6 py-4 text-right">{t.action_col}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
              {applicants.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={item.student?.avatar} alt={item.student?.fullName} className="w-8 h-8 rounded-full object-cover ring-2 ring-slate-100 dark:ring-slate-800" />
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white">{item.student?.fullName}</p>
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider">{item.student?.major}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-300 font-mono text-xs">
                    {item.appliedAt}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      item.status === 'pending' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-500' :
                      item.status === 'reviewed' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-500' :
                      item.status === 'interview' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-500' :
                      item.status === 'accepted' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-500' :
                      'bg-rose-100 text-rose-700 dark:bg-rose-900/20 dark:text-rose-500'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                   <td className="px-6 py-4">
                     <p className="text-xs text-slate-500 dark:text-slate-400 italic truncate max-w-[150px]">
                       {item.coverLetter || "No cover letter provided."}
                     </p>
                   </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-indigo-600 dark:text-indigo-400 hover:underline text-xs font-bold">Review</button>
                  </td>
                </tr>
              ))}
              {applicants.length === 0 && (
                 <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                       No applicants yet for this position.
                    </td>
                 </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default JobApplicants;
