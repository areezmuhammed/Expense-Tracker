import React from 'react';
import { Wallet } from 'lucide-react';

export function Navbar() {
    return (
        <nav className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-indigo-600 rounded-lg">
                            <Wallet className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                            ExpenseTracker
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-slate-500">Welcome back!</span>
                        <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800" />
                    </div>
                </div>
            </div>
        </nav>
    );
}
