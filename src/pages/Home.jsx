import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import MainFeature from '../components/MainFeature';
import getIcon from '../utils/iconUtils';
import { motion } from 'framer-motion';

const Home = () => {
  const [statistics, setStatistics] = useState({
    total: 0,
    completed: 0,
    pending: 0
  });
  
  const CheckCircle = getIcon('CheckCircle');
  const Clock = getIcon('Clock');
  const ListChecks = getIcon('ListChecks');
  
  // Update statistics when tasks change
  const updateStatistics = (tasks) => {
    const completed = tasks.filter(task => task.isCompleted).length;
    setStatistics({
      total: tasks.length,
      completed,
      pending: tasks.length - completed
    });
  };

  const handleTasksChange = (tasks) => {
    updateStatistics(tasks);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  // Demo how to show a toast notification
  useEffect(() => {
    const hasShownWelcome = localStorage.getItem('hasShownWelcome');
    
    if (!hasShownWelcome) {
      setTimeout(() => {
        toast.info("Welcome to TaskTango! Add your first task to get started.", {
          icon: "👋",
          autoClose: 6000
        });
        localStorage.setItem('hasShownWelcome', 'true');
      }, 1500);
    }
  }, []);

  return (
    <div className="space-y-8">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="neu-card mb-8"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Your Task Dashboard
        </h2>
        <p className="text-surface-600 dark:text-surface-300 mb-6">
          Stay organized and boost your productivity with TaskTango's intuitive task management system.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="card p-4 border-l-4 border-l-primary">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <ListChecks size={20} />
              </div>
              <div>
                <p className="text-surface-500 dark:text-surface-400 text-sm">Total Tasks</p>
                <p className="text-2xl font-bold">{statistics.total}</p>
              </div>
            </div>
          </div>
          
          <div className="card p-4 border-l-4 border-l-secondary">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-secondary/10 rounded-lg text-secondary">
                <CheckCircle size={20} />
              </div>
              <div>
                <p className="text-surface-500 dark:text-surface-400 text-sm">Completed</p>
                <p className="text-2xl font-bold">{statistics.completed}</p>
              </div>
            </div>
          </div>
          
          <div className="card p-4 border-l-4 border-l-accent">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-accent/10 rounded-lg text-accent">
                <Clock size={20} />
              </div>
              <div>
                <p className="text-surface-500 dark:text-surface-400 text-sm">Pending</p>
                <p className="text-2xl font-bold">{statistics.pending}</p>
              </div>
            </div>
          </div>
        </div>

        {statistics.total > 0 && (
          <div className="w-full bg-surface-200 dark:bg-surface-700 rounded-full h-4 mb-2">
            <div 
              className="bg-gradient-to-r from-primary to-secondary h-4 rounded-full transition-all duration-500 ease-in-out"
              style={{ width: `${(statistics.completed / statistics.total) * 100}%` }}
            ></div>
          </div>
        )}
        {statistics.total > 0 && (
          <p className="text-sm text-surface-500 dark:text-surface-400 text-center">
            {Math.round((statistics.completed / statistics.total) * 100)}% tasks completed
          </p>
        )}
      </motion.section>

      <MainFeature onTasksChange={handleTasksChange} />
    </div>
  );
};

export default Home;