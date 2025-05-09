import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import getIcon from '../utils/iconUtils';
import { format } from 'date-fns';

const MainFeature = ({ onTasksChange }) => {
  // Declare icon components
  const Plus = getIcon('Plus');
  const Edit = getIcon('Edit');
  const Trash2 = getIcon('Trash2');
  const CheckCircle2 = getIcon('CheckCircle2');
  const Circle = getIcon('Circle');
  const XCircle = getIcon('XCircle');
  const PlusCircle = getIcon('PlusCircle');
  const ChevronDown = getIcon('ChevronDown');
  const ChevronUp = getIcon('ChevronUp');
  const Filter = getIcon('Filter');
  const Clock = getIcon('Clock');
  const AlertCircle = getIcon('AlertCircle');
  const Tag = getIcon('Tag');
  const Save = getIcon('Save');
  const Calendar = getIcon('Calendar');
  const Flag = getIcon('Flag');
  
  // State for tasks and form
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: ''
  });
  
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  
  // Notify parent component when tasks change
  useEffect(() => {
    onTasksChange(tasks);
  }, [tasks, onTasksChange]);
  
  // Form handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prev => ({ ...prev, [name]: value }));
  };
  
  const validateTask = () => {
    if (!newTask.title.trim()) {
      toast.error('Task title cannot be empty!');
      return false;
    }
    return true;
  };
  
  const handleAddTask = (e) => {
    e.preventDefault();
    
    if (!validateTask()) return;
    
    const task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      isCompleted: false,
      priority: newTask.priority,
      createdAt: new Date().toISOString(),
      dueDate: newTask.dueDate ? new Date(newTask.dueDate).toISOString() : null,
    };
    
    setTasks(prev => [task, ...prev]);
    setNewTask({
      title: '',
      description: '',
      priority: 'medium',
      dueDate: ''
    });
    setIsAddingTask(false);
    
    toast.success('Task added successfully!');
  };
  
  const handleUpdateTask = (e) => {
    e.preventDefault();
    
    if (!validateTask()) return;
    
    setTasks(prev => prev.map(task => 
      task.id === editingTaskId 
        ? { 
            ...task, 
            title: newTask.title,
            description: newTask.description,
            priority: newTask.priority,
            dueDate: newTask.dueDate ? new Date(newTask.dueDate).toISOString() : null,
          } 
        : task
    ));
    
    setEditingTaskId(null);
    setNewTask({
      title: '',
      description: '',
      priority: 'medium',
      dueDate: ''
    });
    
    toast.success('Task updated successfully!');
  };
  
  const startEditing = (task) => {
    setEditingTaskId(task.id);
    setNewTask({
      title: task.title,
      description: task.description || '',
      priority: task.priority,
      dueDate: task.dueDate ? format(new Date(task.dueDate), 'yyyy-MM-dd') : ''
    });
    setIsAddingTask(true);
  };
  
  const cancelEditing = () => {
    setEditingTaskId(null);
    setNewTask({
      title: '',
      description: '',
      priority: 'medium',
      dueDate: ''
    });
    setIsAddingTask(false);
  };
  
  const toggleTaskCompletion = (taskId) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, isCompleted: !task.isCompleted } 
        : task
    ));
    
    // Find the task
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      toast.info(`Task marked as ${!task.isCompleted ? 'completed' : 'incomplete'}`);
    }
  };
  
  const deleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(prev => prev.filter(task => task.id !== taskId));
      toast.success('Task deleted successfully!');
    }
  };
  
  // Filtering and sorting
  const filterTasks = () => {
    let filteredTasks = [...tasks];
    
    // Apply filters
    if (filter === 'completed') {
      filteredTasks = filteredTasks.filter(task => task.isCompleted);
    } else if (filter === 'pending') {
      filteredTasks = filteredTasks.filter(task => !task.isCompleted);
    } else if (filter === 'high') {
      filteredTasks = filteredTasks.filter(task => task.priority === 'high');
    } else if (filter === 'overdue') {
      const now = new Date().toISOString();
      filteredTasks = filteredTasks.filter(task => 
        !task.isCompleted && task.dueDate && task.dueDate < now
      );
    }
    
    // Apply sorting
    filteredTasks.sort((a, b) => {
      let valueA, valueB;
      
      if (sortBy === 'priority') {
        const priorityOrder = { 'high': 3, 'medium': 2, 'low': 1 };
        valueA = priorityOrder[a.priority] || 0;
        valueB = priorityOrder[b.priority] || 0;
      } else if (sortBy === 'dueDate') {
        valueA = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
        valueB = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
      } else { // createdAt
        valueA = new Date(a.createdAt).getTime();
        valueB = new Date(b.createdAt).getTime();
      }
      
      return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
    });
    
    return filteredTasks;
  };
  
  const getPriorityClass = (priority) => {
    switch(priority) {
      case 'high': return 'text-red-500 dark:text-red-400';
      case 'medium': return 'text-amber-500 dark:text-amber-400';
      case 'low': return 'text-blue-500 dark:text-blue-400';
      default: return 'text-surface-500';
    }
  };
  
  const filteredTasks = filterTasks();
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="space-y-6"
    >
      {/* Task controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center space-x-2">
          <h2 className="text-2xl font-bold">My Tasks</h2>
          <span className="text-sm bg-primary-light/20 text-primary-dark dark:text-primary-light px-2 py-0.5 rounded-full">
            {filteredTasks.length}
          </span>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-4 w-4 text-surface-400" />
            </div>
            <select
              className="input pl-10 pr-8 py-2 text-sm appearance-none bg-white dark:bg-surface-800"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Tasks</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="high">High Priority</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
          
          <div className="relative">
            <select
              className="input pr-8 py-2 text-sm appearance-none bg-white dark:bg-surface-800"
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [by, order] = e.target.value.split('-');
                setSortBy(by);
                setSortOrder(order);
              }}
            >
              <option value="createdAt-desc">Newest First</option>
              <option value="createdAt-asc">Oldest First</option>
              <option value="priority-desc">Priority (High-Low)</option>
              <option value="priority-asc">Priority (Low-High)</option>
              <option value="dueDate-asc">Due Date (Earliest)</option>
              <option value="dueDate-desc">Due Date (Latest)</option>
            </select>
          </div>
          
          <button
            onClick={() => setIsAddingTask(true)}
            className="btn-primary flex items-center justify-center space-x-1 shadow-soft"
          >
            <PlusCircle className="w-5 h-5" />
            <span>New Task</span>
          </button>
        </div>
      </div>
      
      {/* Task form */}
      <AnimatePresence>
        {isAddingTask && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <form onSubmit={editingTaskId ? handleUpdateTask : handleAddTask} className="card p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4">
                {editingTaskId ? 'Edit Task' : 'Add New Task'}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                    Task Title*
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={newTask.title}
                    onChange={handleChange}
                    placeholder="What needs to be done?"
                    className="input"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={newTask.description}
                    onChange={handleChange}
                    placeholder="Add details (optional)"
                    className="input min-h-[80px]"
                    rows="3"
                  ></textarea>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="priority" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                      Priority
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Flag className="h-4 w-4 text-surface-400" />
                      </div>
                      <select
                        id="priority"
                        name="priority"
                        value={newTask.priority}
                        onChange={handleChange}
                        className="input pl-10"
                      >
                        <option value="low">Low Priority</option>
                        <option value="medium">Medium Priority</option>
                        <option value="high">High Priority</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="dueDate" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                      Due Date
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar className="h-4 w-4 text-surface-400" />
                      </div>
                      <input
                        type="date"
                        id="dueDate"
                        name="dueDate"
                        value={newTask.dueDate}
                        onChange={handleChange}
                        className="input pl-10"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  className="btn-outline"
                  onClick={cancelEditing}
                >
                  Cancel
                </button>
                
                <button type="submit" className="btn-primary flex items-center space-x-1">
                  {editingTaskId ? (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Update Task</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>Add Task</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Task list */}
      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 mb-4 text-surface-300 dark:text-surface-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-2">No tasks found</h3>
            <p className="text-surface-500 dark:text-surface-400 mb-6">
              {filter === 'all' 
                ? "Start by adding a new task above" 
                : `No tasks match the current filter: ${filter}`}
            </p>
            {filter !== 'all' && (
              <button 
                onClick={() => setFilter('all')} 
                className="btn-outline inline-flex items-center"
              >
                <Filter className="w-4 h-4 mr-2" />
                Clear Filter
              </button>
            )}
          </div>
        ) : (
          <AnimatePresence>
            {filteredTasks.map(task => (
              <motion.div
                key={task.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className={`card p-4 transition-all duration-300 ${
                  task.isCompleted 
                    ? 'opacity-75 border-green-200 dark:border-green-900' 
                    : 'border-surface-200 dark:border-surface-700'
                }`}
              >
                <div className="flex items-start gap-3">
                  <button 
                    onClick={() => toggleTaskCompletion(task.id)}
                    className="mt-1 flex-shrink-0 focus:outline-none"
                    aria-label={task.isCompleted ? "Mark as incomplete" : "Mark as complete"}
                  >
                    {task.isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : (
                      <Circle className="w-5 h-5 text-surface-400" />
                    )}
                  </button>
                  
                  <div className="flex-grow min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h4 className={`font-medium text-base ${
                        task.isCompleted ? 'line-through text-surface-500 dark:text-surface-400' : ''
                      }`}>
                        {task.title}
                      </h4>
                      
                      <span className={`text-xs px-2 py-0.5 rounded-full inline-flex items-center ${getPriorityClass(task.priority)}`}>
                        <Tag className="w-3 h-3 mr-1" />
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                      </span>
                    </div>
                    
                    {task.description && (
                      <p className={`text-sm text-surface-600 dark:text-surface-300 ${
                        task.isCompleted ? 'text-surface-500 dark:text-surface-400' : ''
                      }`}>
                        {task.description}
                      </p>
                    )}
                    
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-xs text-surface-500">
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        <span>Created: {format(new Date(task.createdAt), 'MMM d, yyyy')}</span>
                      </div>
                      
                      {task.dueDate && (
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          <span className={`${
                            !task.isCompleted && new Date(task.dueDate) < new Date() 
                              ? 'text-red-500 font-medium' 
                              : ''
                          }`}>
                            Due: {format(new Date(task.dueDate), 'MMM d, yyyy')}
                            {!task.isCompleted && new Date(task.dueDate) < new Date() && (
                              <>
                                <AlertCircle className="w-3 h-3 ml-1 inline" />
                                <span className="ml-1">Overdue</span>
                              </>
                            )}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-1 ml-2">
                    <button
                      onClick={() => startEditing(task)}
                      className="p-1.5 text-surface-400 hover:text-primary rounded-full hover:bg-primary-light/10"
                      aria-label="Edit task"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="p-1.5 text-surface-400 hover:text-red-500 rounded-full hover:bg-red-500/10"
                      aria-label="Delete task"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
};

export default MainFeature;