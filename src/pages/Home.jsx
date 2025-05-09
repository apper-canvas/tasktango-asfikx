import { useState } from 'react';
import { Plus, CheckCircle, Clock, AlertCircle, BarChart2, Calendar, Star } from 'lucide-react';

const Home = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Complete project proposal', status: 'completed', dueDate: '2023-10-15' },
    { id: 2, title: 'Review team designs', status: 'in-progress', dueDate: '2023-10-20' },
    { id: 3, title: 'Schedule client meeting', status: 'pending', dueDate: '2023-10-22' },
    { id: 4, title: 'Update documentation', status: 'in-progress', dueDate: '2023-10-25' },
    { id: 5, title: 'Finalize budget proposal', status: 'pending', dueDate: '2023-10-28' },
    { id: 6, title: 'Weekly team check-in', status: 'completed', dueDate: '2023-10-18' },
  ]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle size={18} className="text-green-500" />;
      case 'in-progress': return <Clock size={18} className="text-amber-500" />;
      case 'pending': return <AlertCircle size={18} className="text-red-500" />;
      default: return null;
    }
  };
  
  // Stats for quick summary widgets
  const stats = [
    { title: 'Total Tasks', value: tasks.length, icon: <Star className="text-amber-500" size={18} /> },
    { title: 'Completed', value: tasks.filter(t => t.status === 'completed').length, icon: <CheckCircle className="text-green-500" size={18} /> },
    { title: 'In Progress', value: tasks.filter(t => t.status === 'in-progress').length, icon: <Clock className="text-amber-500" size={18} /> }
  ];

  return (
    <div className="dashboard-layout">
      <div className="space-y-6 flex-1">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <button className="btn btn-primary flex items-center gap-2">
            <Plus size={18} /> Add Task
          </button>
        </div>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {stats.map((stat, index) => (
            <div key={index} className="card p-4 flex items-center justify-between">
              <div>
                <p className="text-surface-500 dark:text-surface-400 text-sm font-medium">{stat.title}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className="bg-surface-100 dark:bg-surface-700 p-3 rounded-lg">
                {stat.icon}
              </div>
            </div>
          ))}
        </div>

        <div className="card p-5">
          <h2 className="text-xl font-semibold mb-4">Recent Tasks</h2>
          <div className="divide-y divide-surface-200 dark:divide-surface-700">
            {tasks.map(task => (
              <div key={task.id} className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getStatusIcon(task.status)}
                  <span className="font-medium">{task.title}</span>
                </div>
                <span className="text-sm text-surface-500">Due: {task.dueDate}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Sidebar complement - only visible on wider screens */}
      <div className="hidden lg:block w-80 space-y-6">
        <div className="card p-5">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Calendar size={18} className="text-primary" />
            <span>Upcoming</span>
          </h3>
          <div className="space-y-3">
            <p className="text-sm text-surface-600 dark:text-surface-400">Tomorrow</p>
            <div className="flex items-center gap-2 py-2 border-b border-surface-200 dark:border-surface-700">
              <Clock size={16} className="text-amber-500" />
              <span>Review team designs</span>
            </div>
            <p className="text-sm text-surface-600 dark:text-surface-400">Next Week</p>
            <div className="flex items-center gap-2 py-2">
              <AlertCircle size={16} className="text-red-500" />
              <span>Finalize budget proposal</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;