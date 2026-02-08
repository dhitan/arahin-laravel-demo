import React from 'react';
import { Head } from '@inertiajs/react';

export default function Test() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Head title="Inertia Test" />
            <div className="p-8 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Inertia.js Works! 🚀</h1>
                <p className="text-gray-600">
                    If you can see this, your Laravel + React + Inertia setup is complete.
                </p>
            </div>
        </div>
    );
}
