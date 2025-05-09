import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, FolderKanban, BarChart3, Settings, Menu, X } from 'lucide-react';

const Sidebar = ({ darkMode, currentPath }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    { path: '/', icon: <Home size={20} />, label: 'Dashboard' },
    { path: '/projects', icon: <FolderKanban size={20} />, label: 'Projects' },
    { path: '/analytics', icon: <BarChart3 size={20} />, label: 'Analytics' },
    { path: '/settings', icon: <Settings size={20} />, label: 'Settings' }
  ];

  const renderNavLinks = () => (
    navItems.map(item => (
      <NavLink 
        key={item.path}
        to={item.path} 
        className={({ isActive }) => `
          flex items-center gap-3 px-4 py-3 rounded-lg transition-all
          ${isActive 
            ? 'bg-primary bg-opacity-10 text-primary font-medium'
            : 'hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-700 dark:text-surface-300'
          }
        `}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        {item.icon}
        <span>{item.label}</span>
      </NavLink>
    ))
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        onClick={toggleMobileMenu} 
        className="md:hidden fixed bottom-4 right-4 z-30 bg-primary text-white p-3 rounded-full shadow-lg"
        className="md:hidden fixed bottom-4 right-4 z-40 bg-primary text-white p-3 rounded-full shadow-lg"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      
      {/* Mobile Sidebar */}
      <div className={`
        md:hidden fixed inset-0 bg-black bg-opacity-50 z-20 transition-opacity duration-300
        md:hidden fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300
      `}>
        <div className={`
          fixed bottom-0 left-0 right-0 bg-white dark:bg-surface-800 rounded-t-xl shadow-lg
          transform transition-transform duration-300 ease-in-out p-4 space-y-2
          ${isMobileMenuOpen ? 'translate-y-0' : 'translate-y-full'}
        `}>
          {renderNavLinks()}
        </div>
      </div>
      
      {/* Desktop Sidebar - always visible on larger screens */}
      <aside className="hidden md:block w-64 bg-white dark:bg-surface-800 border-r border-surface-200 dark:border-surface-700 shrink-0 overflow-y-auto">
        <div className="h-full p-4">
          <div className="space-y-1 sticky top-20">
            {renderNavLinks()}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;