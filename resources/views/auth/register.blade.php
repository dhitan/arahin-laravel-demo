<x-guest-layout>
    <div class="mb-6 text-center">
        <h2 class="text-2xl font-bold text-slate-900">Buat Akun Baru</h2>
        <p class="text-slate-500 text-sm mt-1">Bergabunglah dengan ekosistem KKM.</p>
    </div>

    <form method="POST" action="{{ route('register') }}">
        @csrf

        <div>
            <label for="name" class="block font-bold text-sm text-slate-700 mb-1">Nama Lengkap</label>
            <div class="relative">
                <i class="fa-regular fa-user absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
                <input id="name" class="block w-full pl-10 pr-4 py-3 bg-slate-50 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-blue-500 transition-all text-sm" 
                       type="text" name="name" :value="old('name')" required autofocus autocomplete="name" placeholder="John Doe" />
            </div>
            <x-input-error :messages="$errors->get('name')" class="mt-2" />
        </div>

        <div class="mt-4">
            <label for="email" class="block font-bold text-sm text-slate-700 mb-1">Email</label>
            <div class="relative">
                <i class="fa-regular fa-envelope absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
                <input id="email" class="block w-full pl-10 pr-4 py-3 bg-slate-50 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-blue-500 transition-all text-sm" 
                       type="email" name="email" :value="old('email')" required autocomplete="username" placeholder="nama@email.com" />
            </div>
            <x-input-error :messages="$errors->get('email')" class="mt-2" />
        </div>

        <div class="mt-4">
            <label for="password" class="block font-bold text-sm text-slate-700 mb-1">Password</label>
            <div class="relative">
                <i class="fa-solid fa-lock absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
                <input id="password" class="block w-full pl-10 pr-4 py-3 bg-slate-50 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-blue-500 transition-all text-sm" 
                       type="password" name="password" required autocomplete="new-password" placeholder="••••••••" />
            </div>
            <x-input-error :messages="$errors->get('password')" class="mt-2" />
        </div>

        <div class="mt-4">
            <label for="password_confirmation" class="block font-bold text-sm text-slate-700 mb-1">Konfirmasi Password</label>
            <div class="relative">
                <i class="fa-solid fa-lock absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
                <input id="password_confirmation" class="block w-full pl-10 pr-4 py-3 bg-slate-50 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-blue-500 transition-all text-sm" 
                       type="password" name="password_confirmation" required autocomplete="new-password" placeholder="••••••••" />
            </div>
            <x-input-error :messages="$errors->get('password_confirmation')" class="mt-2" />
        </div>

        <div class="mt-6">
            <button class="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-all transform hover:-translate-y-0.5">
                {{ __('Daftar Sekarang') }}
            </button>
        </div>

        <div class="mt-6 text-center text-sm text-slate-500">
            Sudah punya akun? 
            <a href="{{ route('login') }}" class="text-blue-600 font-bold hover:underline">Masuk disini</a>
        </div>
    </form>
</x-guest-layout>