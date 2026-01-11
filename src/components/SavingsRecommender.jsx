import React, { useMemo } from 'react';
import { useExpenses } from '../context/ExpenseContext';
import { Card } from './ui/Card';
import { Lightbulb, TrendingDown, Coffee } from 'lucide-react';
import { motion } from 'framer-motion';

export function SavingsRecommender() {
    const { expenses } = useExpenses();

    const recommendations = useMemo(() => {
        const tips = [];
        const totalSpent = expenses.reduce((acc, curr) => acc + curr.amount, 0);
        const categories = expenses.reduce((acc, curr) => {
            acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
            return acc;
        }, {});

        if (categories['Food'] > 500) {
            tips.push({
                id: 'food',
                icon: <Coffee className="w-5 h-5 text-orange-500" />,
                title: "High Food Spending",
                desc: `You've spent $${categories['Food'].toFixed(0)} on food. Cooking at home could save you ~$150 this month.`,
                color: "bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300"
            });
        }

        if (categories['Entertainment'] > 200) {
            tips.push({
                id: 'ent',
                icon: <TrendingDown className="w-5 h-5 text-purple-500" />,
                title: "Entertainment Alert",
                desc: "Consider switching one paid subscription to a free alternative.",
                color: "bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300"
            });
        }

        if (totalSpent > 1500 && tips.length === 0) {
            tips.push({
                id: 'general',
                icon: <Lightbulb className="w-5 h-5 text-yellow-500" />,
                title: "General Savings",
                desc: "You're on track! Try to set aside 20% of your income into a savings account.",
                color: "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300"
            });
        }

        if (expenses.length === 0) {
            return [{
                id: 'start',
                icon: <Lightbulb className="w-5 h-5 text-blue-500" />,
                title: "Start Tracking",
                desc: "Add your first expense to generate personalized savings tips!",
                color: "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
            }];
        }

        return tips;
    }, [expenses]);

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-500" /> Smart Recommendations
            </h3>
            <div className="grid gap-3">
                {recommendations.map((rec) => (
                    <motion.div
                        key={rec.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`p-4 rounded-lg flex gap-4 items-start ${rec.color}`}
                    >
                        <div className="mt-1">{rec.icon}</div>
                        <div>
                            <p className="font-semibold text-sm">{rec.title}</p>
                            <p className="text-xs opacity-90">{rec.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
