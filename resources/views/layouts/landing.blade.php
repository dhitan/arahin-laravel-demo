<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ config('app.name', 'Arahin.id') }} - Ekosistem Validasi Kompetensi</title>
    
    {{-- Favicon (Update ke .png) --}}
    <link rel="icon" href="{{ asset('favicon.png') }}">

    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    
    <style>
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
        .glass-nav {
            background: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(10px);
            border-bottom: 1px solid rgba(226, 232, 240, 0.8);
        }
        .hero-gradient {
            background: radial-gradient(circle at top right, #e0f2fe, transparent),
                        radial-gradient(circle at bottom left, #eff6ff, transparent);
        }
        .card-shelf {
            transition: transform 0.3s ease;
        }
        .card-shelf:hover {
            transform: translateY(-10px);
        }
    </style>
</head>
<body class="bg-white text-slate-900">

    <nav class="fixed w-full z-50 glass-nav">
        <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            
            {{-- LOGO BARU: Arahin.id (Pakai Image) --}}
            <div class="flex items-center gap-2">
                <img src="{{ asset('favicon.png') }}" alt="Logo" class="w-10 h-10 object-contain">
                
                <span class="text-2xl font-extrabold text-slate-900 tracking-tight">
                    Arahin<span class="text-blue-600">.id</span>
                </span>
            </div>

            <div class="hidden md:flex items-center gap-8 font-semibold text-slate-600">
                <a href="#" class="hover:text-blue-600 transition">Beranda</a>
                <a href="#solusi" class="hover:text-blue-600 transition">Solusi</a>
                <a href="#fitur" class="hover:text-blue-600 transition">Fitur</a>
                <a href="#kontak" class="hover:text-blue-600 transition">Kontak</a>
            </div>
            
            <div class="flex items-center gap-4">
                @if (Route::has('login'))
                    @auth
                        <a href="{{ route('home') }}" class="px-6 py-2.5 font-bold text-blue-600 hover:text-blue-700">Dashboard</a>
                    @else
                        <a href="{{ route('login') }}" class="px-6 py-2.5 font-bold text-blue-600 hover:text-blue-700">Masuk</a>

                        @if (Route::has('register'))
                            <a href="{{ route('register') }}" class="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-full shadow-lg shadow-blue-200 hover:bg-blue-700 transition">Daftar Sekarang</a>
                        @endif
                    @endauth
                @endif
            </div>
        </div>
    </nav>

    <main>
        {{-- Ini adalah tempat konten (Hero, Features, dll) akan muncul --}}
        @yield('content')
    </main>

    <footer id="kontak" class="bg-white pt-20 pb-10 border-t border-slate-100">
        <div class="max-w-7xl mx-auto px-6 text-center">
            <h2 class="text-3xl font-extrabold mb-4 text-blue-900">Siap Menjadi Lulusan Berdaya Saing?</h2>
            <p class="text-slate-600 mb-10 max-w-xl mx-auto">Bergabunglah dengan ekosistem digital Arahin.id dan tunjukkan kompetensi nyata Anda kepada industri.</p>
            
            @if (Route::has('register'))
                <a href="{{ route('register') }}" class="px-10 py-4 bg-blue-600 text-white font-bold rounded-xl shadow-xl shadow-blue-200 hover:bg-blue-700 transition mb-20 inline-block">
                    Daftar Gratis Sekarang
                </a>
            @endif

            <div class="flex justify-between items-center border-t border-slate-100 pt-10 text-slate-400 text-sm font-medium">
                <div>© {{ date('Y') }} Arahin.id Project. Semua Hak Dilindungi.</div>
                <div class="flex gap-6">
                    <a href="#" class="hover:text-blue-600">Syarat & Ketentuan</a>
                    <a href="#" class="hover:text-blue-600">Kebijakan Privasi</a>
                </div>
            </div>
        </div>
    </footer>

</body>
</html>