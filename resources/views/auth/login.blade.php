<x-guest-layout>
    <x-auth-session-status class="mb-4" :status="session('status')" />

    <div class="mb-6 text-center">
        <h2 class="text-2xl font-bold text-slate-900">Selamat Datang Kembali!</h2>
        <p class="text-slate-500 text-sm mt-1">Silakan masuk untuk mengakses akun Anda.</p>
    </div>

    <form method="POST" action="{{ route('login') }}">
        @csrf

        <div>
            <label for="email" class="block font-bold text-sm text-slate-700 mb-1">Email</label>
            <div class="relative">
                <i class="fa-regular fa-envelope absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
                <input id="email" class="block w-full pl-10 pr-4 py-3 bg-slate-50 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-blue-500 transition-all text-sm" 
                       type="email" name="email" :value="old('email')" required autofocus autocomplete="username" placeholder="nama@email.com" />
            </div>
            <x-input-error :messages="$errors->get('email')" class="mt-2" />
        </div>

        <div class="mt-5">
            <label for="password" class="block font-bold text-sm text-slate-700 mb-1">Password</label>
            <div class="relative">
                <i class="fa-solid fa-lock absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
                <input id="password" class="block w-full pl-10 pr-4 py-3 bg-slate-50 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-blue-500 transition-all text-sm" 
                       type="password" name="password" required autocomplete="current-password" placeholder="••••••••" />
            </div>
            <x-input-error :messages="$errors->get('password')" class="mt-2" />
        </div>

        <!-- <div class="flex items-center justify-between mt-4">
            <label for="remember_me" class="inline-flex items-center cursor-pointer">
                <input id="remember_me" type="checkbox" class="rounded border-slate-300 text-blue-600 shadow-sm focus:ring-blue-500" name="remember">
                <span class="ms-2 text-sm text-slate-600 font-medium">{{ __('Ingat Saya') }}</span>
            </label>

            @if (Route::has('password.request'))
                <a class="text-sm text-blue-600 hover:text-blue-800 font-bold hover:underline rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" href="{{ route('password.request') }}">
                    {{ __('Lupa Password?') }}
                </a>
            @endif
        </div> -->

        <div class="mt-6">
            <button class="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-all transform hover:-translate-y-0.5">
                {{ __('Masuk Sekarang') }}
            </button>
        </div>

        <div class="mt-6 text-center text-sm text-slate-500">
            Belum punya akun? 
            <a href="{{ route('register') }}" class="text-blue-600 font-bold hover:underline">Daftar disini</a>
        </div>
    </form>
</x-guest-layout>