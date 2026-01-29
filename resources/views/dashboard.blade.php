<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Dashboard') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            
            <!-- Welcome Message -->
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6">
                <div class="p-6 text-gray-900">
                    <h3 class="text-2xl font-bold mb-2">Welcome back, {{ $userName }}! 👋</h3>
                    <p class="text-gray-600">
                        You have <span class="font-semibold text-green-600">{{ $approvedPortfolios }}</span> approved portfolios 
                        out of <span class="font-semibold">{{ $totalPortfolios }}</span> total submissions 
                        (<span class="font-semibold">{{ $progressPercentage }}%</span> approval rate).
                    </p>
                    <p class="text-gray-600">Keep building your portfolio and tracking your skills!</p>
                </div>
            </div>

            <!-- Performance Graphs -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <!-- Portfolio Submissions Chart -->
                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="p-6">
                        <div class="flex justify-between items-center mb-4">
                            <h4 class="font-semibold text-lg text-gray-800">Portfolio Submissions</h4>
                            <span class="text-sm text-gray-600">Last 4 Months</span>
                        </div>
                        <canvas id="portfolioChart" height="200"></canvas>
                        <div class="mt-4 text-center">
                            <p class="text-sm text-gray-600">Total: <span class="font-semibold">{{ $totalPortfolios }}</span> portfolios</p>
                        </div>
                    </div>
                </div>

                <!-- Skills Progress Chart -->
                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="p-6">
                        <div class="flex justify-between items-center mb-4">
                            <h4 class="font-semibold text-lg text-gray-800">Skills Progress</h4>
                            <span class="text-sm text-gray-600">Current Skills: {{ $skillsData['current'] }}</span>
                        </div>
                        <canvas id="skillsChart" height="200"></canvas>
                        <div class="mt-4 text-center">
                            <p class="text-sm text-gray-600">
                                <span class="font-semibold text-blue-600">{{ $skillsData['current'] }}</span> skills acquired
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Bottom Section: Portfolios and Calendar -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                <!-- Recent Portfolios Section (2/3 width) -->
                <div class="lg:col-span-2">
                    <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div class="p-6">
                            <div class="flex justify-between items-center mb-4">
                                <h4 class="font-semibold text-lg text-gray-800">Recent Portfolios</h4>
                                <a href="{{ route('dashboard') }}" class="text-sm text-indigo-600 hover:text-indigo-800">View All</a>
                            </div>
                            
                            <div class="space-y-4">
                                @forelse($certificates as $cert)
                                <div class="flex items-start justify-between py-3 border-b border-gray-200 last:border-b-0">
                                    <div class="flex items-start space-x-3">
                                        <div class="flex-shrink-0">
                                            <div class="w-10 h-10 rounded-full bg-{{ $cert['color'] }}-500 flex items-center justify-center text-white font-bold text-xs">
                                                {{ $cert['initials'] }}
                                            </div>
                                        </div>
                                        <div class="flex-1">
                                            <div class="flex items-center gap-2">
                                                <h5 class="font-semibold text-gray-900">{{ $cert['message'] }}</h5>
                                                <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium
                                                    {{ $cert['status'] === 'approved' ? 'bg-green-100 text-green-800' : '' }}
                                                    {{ $cert['status'] === 'pending' ? 'bg-yellow-100 text-yellow-800' : '' }}
                                                    {{ $cert['status'] === 'rejected' ? 'bg-red-100 text-red-800' : '' }}
                                                ">
                                                    {{ ucfirst($cert['status']) }}
                                                </span>
                                            </div>
                                            <p class="text-sm text-gray-600 mt-1">{{ Str::limit($cert['description'] ?? 'No description', 100) }}</p>
                                            <p class="text-xs text-gray-500 mt-1">Category: {{ $cert['name'] }}</p>
                                        </div>
                                    </div>
                                    <span class="text-xs text-gray-500 whitespace-nowrap ml-4">{{ $cert['time'] }}</span>
                                </div>
                                @empty
                                <div class="text-center py-8">
                                    <p class="text-gray-500 mb-2">No portfolios yet</p>
                                    <p class="text-sm text-gray-400">Start uploading your work to track your progress!</p>
                                </div>
                                @endforelse
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Calendar and Pending Items Section (1/3 width) -->
                <div class="space-y-6">
                    <!-- Calendar -->
                    <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div class="p-6">
                            <div class="flex justify-between items-center mb-4">
                                <h4 class="font-semibold text-lg text-gray-800">Activity Calendar</h4>
                                <span class="text-sm text-gray-600">{{ $currentMonth }}</span>
                            </div>
                            
                            <!-- Calendar Grid -->
                            <div class="grid grid-cols-7 gap-1 text-center text-xs">
                                <!-- Day Headers -->
                                @foreach(['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'] as $day)
                                <div class="font-semibold text-gray-600 py-2">{{ $day }}</div>
                                @endforeach
                                
                                <!-- Calendar Days -->
                                @foreach($calendarDays as $day)
                                <div class="aspect-square flex items-center justify-center">
                                    @if($day['date'])
                                    <button class="w-7 h-7 rounded-full flex items-center justify-center text-xs
                                        {{ $day['isToday'] ? 'bg-indigo-600 text-white font-semibold' : '' }}
                                        {{ $day['hasActivity'] && !$day['isToday'] ? 'bg-green-500 text-white font-semibold' : '' }}
                                        {{ !$day['hasActivity'] && !$day['isToday'] ? 'text-gray-700 hover:bg-gray-100' : '' }}
                                    ">
                                        {{ $day['date'] }}
                                    </button>
                                    @endif
                                </div>
                                @endforeach
                            </div>
                            
                            <div class="mt-4 flex items-center gap-3 text-xs">
                                <div class="flex items-center gap-1">
                                    <div class="w-3 h-3 rounded-full bg-indigo-600"></div>
                                    <span class="text-gray-600">Today</span>
                                </div>
                                <div class="flex items-center gap-1">
                                    <div class="w-3 h-3 rounded-full bg-green-500"></div>
                                    <span class="text-gray-600">Submitted</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Pending Reviews -->
                    <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div class="p-6">
                            <div class="flex justify-between items-center mb-4">
                                <h4 class="font-semibold text-lg text-gray-800">Pending Reviews</h4>
                                @if($upcomingActivities->count() > 0)
                                <span class="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-semibold">
                                    {{ $upcomingActivities->count() }}
                                </span>
                                @endif
                            </div>
                            
                            <div class="space-y-3">
                                @forelse($upcomingActivities as $activity)
                                <div class="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                                    <div class="flex-shrink-0">
                                        <div class="w-10 h-10 rounded-full bg-{{ $activity['color'] }}-500 flex items-center justify-center text-white font-bold text-xs">
                                            {{ $activity['day'] }}
                                        </div>
                                    </div>
                                    <div class="flex-1 min-w-0">
                                        <h5 class="font-semibold text-sm text-gray-900 truncate">{{ $activity['title'] }}</h5>
                                        <p class="text-xs text-gray-600 mt-1">{{ $activity['date'] }}</p>
                                        <p class="text-xs text-yellow-600 font-medium mt-1">⏳ {{ $activity['time'] }}</p>
                                        <p class="text-xs text-gray-500 mt-1 truncate">{{ $activity['location'] }}</p>
                                    </div>
                                </div>
                                @empty
                                <div class="text-center py-6">
                                    <p class="text-gray-500 text-sm">✅ All caught up!</p>
                                    <p class="text-xs text-gray-400 mt-1">No pending reviews</p>
                                </div>
                                @endforelse
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    @push('scripts')
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script>
        // Portfolio Submissions Chart
        const portfolioCtx = document.getElementById('portfolioChart').getContext('2d');
        const portfolioData = @json($chartData);
        
        new Chart(portfolioCtx, {
            type: 'line',
            data: {
                labels: portfolioData.map(d => d.label),
                datasets: [{
                    label: 'Submissions',
                    data: portfolioData.map(d => d.count),
                    borderColor: 'rgb(59, 130, 246)',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: 'rgb(59, 130, 246)',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 5,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });

        // Skills Progress Chart
        const skillsCtx = document.getElementById('skillsChart').getContext('2d');
        const skillsData = @json($skillsData);
        
        new Chart(skillsCtx, {
            type: 'line',
            data: {
                labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                datasets: [{
                    label: 'Skills Acquired',
                    data: skillsData.progression,
                    borderColor: 'rgb(34, 197, 94)',
                    backgroundColor: 'rgba(34, 197, 94, 0.1)',
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: 'rgb(34, 197, 94)',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 5,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });
    </script>
    @endpush
</x-app-layout>