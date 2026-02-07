<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\VerificationController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// --- SWITCH LANGUAGE ROUTE ---
Route::get('lang/{locale}', function ($locale) {
    if (in_array($locale, ['en', 'id'])) {
        session(['locale' => $locale]);
    }
    return redirect()->back();
})->name('lang.switch');


Route::get('/', function () {
    return view('welcome');
});

// Route Debugging
Route::get('/cek-php', function () {
    return [
        'File Config yang Dipakai' => php_ini_loaded_file(),
        'Batas Upload (upload_max_filesize)' => ini_get('upload_max_filesize'),
        'Batas Post (post_max_size)' => ini_get('post_max_size'),
    ];
});

// Group Route untuk User yang sudah Login & Terverifikasi Email
Route::middleware(['auth', 'verified'])->group(function () {
    
    // 👇 PERUBAHAN DI SINI (Dulu 'dashboard', sekarang 'home')
    // URL: /home, Name: home
    Route::get('/home', [DashboardController::class, 'index'])->name('home');

    // --- PROFILE ---
    Route::get('/admin/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/admin/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::patch('/admin/profile/avatar', [ProfileController::class, 'updateAvatar'])->name('profile.avatar');
    Route::delete('/admin/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // --- STUDENT PORTFOLIOS (Mahasiswa) ---
    Route::get('/portfolios', [PortfolioController::class, 'index'])->name('portfolio.index');
    Route::get('/portfolios/create', [PortfolioController::class, 'create'])->name('portfolio.create');
    Route::post('/portfolios', [PortfolioController::class, 'store'])->name('portfolio.store');
    
    // Detail Portfolio
    Route::get('/portfolio/{id}', [PortfolioController::class, 'show'])->name('portfolio.show');

    // --- COURSES (Placeholder) ---
    Route::get('/courses', function () {
        return "Halaman Course Belum Tersedia (Coming Soon)";
    })->name('courses.index');

    // --- ADMIN AREA ---
    Route::prefix('admin')->group(function () {
        
        // 2. DASHBOARD KHUSUS ADMIN (Tetap /admin/dashboard)
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('admin.dashboard');

        // Verification Resource
        Route::resource('verification', VerificationController::class)
            ->only(['index', 'show', 'update']);

        // --- HALAMAN CMS ---
        Route::get('/cms', [DashboardController::class, 'cms'])->name('cms.index');

        // --- TAMBAH ADMIN BARU ---
        Route::post('/create-admin', [DashboardController::class, 'storeAdmin'])->name('admin.create');
    });

});

require __DIR__.'/auth.php';