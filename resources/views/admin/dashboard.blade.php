<x-app-layout>
    {{-- ======================================================================= --}}
    {{-- TAMPILAN DASHBOARD ADMIN --}}
    {{-- ======================================================================= --}}

    <div class="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 transition-colors mb-6">
        <h1 class="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            {{ __('messages.welcome') }}, {{ explode(' ', $user->name)[0] }}! 👋
        </h1>
        <p class="text-slate-600 dark:text-slate-400">
            {!! __('messages.pending_alert', ['count' => $pendingCount]) !!}
        </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        
        {{-- Card 1: Need Verification --}}
        <div class="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:border-amber-500/50 transition-all">
            <div class="absolute right-0 top-0 p-4 opacity-5 dark:opacity-10 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity">
                <span class="material-icons-outlined text-6xl text-amber-500">hourglass_empty</span>
            </div>
            <p class="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">{{ __('messages.need_verification') }}</p>
            <div class="flex items-baseline gap-2">
                <h3 class="text-3xl font-bold text-slate-900 dark:text-white">{{ $pendingCount }} {{ __('messages.files') }}</h3>
                @if($pendingCount > 0)
                <span class="text-[10px] font-medium px-2 py-0.5 rounded flex items-center gap-1 text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20">
                    <span class="material-icons-outlined text-[10px]">priority_high</span>
                    Urgent
                </span>
                @endif
            </div>
            <p class="text-xs text-slate-400 dark:text-slate-500 mt-2">Butuh tindakan segera</p>
        </div>

        {{-- Card 2: Total Students --}}
        <div class="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:border-indigo-600/50 transition-all">
            <div class="absolute right-0 top-0 p-4 opacity-5 dark:opacity-10 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity">
                <span class="material-icons-outlined text-6xl text-indigo-600">school</span>
            </div>
            <p class="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">{{ __('messages.total_students') }}</p>
            <div class="flex items-baseline gap-2">
                <h3 class="text-3xl font-bold text-slate-900 dark:text-white">{{ number_format($totalStudents) }}</h3>
                <span class="text-[10px] font-medium px-2 py-0.5 rounded flex items-center gap-1 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20">
                    <span class="material-icons-outlined text-[10px]">trending_up</span>
                    Active
                </span>
            </div>
            <p class="text-xs text-slate-400 dark:text-slate-500 mt-2">Terdaftar dalam sistem</p>
        </div>

        {{-- Card 3: Active Jobs --}}
        <div class="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:border-emerald-500/50 transition-all">
            <div class="absolute right-0 top-0 p-4 opacity-5 dark:opacity-10 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity">
                <span class="material-icons-outlined text-6xl text-emerald-500">work</span>
            </div>
            <p class="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">{{ __('messages.active_jobs') }}</p>
            <div class="flex items-baseline gap-2">
                <h3 class="text-3xl font-bold text-slate-900 dark:text-white">{{ $activeJobs }} {{ __('messages.positions') }}</h3>
            </div>
            <p class="text-xs text-slate-400 dark:text-slate-500 mt-2">Terbuka untuk pelamar</p>
        </div>

        {{-- Card 4: Partners --}}
        <div class="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:border-purple-500/50 transition-all">
            <div class="absolute right-0 top-0 p-4 opacity-5 dark:opacity-10 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity">
                <span class="material-icons-outlined text-6xl text-purple-500">handshake</span>
            </div>
            <p class="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">{{ __('messages.industry_partners') }}</p>
            <div class="flex items-baseline gap-2">
                <h3 class="text-3xl font-bold text-slate-900 dark:text-white">{{ $partnersCount }}</h3>
                <span class="text-[10px] font-medium px-2 py-0.5 rounded flex items-center gap-1 text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20">
                    Verified
                </span>
            </div>
            <p class="text-xs text-slate-400 dark:text-slate-500 mt-2">Kolaborasi aktif</p>
        </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        
        {{-- Table: Recent Requests --}}
        <div class="lg:col-span-2">
            <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden h-full flex flex-col">
                <div class="p-5 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                    <h3 class="text-lg font-semibold text-slate-900 dark:text-white">{{ __('messages.recent_requests') }}</h3>
                    <a href="{{ route('verification.index') }}" class="text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:underline">{{ __('messages.view_all') }}</a>
                </div>
                <div class="overflow-x-auto flex-1">
                    <table class="w-full text-left border-collapse">
                        <thead>
                            <tr class="text-[10px] font-semibold text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 uppercase tracking-wider">
                                <th class="px-5 py-3">Mahasiswa</th>
                                <th class="px-5 py-3">Berkas</th>
                                <th class="px-5 py-3">Kategori</th>
                                <th class="px-5 py-3 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                            @forelse($recentVerifications as $item)
                            <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                <td class="px-5 py-3">
                                    <div class="flex flex-col">
                                        <span class="font-semibold text-slate-900 dark:text-white">{{ $item->student->full_name }}</span>
                                        <span class="text-[10px] text-slate-500 uppercase">{{ $item->student->nim }}</span>
                                    </div>
                                </td>
                                <td class="px-5 py-3">
                                    <div class="flex flex-col">
                                        <span class="text-slate-700 dark:text-slate-300 font-medium truncate max-w-[150px]">{{ $item->title }}</span>
                                        <span class="text-[10px] text-slate-400 italic">...{{ substr($item->file_path, -15) }}</span>
                                    </div>
                                </td>
                                <td class="px-5 py-3">
                                    <span class="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-bold uppercase">
                                        {{ str_replace('_', ' ', $item->category) }}
                                    </span>
                                </td>
                                <td class="px-5 py-3 text-right">
                                    <a href="{{ route('verification.show', $item->id) }}" class="text-indigo-600 dark:text-indigo-400 hover:underline font-bold text-xs">
                                        Review
                                    </a>
                                </td>
                            </tr>
                            @empty
                            <tr>
                                <td colspan="4" class="px-5 py-8 text-center text-slate-500 text-sm">
                                    Tidak ada permintaan pending.
                                </td>
                            </tr>
                            @endforelse
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        {{-- Quick Actions --}}
        <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-5 h-full transition-colors flex flex-col">
            <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-4">{{ __('messages.quick_actions') }}</h3>
            <div class="space-y-3 flex-1">
                <a href="#" class="w-full flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg shadow-indigo-500/20 dark:shadow-indigo-500/30 hover:shadow-indigo-500/40 transition-all transform hover:-translate-y-0.5 group">
                    <div class="bg-white/20 p-2 rounded-lg">
                        <span class="material-icons-outlined text-xl">work</span>
                    </div>
                    <div class="text-left">
                        <p class="font-semibold text-sm">Tambah Lowongan</p>
                        <p class="text-xs text-indigo-100">Buat postingan pekerjaan baru</p>
                    </div>
                    <span class="material-icons-outlined ml-auto opacity-0 group-hover:opacity-100 transition-opacity">chevron_right</span>
                </a>

                <button class="w-full flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-500 hover:bg-amber-500/5 dark:hover:bg-amber-500/10 transition-all group">
                    <div class="bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-500 p-2 rounded-lg group-hover:bg-amber-500/20">
                        <span class="material-icons-outlined text-xl">cast_for_education</span>
                    </div>
                    <div class="text-left">
                        <p class="font-semibold text-sm text-slate-900 dark:text-white">Info Pelatihan</p>
                        <p class="text-xs text-slate-500">Kelola jadwal training</p>
                    </div>
                </button>

                <button class="w-full flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-pink-500 hover:bg-pink-500/5 dark:hover:bg-pink-500/10 transition-all group">
                    <div class="bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-500 p-2 rounded-lg group-hover:bg-pink-500/20">
                        <span class="material-icons-outlined text-xl">rocket_launch</span>
                    </div>
                    <div class="text-left">
                        <p class="font-semibold text-sm text-slate-900 dark:text-white">Proyek Industri</p>
                        <p class="text-xs text-slate-500">Buka kesempatan proyek</p>
                    </div>
                </button>
            </div>
        </div>
    </div>

    {{-- Charts Section --}}
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-5 transition-colors">
            <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-6">Kompetensi Unggulan</h3>
            <div id="competencyChart" class="h-64 w-full flex items-center justify-center"></div>
        </div>

        <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-5 transition-colors">
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-lg font-semibold text-slate-900 dark:text-white">Kesenjangan Skill (Skill Gap)</h3>
                <div class="flex flex-col sm:flex-row sm:items-center gap-3 text-[10px]">
                    <div class="flex items-center gap-1">
                        <span class="w-2.5 h-2.5 rounded-sm bg-indigo-600"></span>
                        <span class="text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Skill Mahasiswa</span>
                    </div>
                    <div class="flex items-center gap-1">
                        <span class="w-2.5 h-2.5 rounded-sm bg-slate-300 dark:bg-slate-600"></span>
                        <span class="text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Permintaan Industri</span>
                    </div>
                </div>
            </div>
            <div id="skillChart" class="h-64 w-full"></div>
        </div>
    </div>

    @push('scripts')
        <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
        <script>
            document.addEventListener('DOMContentLoaded', function () {
                const isDark = document.documentElement.classList.contains('dark');
                const textColor = isDark ? '#94a3b8' : '#64748b';

                // --- Chart 1: Competencies (Pie) ---
                const competencyOptions = {
                    series: @json($competencyData),
                    labels: @json($competencyLabels),
                    chart: {
                        type: 'donut',
                        height: 300,
                        fontFamily: 'inherit',
                        background: 'transparent'
                    },
                    colors: ['#4F46E5', '#10B981', '#F59E0B', '#EC4899', '#8B5CF6'],
                    stroke: { show: false },
                    dataLabels: { enabled: false },
                    legend: {
                        position: 'bottom',
                        labels: { colors: textColor }
                    },
                    tooltip: { theme: isDark ? 'dark' : 'light' },
                    plotOptions: {
                        pie: {
                            donut: {
                                size: '70%',
                                labels: {
                                    show: true,
                                    name: { color: textColor },
                                    value: { color: isDark ? '#fff' : '#1e293b' },
                                    total: {
                                        show: true,
                                        label: 'Total',
                                        color: textColor,
                                        formatter: function (w) {
                                            return w.globals.seriesTotals.reduce((a, b) => a + b, 0)
                                        }
                                    }
                                }
                            }
                        }
                    }
                };
                new ApexCharts(document.querySelector("#competencyChart"), competencyOptions).render();

                // --- Chart 2: Skill Gap (Bar) ---
                const skillOptions = {
                    series: [{
                        name: 'Skill Mahasiswa',
                        data: @json($skillData)
                    }, {
                        name: 'Permintaan Industri',
                        data: @json($industryDemandData)
                    }],
                    chart: {
                        type: 'bar',
                        height: 300,
                        toolbar: { show: false },
                        fontFamily: 'inherit',
                        background: 'transparent'
                    },
                    colors: ['#4F46E5', '#cbd5e1'],
                    plotOptions: {
                        bar: {
                            horizontal: false,
                            columnWidth: '55%',
                            borderRadius: 4
                        },
                    },
                    dataLabels: { enabled: false },
                    stroke: { show: true, width: 2, colors: ['transparent'] },
                    xaxis: {
                        categories: @json($skillLabels),
                        labels: { style: { colors: textColor, fontSize: '10px' } },
                        axisBorder: { show: false },
                        axisTicks: { show: false }
                    },
                    yaxis: { labels: { style: { colors: textColor } } },
                    grid: {
                        borderColor: isDark ? '#334155' : '#e2e8f0',
                        strokeDashArray: 4,
                    },
                    legend: { show: false },
                    tooltip: { theme: isDark ? 'dark' : 'light' }
                };
                new ApexCharts(document.querySelector("#skillChart"), skillOptions).render();
            });
        </script>
    @endpush
</x-app-layout>