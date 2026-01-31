
import React from 'react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';
import { COMPETENCY_CHART_DATA, SKILL_GAP_DATA } from '../constants';
import { translations, Language } from '../translations';

interface ChartsSectionProps {
  lang: Language;
}

const ChartsSection: React.FC<ChartsSectionProps> = ({ lang }) => {
  const t = translations[lang];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-5 transition-colors">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">{t.top_competencies}</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={COMPETENCY_CHART_DATA}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {COMPETENCY_CHART_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#1E293B', border: 'none', borderRadius: '8px', fontSize: '12px', color: '#fff' }}
                itemStyle={{ color: '#fff' }}
              />
              <Legend 
                verticalAlign="middle" 
                align="right" 
                layout="vertical"
                iconType="circle"
                formatter={(value: string) => <span className="text-slate-600 dark:text-slate-400 text-xs ml-2 font-medium">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-5 transition-colors">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{t.skill_gap}</h3>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-[10px]">
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-sm bg-indigo-600"></span>
              <span className="text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">{t.student_skill}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-sm bg-slate-300 dark:bg-slate-600"></span>
              <span className="text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">{t.industry_demand}</span>
            </div>
          </div>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={SKILL_GAP_DATA}
              margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
              barGap={8}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" vertical={false} />
              <XAxis 
                dataKey="skill" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748b', fontSize: 10 }}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748b', fontSize: 10 }}
              />
              <Tooltip 
                cursor={{ fill: '#f1f5f9', opacity: 0.4 }}
                contentStyle={{ backgroundColor: '#1E293B', border: 'none', borderRadius: '8px', fontSize: '12px', color: '#fff' }}
              />
              <Bar 
                dataKey="studentSkill" 
                fill="#4F46E5" 
                radius={[4, 4, 0, 0]} 
                barSize={12}
              />
              <Bar 
                dataKey="industryDemand" 
                fill="#94a3b8" 
                radius={[4, 4, 0, 0]} 
                barSize={12}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ChartsSection;
