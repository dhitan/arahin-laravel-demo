<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Arahin.id') }}</title>

    {{-- Favicon (Update ke .png) --}}
    <link rel="icon" href="{{ asset('favicon.png') }}">

    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">

    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
        .hero-gradient {
            background: radial-gradient(circle at top right, #e0f2fe, transparent),
                        radial-gradient(circle at bottom left, #eff6ff, transparent);
        }
    </style>
</head>
<body class="font-sans text-slate-900 antialiased hero-gradient min-h-screen flex flex-col justify-center items-center pt-6 sm:pt-0">
    
    <div class="mb-8">
        <a href="/" class="flex items-center gap-2 group">
            {{-- Logo Image (Menggantikan Icon Kotak Biru) --}}
            <img src="{{ asset('favicon.png') }}" alt="Logo" class="w-14 h-14 object-contain group-hover:scale-110 transition-transform duration-300">
            
            {{-- Teks Logo --}}
            <span class="text-3xl font-extrabold text-slate-900 tracking-tight group-hover:text-blue-600 transition">
                Arahin<span class="text-blue-600">.id</span>
            </span>
        </a>
    </div>

    <div class="w-full sm:max-w-md px-8 py-8 bg-white shadow-2xl shadow-blue-100 rounded-3xl border border-white/50 relative overflow-hidden">
        {{-- Garis Gradient di Atas Card --}}
        <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-600"></div>
        {{ $slot }}
    </div>

    <div class="mt-8 text-center text-sm text-slate-400 font-medium">
        &copy; {{ date('Y') }} Arahin.id Project.
    </div>

</body>
</html>