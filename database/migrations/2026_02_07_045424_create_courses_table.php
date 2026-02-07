<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 1. Membuat Tabel Courses
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->string('title');                    // Judul Course
            $table->string('instructor');               // Nama Pengajar
            $table->string('thumbnail')->nullable();    // Foto Cover (Boleh kosong)
            $table->string('category');                 // 👈 PENTING: Untuk pencocokan rekomendasi
            $table->timestamps();
        });

        // 2. Update Tabel Users (Menambah kolom interest)
        // Kita butuh kolom ini untuk menyimpan minat user (misal: "Web Development")
        if (Schema::hasTable('users') && !Schema::hasColumn('users', 'interest')) {
            Schema::table('users', function (Blueprint $table) {
                $table->string('interest')->nullable()->after('email');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Hapus tabel courses
        Schema::dropIfExists('courses');

        // Hapus kolom interest dari users saat rollback
        if (Schema::hasTable('users') && Schema::hasColumn('users', 'interest')) {
            Schema::table('users', function (Blueprint $table) {
                $table->dropColumn('interest');
            });
        }
    }
};