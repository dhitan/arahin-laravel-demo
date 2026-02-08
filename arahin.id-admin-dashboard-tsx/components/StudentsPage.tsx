
import React, { useState } from 'react';
import { Student } from '../types';
import { translations, Language } from '../translations';

interface StudentsPageProps {
  students: Student[];
  lang: Language;
}

const StudentsPage: React.FC<StudentsPageProps> = ({ students, lang }) => {
  const t = translations[lang];
  const [search, setSearch] = useState('');
  const [majorFilter, setMajorFilter] = useState<string>('all');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  // Extract unique majors for filter dropdown
  const majors = Array.from(new Set(students.map(s => s.major)));

  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.fullName.toLowerCase().includes(search.toLowerCase()) || 
      student.nim.toLowerCase().includes(search.toLowerCase()) ||
      student.email.toLowerCase().includes(search.toLowerCase());
    
    const matchesMajor = majorFilter === 'all' || student.major === majorFilter;

    return matchesSearch && matchesMajor;
  });

  const handleExport = () => {
    const headers = ['Name', 'NIM', 'Major', 'Year', 'Email', 'Phone', 'Status', 'Skills'];
    const csvContent = [
      headers.join(','),
      ...filteredStudents.map(s => [
        `"${s.fullName.replace(/"/g, '""')}"`,
        `"${s.nim}"`,
        `"${s.major}"`,
        `"${s.yearOfEntry}"`,
        `"${s.email}"`,
        `"${s.phone}"`,
        `"${s.status}"`,
        `"${s.skills.join('; ')}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `students_export_${new Date().toISOString().slice(0, 10)}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <>
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{t.students}</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">{t.total_students}: {students.length}</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={handleExport}
              className="px-4 py-2 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-2"
            >
              <span className="material-icons-outlined text-lg">download</span>
              Export CSV
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 relative">
            <span className="material-icons-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
            <input 
              type="text" 
              placeholder={t.search_student_placeholder} 
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm dark:text-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div>
            <select 
              className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm dark:text-white"
              value={majorFilter}
              onChange={(e) => setMajorFilter(e.target.value)}
            >
              <option value="all">Semua Jurusan / All Majors</option>
              {majors.map(major => (
                <option key={major} value={major}>{major}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Students Table */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 uppercase tracking-wider">
                  <th className="px-6 py-4">{t.student_col}</th>
                  <th className="px-6 py-4">{t.major} / {t.year_entry}</th>
                  <th className="px-6 py-4">{t.phone}</th>
                  <th className="px-6 py-4">{t.skills}</th>
                  <th className="px-6 py-4 text-center">{t.student_status}</th>
                  <th className="px-6 py-4 text-right">{t.action_col}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={student.avatar} alt={student.fullName} className="w-8 h-8 rounded-full object-cover ring-2 ring-slate-100 dark:ring-slate-800" />
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">{student.fullName}</p>
                          <p className="text-[10px] text-slate-500 uppercase tracking-wider">{student.nim}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-slate-700 dark:text-slate-300 font-medium">{student.major}</span>
                        <span className="text-[10px] text-slate-500">{student.yearOfEntry}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400 font-mono text-xs">
                      {student.phone}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {student.skills.slice(0, 2).map((skill, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded text-[10px] font-medium bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400">
                            {skill}
                          </span>
                        ))}
                        {student.skills.length > 2 && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-500">
                            +{student.skills.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        student.status === 'active' 
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-500' 
                          : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                      }`}>
                        {student.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => setSelectedStudent(student)}
                        className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                      >
                        <span className="material-icons-outlined text-lg">visibility</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredStudents.length === 0 && (
              <div className="py-16 text-center">
                <span className="material-icons-outlined text-5xl text-slate-200 dark:text-slate-800 mb-2">school</span>
                <p className="text-slate-500 text-sm">Tidak ada data mahasiswa ditemukan.</p>
              </div>
            )}
          </div>
          
          <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Showing <span className="font-semibold text-slate-900 dark:text-white">1</span> to <span className="font-semibold text-slate-900 dark:text-white">{filteredStudents.length}</span> of <span className="font-semibold text-slate-900 dark:text-white">{students.length}</span> entries
            </span>
            <div className="flex gap-1">
              <button className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 disabled:opacity-50" disabled>
                <span className="material-icons-outlined text-sm">chevron_left</span>
              </button>
              <button className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500">
                <span className="material-icons-outlined text-sm">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Student Detail Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh] animate-in slide-in-from-bottom-4 duration-300 ring-1 ring-slate-900/5">
            {/* Cleaner Header with prominent NIM */}
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-start bg-slate-50 dark:bg-slate-900/50">
              <div className="flex items-center gap-4">
                <img 
                  src={selectedStudent.avatar} 
                  alt={selectedStudent.fullName} 
                  className="w-16 h-16 rounded-full border-2 border-white dark:border-slate-700 shadow-md object-cover"
                />
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">{selectedStudent.fullName}</h2>
                  <div className="flex flex-col mt-1 gap-1">
                     <p className="text-sm font-mono text-indigo-600 dark:text-indigo-400 font-semibold tracking-wide">
                      NIM: {selectedStudent.nim}
                    </p>
                    <span className={`self-start px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      selectedStudent.status === 'active' 
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-500' 
                        : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                    }`}>
                      {selectedStudent.status}
                    </span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setSelectedStudent(null)} 
                className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
              >
                <span className="material-icons-outlined">close</span>
              </button>
            </div>
            
            <div className="p-8 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <span className="material-icons-outlined text-sm">badge</span>
                      {t.general_info}
                    </h3>
                    <div className="space-y-4">
                      <div className="bg-slate-50 dark:bg-slate-800/30 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                        <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">{t.major}</label>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">{selectedStudent.major}</p>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-800/30 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                        <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">{t.email_address}</label>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{selectedStudent.email}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-50 dark:bg-slate-800/30 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                          <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">{t.phone}</label>
                          <p className="text-sm font-semibold text-slate-900 dark:text-white">{selectedStudent.phone}</p>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-800/30 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                          <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">{t.year_entry}</label>
                          <p className="text-sm font-semibold text-slate-900 dark:text-white">{selectedStudent.yearOfEntry}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <span className="material-icons-outlined text-sm">psychology</span>
                      {t.skills}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedStudent.skills.map((skill, idx) => (
                        <span key={idx} className="px-3 py-1.5 rounded-lg text-sm font-medium bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/30">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                     <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <span className="material-icons-outlined text-sm">info</span>
                      System Info
                    </h3>
                     <div className="space-y-3 bg-slate-50 dark:bg-slate-800/30 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                      <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-700/50">
                        <span className="text-xs text-slate-500">Registered</span>
                        <span className="text-xs font-mono font-medium dark:text-slate-300">{selectedStudent.createdAt.split(' ')[0]}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-slate-500">Last Update</span>
                        <span className="text-xs font-mono font-medium dark:text-slate-300">{selectedStudent.updatedAt.split(' ')[0]}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StudentsPage;
