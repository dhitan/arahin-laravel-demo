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
                    <p class="text-gray-600">You've learned <span class="font-semibold">{{ $progressPercentage }}%</span> of your goal this week!</p>
                    <p class="text-gray-600">Keep it up and improve your progress.</p>
                </div>
            </div>

            <!-- Performance Graphs -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <!-- First Performance Chart -->
                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="p-6">
                        <div class="flex justify-between items-center mb-4">
                            <h4 class="font-semibold text-lg text-gray-800">Performance</h4>
                            <select class="text-sm border-gray-300 rounded-md">
                                <option>Overall</option>
                                <option>This Week</option>
                                <option>This Month</option>
                            </select>
                        </div>
                        <canvas id="performanceChart1" height="200"></canvas>
                    </div>
                </div>

                <!-- Second Performance Chart -->
                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="p-6">
                        <div class="flex justify-between items-center mb-4">
                            <h4 class="font-semibold text-lg text-gray-800">Performance</h4>
                            <select class="text-sm border-gray-300 rounded-md">
                                <option>Overall</option>
                                <option>This Week</option>
                                <option>This Month</option>
                            </select>
                        </div>
                        <canvas id="performanceChart2" height="200"></canvas>
                    </div>
                </div>
            </div>

            <!-- Bottom Section: Calendar and Certificates -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                <!-- Certificates Section (2/3 width) -->
                <div class="lg:col-span-2">
                    <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div class="p-6">
                            <div class="flex justify-between items-center mb-4">
                                <h4 class="font-semibold text-lg text-gray-800">Certificate</h4>
                                <a href="#" class="text-sm text-indigo-600 hover:text-indigo-800">View All</a>
                            </div>
                            
                            <div class="space-y-4">
                                @forelse($certificates as $certificate)
                                <div class="flex items-start justify-between py-3 border-b border-gray-200 last:border-b-0">
                                    <div class="flex items-start space-x-3">
                                        <div class="flex-shrink-0">
                                            <div class="w-10 h-10 rounded-full bg-{{ $certificate['color'] }}-500 flex items-center justify-center text-white font-bold">
                                                {{ $certificate['initials'] }}
                                            </div>
                                        </div>
                                        <div class="flex-1">
                                            <h5 class="font-semibold text-gray-900">{{ $certificate['name'] }}</h5>
                                            <p class="text-sm text-gray-600 mt-1">{{ $certificate['message'] }}</p>
                                            @if(isset($certificate['attachments']))
                                            <div class="flex flex-wrap gap-2 mt-2">
                                                @foreach($certificate['attachments'] as $attachment)
                                                <span class="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-700 border border-gray-300">
                                                    📎 {{ $attachment }}
                                                </span>
                                                @endforeach
                                            </div>
                                            @endif
                                        </div>
                                    </div>
                                    <span class="text-xs text-gray-500 whitespace-nowrap ml-4">{{ $certificate['time'] }}</span>
                                </div>
                                @empty
                                <p class="text-gray-500 text-center py-4">No certificates available</p>
                                @endforelse
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Calendar and Activities Section (1/3 width) -->
                <div class="space-y-6">
                    <!-- Calendar -->
                    <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div class="p-6">
                            <div class="flex justify-between items-center mb-4">
                                <h4 class="font-semibold text-lg text-gray-800">My Progress</h4>
                                <span class="text-sm text-gray-600">{{ $currentMonth }}</span>
                            </div>
                            
                            <!-- Calendar Grid -->
                            <div class="grid grid-cols-7 gap-1 text-center text-sm">
                                <!-- Day Headers -->
                                @foreach(['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'] as $day)
                                <div class="font-semibold text-gray-600 py-2">{{ $day }}</div>
                                @endforeach
                                
                                <!-- Calendar Days -->
                                @foreach($calendarDays as $day)
                                <div class="aspect-square flex items-center justify-center">
                                    @if($day['date'])
                                    <button class="w-8 h-8 rounded-full flex items-center justify-center
                                        {{ $day['isToday'] ? 'bg-indigo-600 text-white font-semibold' : '' }}
                                        {{ $day['hasActivity'] && !$day['isToday'] ? 'bg-' . $day['activityColor'] . '-500 text-white font-semibold' : '' }}
                                        {{ !$day['hasActivity'] && !$day['isToday'] ? 'text-gray-700 hover:bg-gray-100' : '' }}
                                    ">
                                        {{ $day['date'] }}
                                    </button>
                                    @endif
                                </div>
                                @endforeach
                            </div>
                        </div>
                    </div>

                    <!-- Upcoming Activities -->
                    <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div class="p-6">
                            <div class="flex justify-between items-center mb-4">
                                <h4 class="font-semibold text-lg text-gray-800">Upcoming Activities</h4>
                                <a href="#" class="text-sm text-indigo-600 hover:text-indigo-800">See all</a>
                            </div>
                            
                            <div class="space-y-3">
                                @foreach($upcomingActivities as $activity)
                                <div class="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                                    <div class="flex-shrink-0">
                                        <div class="w-10 h-10 rounded-full bg-{{ $activity['color'] }}-500 flex items-center justify-center text-white font-bold text-sm">
                                            {{ $activity['day'] }}
                                        </div>
                                    </div>
                                    <div class="flex-1 min-w-0">
                                        <h5 class="font-semibold text-sm text-gray-900 truncate">{{ $activity['title'] }}</h5>
                                        <p class="text-xs text-gray-600 mt-1">{{ $activity['date'] }} ● {{ $activity['time'] }}</p>
                                        <p class="text-xs text-gray-500 mt-1 truncate">{{ $activity['location'] }}</p>
                                    </div>
                                </div>
                                @endforeach
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
        // Performance Chart Configuration
        const chartConfig = {
            type: 'line',
            data: {
                labels: ['1', '2', '3', '4'],
                datasets: [{
                    label: 'Performance',
                    data: [2.7, 2, 2.2, 3.7, 2.3],
                    borderColor: 'rgb(59, 130, 246)',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: 'rgb(59, 130, 246)',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 4,
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
                        max: 4,
                        ticks: {
                            stepSize: 0.5
                        }
                    }
                }
            }
        };

        // Initialize both charts
        const ctx1 = document.getElementById('performanceChart1').getContext('2d');
        new Chart(ctx1, chartConfig);

        const ctx2 = document.getElementById('performanceChart2').getContext('2d');
        new Chart(ctx2, chartConfig);
    </script>
    @endpush
</x-app-layout>