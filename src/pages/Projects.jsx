import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, MoreVertical, Edit2, Trash2, CheckCircle, AlertCircle, X, ClipboardList, Circle, CheckCircle2 } from 'lucide-react';
import { toast } from 'react-toastify';

const Projects = () => {
  const [showNewProjectForm, setShowNewProjectForm] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [newTask, setNewTask] = useState({ title: '', description: '', completed: false });
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDescription, setNewProjectDescription] = useState('');
  
  // Sample project data - in a real app this would come from your state management or API
  const [projects, setProjects] = useState([
    {
      id: '1',
      name: 'Website Redesign',
      description: 'Redesign the company website with modern UI/UX principles',
      progress: 65,
      tasks: [
        { id: '101', title: 'Create wireframes', description: 'Design initial wireframes for homepage', completed: true },
        { id: '102', title: 'Color palette selection', description: 'Choose brand-aligned color scheme', completed: true },
        { id: '103', title: 'Responsive layout', description: 'Ensure design works on all devices', completed: false },
        { id: '104', title: 'Navigation redesign', description: 'Improve site navigation structure', completed: false },
        { id: '105', title: 'Content migration', description: 'Move content to new design', completed: false },
      ],
      priority: 'high',
      dueDate: '2023-08-15'
    },
    {
      id: '2',
      name: 'Mobile App Development',
      description: 'Create a new mobile app for task management on Android and iOS',
      progress: 32,
      tasks: [
        { id: '201', title: 'UI/UX Design', description: 'Create app interface mockups', completed: true },
        { id: '202', title: 'Backend API setup', description: 'Configure server endpoints', completed: false },
        { id: '203', title: 'User authentication', description: 'Implement secure login system', completed: false },
      ],
      priority: 'medium',
      dueDate: '2023-09-30'
    },
    {
      id: '3',
      name: 'Q3 Marketing Campaign',
      description: 'Plan and execute marketing strategies for Q3',
      progress: 80,
      tasks: [
        { id: '301', title: 'Market research', description: 'Analyze target demographics', completed: true },
        { id: '302', title: 'Campaign strategy', description: 'Define marketing channels and approach', completed: true },
        { id: '303', title: 'Content creation', description: 'Develop marketing materials', completed: true },
        { id: '304', title: 'Performance tracking', description: 'Set up analytics', completed: false },
      ],
      priority: 'high',
      dueDate: '2023-07-31'
    }
  ]);

  // Calculate progress based on completed tasks
  useEffect(() => {
    if (selectedProject) {
      const updatedProjects = projects.map(project => {
        if (project.id === selectedProject.id) {
          const total = project.tasks.length;
          const completed = project.tasks.filter(task => task.completed).length;
          const progress = total > 0 ? Math.round((completed / total) * 100) : 0;
          return { ...project, progress };
        }
        return project;
      });
      setProjects(updatedProjects);
    }
  }, [selectedProject]);

  const openTaskModal = (project) => {
    setSelectedProject(project);
    setShowTaskModal(true);
    setNewTask({ title: '', description: '', completed: false });
  };

  const closeTaskModal = () => {
    setShowTaskModal(false);
    setSelectedProject(null);
    setNewTask({ title: '', description: '', completed: false });
  };

  const handleAddProject = () => {
    if (!newProjectName.trim()) {
      toast.error('Project name is required');
      return;
    }

    const newProject = {
      id: Date.now().toString(),
      name: newProjectName,
      description: newProjectDescription,
      progress: 0,
      tasks: [],
      priority: 'medium',
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // 30 days from now
    };

    setProjects([...projects, newProject]);
    toast.success('Project created successfully!');
    
    // Reset form
    setNewProjectName('');
    setNewProjectDescription('');
    setShowNewProjectForm(false);
  };

  const handleAddTask = () => {
    if (!newTask.title.trim()) {
      toast.error('Task title is required');
      return;
    }

    const task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      completed: false
    };

    const updatedProjects = projects.map(project => {
      if (project.id === selectedProject.id) {
        const updatedTasks = [...project.tasks, task];
        const completed = updatedTasks.filter(t => t.completed).length;
        const total = updatedTasks.length;
        const progress = Math.round((completed / total) * 100);
        
        return {
          ...project,
          tasks: updatedTasks,
          progress
        };
      }
      return project;
    });

    setProjects(updatedProjects);
    setSelectedProject(updatedProjects.find(p => p.id === selectedProject.id));
    setNewTask({ title: '', description: '', completed: false });
    toast.success('Task added successfully!');
  };

  const toggleTaskCompletion = (taskId) => {
    const updatedProjects = projects.map(project => {
      if (project.id === selectedProject.id) {
        const updatedTasks = project.tasks.map(task => 
          task.id === taskId ? { ...task, completed: !task.completed } : task
        );
        const completed = updatedTasks.filter(t => t.completed).length;
        const total = updatedTasks.length;
        const progress = Math.round((completed / total) * 100);
        
        return {
          ...project,
          tasks: updatedTasks,
          progress
        };
      }
      return project;
    });

    setProjects(updatedProjects);
    setSelectedProject(updatedProjects.find(p => p.id === selectedProject.id));
    toast.info('Task status updated');
  };

  const deleteProject = (id) => {
    setProjects(projects.filter(project => project.id !== id));
    toast.success('Project deleted successfully!');
  };
  
  const getPriorityBadgeClasses = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700 dark:bg-red-900 dark:bg-opacity-30 dark:text-red-400';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:bg-opacity-30 dark:text-yellow-400';
      case 'low':
        return 'bg-green-100 text-green-700 dark:bg-green-900 dark:bg-opacity-30 dark:text-green-400';
      default:
        return 'bg-surface-100 text-surface-700 dark:bg-surface-700 dark:text-surface-300';
    }
  };

  const formatDate = (dateString) => {
  const deleteTask = (taskId) => {
    const updatedProjects = projects.map(project => {
      if (project.id === selectedProject.id) {
        const updatedTasks = project.tasks.filter(task => task.id !== taskId);
        const completed = updatedTasks.filter(t => t.completed).length;
        const total = updatedTasks.length;
        const progress = total > 0 ? Math.round((completed / total) * 100) : 0;
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
        
        return {
          ...project,
          tasks: updatedTasks,
          progress
        };
      }
      return project;
    });

    setProjects(updatedProjects);
    setSelectedProject(updatedProjects.find(p => p.id === selectedProject.id));
    toast.success('Task deleted successfully!');
  };


  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Projects</h1>
        <button 
          onClick={() => setShowNewProjectForm(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={18} />
          <span>New Project</span>
        </button>
      </div>

      {/* New Project Form */}
      {showNewProjectForm && (
        <div className="card p-5 mb-6">
          <h2 className="text-xl font-semibold mb-4">Create New Project</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="projectName" className="block mb-1 font-medium">Project Name</label>
              <input
                id="projectName"
                type="text"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                className="input"
                placeholder="Enter project name"
              />
            </div>
            <div>
              <label htmlFor="projectDescription" className="block mb-1 font-medium">Description</label>
              <textarea
                id="projectDescription"
                value={newProjectDescription}
                onChange={(e) => setNewProjectDescription(e.target.value)}
                className="input min-h-[100px]"
                placeholder="Enter project description"
              />
            </div>
            <div className="flex gap-3 justify-end">
              <button 
                className="btn-outline" 
                onClick={() => setShowNewProjectForm(false)}
              >
                Cancel
              </button>
              <button 
                className="btn-primary"
                onClick={handleAddProject}
              >
                Create Project
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(project => (
          <motion.div 
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card card-hover overflow-hidden"
          >
            <div className="p-5">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold">{project.name}</h3>
                <div className="dropdown relative">
                  <button 
                    className="p-1 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700"
                    aria-label="More options"
                  >
                    <MoreVertical size={18} />
                  </button>
                </div>
              </div>
              <p className="text-surface-600 dark:text-surface-400 mb-4 line-clamp-2">{project.description}</p>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1 text-sm">
                    <span>Progress</span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  <div className="h-2 bg-surface-200 dark:bg-surface-700 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${project.progress}%` }}></div>
                  </div>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-1">
                    <CheckCircle size={16} className="text-green-500" /> 
                    {project.tasks.filter(task => task.completed).length}/{project.tasks.length} tasks
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getPriorityBadgeClasses(project.priority)}`}>
                    {project.priority.charAt(0).toUpperCase() + project.priority.slice(1)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center pt-3 border-t border-surface-200 dark:border-surface-700 text-sm text-surface-500 dark:text-surface-400">
                  <button 
                    onClick={() => openTaskModal(project)}
                    className="flex items-center gap-1 text-primary hover:text-primary-dark transition-colors"
                  >
                    <ClipboardList size={16} />
                    <span>Manage Tasks</span>
                  </button>
                  <span>Due {formatDate(project.dueDate)}</span>
                  <button 
                    onClick={() => deleteProject(project.id)}
                    className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Task Modal */}
      {showTaskModal && selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-900/50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-surface-800 rounded-xl shadow-lg w-full max-w-3xl max-h-[90vh] flex flex-col"
          >
            <div className="flex items-center justify-between p-5 border-b border-surface-200 dark:border-surface-700">
              <h2 className="text-xl font-bold">{selectedProject.name} - Tasks</h2>
              <button 
                onClick={closeTaskModal}
                className="p-1 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-5 overflow-y-auto flex-grow">
              {/* Add Task Form */}
              <div className="bg-surface-50 dark:bg-surface-700/30 p-4 rounded-lg mb-5">
                <h3 className="text-lg font-medium mb-3">Add New Task</h3>
                <div className="space-y-3">
                  <div>
                    <label htmlFor="taskTitle" className="block text-sm font-medium mb-1">Task Title*</label>
                    <input
                      id="taskTitle"
                      type="text"
                      value={newTask.title}
                      onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                      placeholder="Enter task title"
                      className="input"
                    />
                  </div>
                  <div>
                    <label htmlFor="taskDescription" className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                      id="taskDescription"
                      value={newTask.description}
                      onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                      placeholder="Optional description"
                      className="input min-h-[80px]"
                      rows="2"
                    ></textarea>
                  </div>
                  <div className="flex justify-end">
                    <button 
                      onClick={handleAddTask}
                      className="btn-primary"
                    >
                      Add Task
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Task List */}
              <div className="space-y-3">
                <h3 className="text-lg font-medium mb-2">Project Tasks ({selectedProject.tasks.length})</h3>
                
                {selectedProject.tasks.length === 0 ? (
                  <div className="text-center py-8 bg-surface-50 dark:bg-surface-800 rounded-lg">
                    <p className="text-surface-500 dark:text-surface-400">No tasks yet. Add your first task above.</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {selectedProject.tasks.map(task => (
                      <div 
                        key={task.id} 
                        className={`p-3 rounded-lg border ${task.completed ? 'bg-surface-50 dark:bg-surface-800/50 border-green-200 dark:border-green-900/30' : 'bg-white dark:bg-surface-800 border-surface-200 dark:border-surface-700'}`}
                      >
                        <div className="flex items-start gap-3">
                          <button 
                            onClick={() => toggleTaskCompletion(task.id)}
                            className="mt-1 flex-shrink-0"
                          >
                            {task.completed ? (
                              <CheckCircle2 className="w-5 h-5 text-green-500" />
                            ) : (
                              <Circle className="w-5 h-5 text-surface-400" />
                            )}
                          </button>
                          
                          <div className="flex-grow">
                            <h4 className={`font-medium ${task.completed ? 'line-through text-surface-500 dark:text-surface-400' : ''}`}>
                              {task.title}
                            </h4>
                            {task.description && (
                              <p className="text-sm text-surface-500 dark:text-surface-400 mt-1">{task.description}</p>
                            )}
                          </div>
                          
                          <button 
                            onClick={() => deleteTask(task.id)}
                            className="p-1 text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="p-4 border-t border-surface-200 dark:border-surface-700 flex justify-end">
              <button 
                onClick={closeTaskModal}
                className="btn-outline"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Projects;