import React from 'react';
import { ExpenseProvider } from './context/ExpenseContext';
import { Layout } from './components/Layout';
import { Card } from './components/ui/Card';
import { ExpenseForm } from './components/ExpenseForm';
import { ExpenseList } from './components/ExpenseList';
import { Dashboard } from './components/Dashboard';
import { SavingsRecommender } from './components/SavingsRecommender';

function App() {
  return (
    <ExpenseProvider>
      <Layout>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Input & List */}
          <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 shadow-lg shadow-indigo-500/5 border-indigo-100/50">
                <h2 className="text-lg font-bold mb-4 text-slate-900 dark:text-slate-100">Add New Expense</h2>
                <ExpenseForm />
              </Card>
              <SavingsRecommender />
            </div>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Transaction History</h2>
              </div>
              <ExpenseList />
            </Card>
          </div>

          {/* Right Column - Dashboard */}
          <div className="space-y-8">
            <Dashboard />
          </div>
        </div>
      </Layout>
    </ExpenseProvider>
  );
}

export default App;
