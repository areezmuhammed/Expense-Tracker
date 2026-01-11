import React from 'react';
import { useExpenses } from '../context/ExpenseContext';
import { Button } from './ui/Button';
import { Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';

export function ExpenseList() {
    const { expenses, deleteExpense } = useExpenses();

    const sortedExpenses = [...expenses].sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <div className="space-y-4">
            <AnimatePresence>
                {sortedExpenses.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-8 text-slate-500"
                    >
                        No expenses recorded yet.
                    </motion.div>
                ) : (
                    sortedExpenses.map((expense) => (
                        <motion.div
                            key={expense.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 group"
                        >
                            <div className="flex flex-col">
                                <span className="font-medium text-slate-900 dark:text-slate-100">{expense.title}</span>
                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                    <span className="px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                                        {expense.category}
                                    </span>
                                    <span>{format(new Date(expense.date), 'MMM d, yyyy')}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="font-semibold text-slate-900 dark:text-slate-100">
                                    -${expense.amount.toFixed(2)}
                                </span>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => deleteExpense(expense.id)}
                                    className="text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </motion.div>
                    ))
                )}
            </AnimatePresence>
        </div>
    );
}
