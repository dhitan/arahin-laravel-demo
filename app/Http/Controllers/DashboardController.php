<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        // Welcome message data
        $userName = auth()->user()->name ?? 'User';
        $progressPercentage = 70;

        // Current month for calendar
        $currentMonth = Carbon::now()->format('F Y');

        // Generate calendar days
        $calendarDays = $this->generateCalendarDays();

        // Sample certificates data
        $certificates = [
            [
                'name' => 'Mayowa Ade',
                'initials' => 'MA',
                'color' => 'orange',
                'message' => 'Hey! I just finished the first chapter',
                'attachments' => ['First Chapter of Project .doc'],
                'time' => '09:34 am'
            ],
            [
                'name' => 'Olawuyi Tobi',
                'initials' => 'OT',
                'color' => 'pink',
                'message' => 'Can you check out the formulas in these Images att...',
                'attachments' => ['Image .jpg', 'Form .jpg', 'Image 2 .jpg'],
                'time' => '12:30 pm'
            ],
            [
                'name' => 'Joshua Ashiru',
                'initials' => 'JA',
                'color' => 'green',
                'message' => 'Dear Ayo, You are yet to submit your assignment for chapt...',
                'attachments' => [],
                'time' => '15:30 pm'
            ],
        ];

        // Upcoming activities
        $upcomingActivities = [
            [
                'day' => '8',
                'color' => 'blue',
                'title' => 'Life Contingency Tutorials',
                'date' => '8th - 10th July 2021',
                'time' => '8 A.M - 9 A.M',
                'location' => 'Edulog Tutorial College, Blk 56, Lagos State.'
            ],
            [
                'day' => '13',
                'color' => 'pink',
                'title' => 'Social Insurance Test',
                'date' => '13th July 2021',
                'time' => '8 A.M - 9 A.M',
                'location' => 'School Hall, University Road, Lagos State'
            ],
            [
                'day' => '18',
                'color' => 'green',
                'title' => 'Adv. Maths Assignment Due',
                'date' => '18th July 2021',
                'time' => '8 A.M - 9 A.M',
                'location' => '**To be submitted via Email'
            ],
            [
                'day' => '23',
                'color' => 'orange',
                'title' => 'Dr. Dipo\'s Tutorial Class',
                'date' => '23rd July 2021',
                'time' => '10 A.M - 1 P.M',
                'location' => 'Edulog Tutorial College, Blk 56, Lagos State.'
            ],
        ];

        return view('dashboard', compact(
            'userName',
            'progressPercentage',
            'currentMonth',
            'calendarDays',
            'certificates',
            'upcomingActivities'
        ));
    }

    private function generateCalendarDays()
    {
        $now = Carbon::now();
        $startOfMonth = $now->copy()->startOfMonth();
        $endOfMonth = $now->copy()->endOfMonth();
        
        // Get the day of week for the first day (Monday = 1, Sunday = 7)
        $startDayOfWeek = $startOfMonth->dayOfWeekIso;
        
        $days = [];
        
        // Add empty cells for days before the month starts
        for ($i = 1; $i < $startDayOfWeek; $i++) {
            $days[] = ['date' => null, 'isToday' => false, 'hasActivity' => false];
        }
        
        // Add all days of the month
        for ($day = 1; $day <= $endOfMonth->day; $day++) {
            $isToday = ($day == $now->day);
            
            // Mark specific days with activities (matching the image)
            $hasActivity = in_array($day, [8, 13, 18, 23]);
            $activityColor = match($day) {
                8 => 'blue',
                13 => 'pink',
                18 => 'green',
                23 => 'orange',
                default => ''
            };
            
            $days[] = [
                'date' => $day,
                'isToday' => $isToday,
                'hasActivity' => $hasActivity,
                'activityColor' => $activityColor
            ];
        }
        
        return $days;
    }
}