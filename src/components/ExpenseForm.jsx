import React, { useState } from 'react';
import { useExpenses } from '../context/ExpenseContext';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function ExpenseForm() {
    const { addExpense } = useExpenses();
    const [formData, setFormData] = useState({
        title: '',
        amount: '',
        category: 'Food',
        date: new Date().toISOString().split('T')[0],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title || !formData.amount) return;

        addExpense({
            ...formData,
            amount: parseFloat(formData.amount),
        });

        setFormData(prev => ({ ...prev, title: '', amount: '' }));
    };

    const categories = ["Food", "Transport", "Utilities", "Entertainment", "Health", "Other"];

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Expense Title</label>
                <Input
                    placeholder="e.g., Grocery Shopping"
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Amount ($)</label>
                    <Input
                        type="number"
                        placeholder="0.00"
                        value={formData.amount}
                        onChange={e => setFormData({ ...formData, amount: e.target.value })}
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Category</label>
                    <select
                        className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 dark:border-slate-800 dark:bg-slate-950"
                        value={formData.category}
                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                    >
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Date</label>
                <Input
                    type="date"
                    value={formData.date}
                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                />
            </div>

            <Button type="submit" className="w-full">
                <Plus className="w-4 h-4 mr-2" /> Add Expense
            </Button>
        </form>
    );
}
