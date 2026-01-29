<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class DashboardDemoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get the existing user (Dhitan Hakim - user_id: 1)
        $userId = 1;

        // Create student profile for existing user
        $studentId = DB::table('students')->insertGetId([
            'user_id' => $userId,
            'nim' => '2021110001',
            'full_name' => 'Dhitan Hakim',
            'email' => 'dhitanakim@gmail.com',
            'phone' => '081234567890',
            'major' => 'Computer Science',
            'year_of_entry' => 2021,
        ]);

        // Create skills
        $skills = [
            ['skill_name' => 'Laravel'],
            ['skill_name' => 'PHP'],
            ['skill_name' => 'JavaScript'],
            ['skill_name' => 'React'],
            ['skill_name' => 'Python'],
            ['skill_name' => 'Machine Learning'],
            ['skill_name' => 'UI/UX Design'],
            ['skill_name' => 'Database Design'],
        ];

        $skillIds = [];
        foreach ($skills as $skill) {
            $skillIds[] = DB::table('skills')->insertGetId($skill);
        }

        // Assign some skills to student
        foreach (array_slice($skillIds, 0, 5) as $skillId) {
            DB::table('student_skills')->insert([
                'student_id' => $studentId,
                'skill_id' => $skillId,
            ]);
        }

        // Create portfolios with various dates in January 2026
        $portfolios = [
            // Certificates
            [
                'student_id' => $studentId,
                'title' => 'Laravel Fundamentals Certificate',
                'description' => 'Completed advanced Laravel development course',
                'file_path' => 'portfolios/laravel_cert.pdf',
                'category' => 'sertifikat',
                'status' => 'approved',
                'admin_feedback' => 'Great work! Certificate verified.',
                'verified_at' => Carbon::now()->subDays(5),
                'created_at' => Carbon::create(2026, 1, 8, 9, 30),
            ],
            [
                'student_id' => $studentId,
                'title' => 'AWS Cloud Practitioner',
                'description' => 'AWS certification for cloud computing',
                'file_path' => 'portfolios/aws_cert.pdf',
                'category' => 'sertifikat',
                'status' => 'approved',
                'admin_feedback' => 'Excellent achievement!',
                'verified_at' => Carbon::now()->subDays(10),
                'created_at' => Carbon::create(2026, 1, 13, 14, 15),
            ],
            [
                'student_id' => $studentId,
                'title' => 'UI/UX Design Bootcamp',
                'description' => 'Completed 3-month intensive bootcamp',
                'file_path' => 'portfolios/uiux_cert.pdf',
                'category' => 'sertifikat',
                'status' => 'pending',
                'admin_feedback' => null,
                'verified_at' => null,
                'created_at' => Carbon::create(2026, 1, 27, 10, 0),
            ],

            // College Projects
            [
                'student_id' => $studentId,
                'title' => 'E-Commerce Web Application',
                'description' => 'Final project for Web Development course',
                'file_path' => 'portfolios/ecommerce_project.zip',
                'category' => 'proyek_kuliah',
                'status' => 'approved',
                'admin_feedback' => 'Well-structured project. Good use of Laravel.',
                'verified_at' => Carbon::now()->subDays(3),
                'created_at' => Carbon::create(2026, 1, 18, 16, 20),
            ],
            [
                'student_id' => $studentId,
                'title' => 'Machine Learning Model - Sentiment Analysis',
                'description' => 'Analyzed social media sentiment using Python',
                'file_path' => 'portfolios/ml_project.zip',
                'category' => 'proyek_kuliah',
                'status' => 'approved',
                'admin_feedback' => 'Impressive accuracy rate!',
                'verified_at' => Carbon::now()->subDays(8),
                'created_at' => Carbon::create(2026, 1, 15, 11, 45),
            ],
            [
                'student_id' => $studentId,
                'title' => 'Database Design - University System',
                'description' => 'Designed complete database schema for university management',
                'file_path' => 'portfolios/db_project.pdf',
                'category' => 'proyek_kuliah',
                'status' => 'pending',
                'admin_feedback' => null,
                'verified_at' => null,
                'created_at' => Carbon::create(2026, 1, 23, 13, 30),
            ],

            // Free Portfolio
            [
                'student_id' => $studentId,
                'title' => 'Personal Portfolio Website',
                'description' => 'Built responsive portfolio using React and Tailwind',
                'file_path' => 'portfolios/personal_portfolio.zip',
                'category' => 'portofolio_bebas',
                'status' => 'approved',
                'admin_feedback' => 'Clean design and good code quality.',
                'verified_at' => Carbon::now()->subDays(12),
                'created_at' => Carbon::create(2026, 1, 10, 15, 10),
            ],
            [
                'student_id' => $studentId,
                'title' => 'Mobile App - Expense Tracker',
                'description' => 'React Native app for tracking daily expenses',
                'file_path' => 'portfolios/expense_tracker.zip',
                'category' => 'portofolio_bebas',
                'status' => 'pending',
                'admin_feedback' => null,
                'verified_at' => null,
                'created_at' => Carbon::create(2026, 1, 25, 9, 0),
            ],
            [
                'student_id' => $studentId,
                'title' => 'Open Source Contribution - Laravel Package',
                'description' => 'Contributed to Laravel community package',
                'file_path' => 'portfolios/opensource_contrib.pdf',
                'category' => 'portofolio_bebas',
                'status' => 'approved',
                'admin_feedback' => 'Great contribution to open source!',
                'verified_at' => Carbon::now()->subDays(15),
                'created_at' => Carbon::create(2026, 1, 5, 14, 0),
            ],
        ];

        foreach ($portfolios as $portfolio) {
            DB::table('portfolios')->insert($portfolio);
        }
// dari claude sonnet. sek
        $this->command->info('✅ Dashboard demo data seeded successfully!');
        $this->command->info('📊 Created:');
        $this->command->info('   - 1 Student profile');
        $this->command->info('   - 8 Skills');
        $this->command->info('   - 9 Portfolios (6 approved, 3 pending)');
        $this->command->info('   - 5 Student-Skill relationships');
    }
}