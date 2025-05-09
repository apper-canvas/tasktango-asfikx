import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, MoreVertical, Edit2, Trash2, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'react-toastify';

const Projects = () => {
  const [showNewProjectForm, setShowNewProjectForm] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDescription, setNewProjectDescription] = useState('');
  
  // Sample project data - in a real app this would come from your state management or API
  const [projects, setProjects] = useState([
    {
      id: '1',
      name: 'Website Redesign',
      description: 'Redesign the company website with modern UI/UX principles',
      progress: 65,
      tasks: { total: 24, completed: 16 },
      priority: 'high',
      dueDate: '2023-08-15'
    },
    {
      id: '2',
      name: 'Mobile App Development',
      description: 'Create a new mobile app for task management on Android and iOS',
      progress: 32,
      tasks: { total: 18, completed: 6 },
      priority: 'medium',
      dueDate: '2023-09-30'
    },
    {
      id: '3',
      name: 'Q3 Marketing Campaign',
      description: 'Plan and execute marketing strategies for Q3',
      progress: 80,
      tasks: { total: 15, completed: 12 },
      priority: 'high',
      dueDate: '2023-07-31'
    }
  ]);

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
      tasks: { total: 0, completed: 0 },
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
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
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
                  <button className="p-1 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700">
                    <MoreVertical size={18} />
                  </button>
                  {/* Dropdown menu would go here */}
                </div>
              </div>
              <p className="text-surface-600 dark:text-surface-400 mb-4 line-clamp-2">{project.description}</p>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="h-2 bg-surface-200 dark:bg-surface-700 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${project.progress}%` }}></div>
                  </div>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-1"><CheckCircle size={16} className="text-green-500" /> {project.tasks.completed}/{project.tasks.total} tasks</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getPriorityBadgeClasses(project.priority)}`}>
                    {project.priority.charAt(0).toUpperCase() + project.priority.slice(1)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center pt-2 border-t border-surface-200 dark:border-surface-700 text-sm text-surface-500 dark:text-surface-400">
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
    </div>
  );
};

export default Projects;