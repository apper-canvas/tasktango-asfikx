import { useState } from 'react';
import { Plus, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const Home = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Complete project proposal', status: 'completed', dueDate: '2023-10-15' },
    { id: 2, title: 'Review team designs', status: 'in-progress', dueDate: '2023-10-20' },
    { id: 3, title: 'Schedule client meeting', status: 'pending', dueDate: '2023-10-22' },
    { id: 4, title: 'Update documentation', status: 'in-progress', dueDate: '2023-10-25' },
  ]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle size={18} className="text-green-500" />;
      case 'in-progress': return <Clock size={18} className="text-amber-500" />;
      case 'pending': return <AlertCircle size={18} className="text-red-500" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button className="btn btn-primary flex items-center gap-2">
          <Plus size={18} /> Add Task
        </button>
      </div>

      <div className="card p-6">
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
  );
};

export default Home;