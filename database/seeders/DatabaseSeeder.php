<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Student;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 0. Panggil Seeder Course (Agar data course muncul untuk rekomendasi)
        $this->call(CourseSeeder::class);

        // 1. GENESIS ADMIN (Akun Dewa/Utama)
        // Ini adalah admin pertama yang dibuat lewat kodingan.
        User::create([
            'name' => 'Super Admin',
            'email' => 'admin@arahin.id', // Sesuaikan dengan brand baru
            'password' => Hash::make('password'),
            'role' => 'admin',
            'email_verified_at' => now(),
        ]);

        // 2. AKUN MAHASISWA DUMMY (Untuk Testing Rekomendasi)
        $mhs = User::create([
            'name' => 'Ghufroon Mahasiswa',
            'email' => 'ghufroon@student.com', // Email untuk login
            'password' => Hash::make('password'),
            'role' => 'mahasiswa',
            'email_verified_at' => now(),
            
            // 👇 PENTING: Kita set minatnya 'Web Development'
            // Agar sistem bisa mencocokkan dengan course kategori 'Web Development'
            'interest' => 'Web Development', 
        ]);

        // Penting: Buat data detail di tabel 'students' agar dashboard tidak error
        Student::create([
            'user_id' => $mhs->id,
            'nim' => '12345678',
            'full_name' => 'Ghufroon Mahasiswa',
        ]);
    }
}