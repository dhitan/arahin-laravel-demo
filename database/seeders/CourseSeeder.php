<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Course;

class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Kategori: Web Development (Ini yang akan cocok dengan user Ghufroon)
        Course::create([
            'title' => 'Mastering Laravel 11: From Zero to Hero',
            'instructor' => 'Ghufroon Academy',
            'category' => 'Web Development',
            // Mengarah ke file yang kamu simpan di storage/app/public/thumbnails/laravel.jpg
            'thumbnail' => 'thumbnails/laravel.jpg', 
        ]);

        Course::create([
            'title' => 'React JS & Tailwind CSS Portfolio Build',
            'instructor' => 'Code with Me',
            'category' => 'Web Development',
            // Mengarah ke file yang kamu simpan di storage/app/public/thumbnails/react.jpg
            'thumbnail' => 'thumbnails/react.jpg',
        ]);

        Course::create([
            'title' => 'Fullstack Web Developer Bootcamp 2026',
            'instructor' => 'Udemy Pro',
            'category' => 'Web Development',
            'thumbnail' => 'thumbnails/fullstack.jpg', 
        ]);

        // 2. Kategori: UI/UX (Untuk tes kalau user minatnya beda)
        Course::create([
            'title' => 'Figma UI/UX Design Essentials',
            'instructor' => 'Design Masters',
            'category' => 'UI/UX',
            // Mengarah ke file yang kamu simpan di storage/app/public/thumbnails/figma.jpg
            'thumbnail' => 'thumbnails/figma.jpg',
        ]);

        Course::create([
            'title' => 'Adobe XD for Beginners',
            'instructor' => 'Creative Cloud',
            'category' => 'UI/UX',
            'thumbnail' => null,
        ]);

        // 3. Kategori: Data Science
        Course::create([
            'title' => 'Python for Data Science and Machine Learning',
            'instructor' => 'Data Camp',
            'category' => 'Data Science',
            'thumbnail' => null,
        ]);
    }
}