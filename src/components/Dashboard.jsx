import React from 'react';
import { useExpenses } from '../context/ExpenseContext';
import { Card } from './ui/Card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export function Dashboard() {
    const { expenses } = useExpenses();

    const totalSpent = expenses.reduce((acc, curr) => acc + curr.amount, 0);

    const data = expenses.reduce((acc, curr) => {
        const existing = acc.find(item => item.name === curr.category);
        if (existing) {
            existing.value += curr.amount;
        } else {
            acc.push({ name: curr.category, value: curr.amount });
        }
        return acc;
    }, []);

    const COLORS = ['#6366f1', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6'];

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card className="p-6 bg-gradient-to-br from-indigo-500 to-violet-600 text-white border-none">
                    <p className="text-indigo-100 text-sm font-medium">Total Spent</p>
                    <h3 className="text-3xl font-bold mt-2">${totalSpent.toFixed(2)}</h3>
                    <p className="text-indigo-100 text-xs mt-1">+12% from last month</p>
                </Card>
                <Card className="p-6">
                    <p className="text-slate-500 text-sm font-medium">Monthly Budget</p>
                    <h3 className="text-3xl font-bold mt-2 text-slate-900 dark:text-slate-100">$2,000.00</h3>
                    <div className="w-full bg-slate-200 rounded-full h-2.5 dark:bg-slate-700 mt-4">
                        <div
                            className="bg-indigo-600 h-2.5 rounded-full"
                            style={{ width: `${Math.min((totalSpent / 2000) * 100, 100)}%` }}
                        ></div>
                    </div>
                </Card>
            </div>

            <Card className="p-6">
                <h3 className="text-lg font-bold mb-4 text-slate-900 dark:text-slate-100">Spending Breakdown</h3>
                <div className="h-64 mt-4 text-xs">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                itemStyle={{ color: '#1e293b' }}
                            />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </Card>
        </div>
    );
}
