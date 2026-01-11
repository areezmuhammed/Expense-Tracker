import React from 'react';
import { cn } from '../../lib/utils'; // We need to create this utility

export function Card({ className, children, ...props }) {
    return (
        <div
            className={cn(
                "bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
