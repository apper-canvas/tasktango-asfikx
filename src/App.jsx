import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Pages
import Home from './pages/Home';
import Projects from './pages/Projects';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import Sidebar from './components/Sidebar';

function App() {
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(() => {
    if (localStorage.getItem('darkMode') === 'true') return true;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {

    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode, location]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
      <div className="min-h-screen flex flex-col bg-surface-50 dark:bg-surface-900 overflow-hidden">
        <div className="flex flex-1">
          {/* Sidebar */}
          <Sidebar darkMode={darkMode} currentPath={location.pathname} />
          
          {/* Main Content */}
          <div className="flex-1 flex flex-col min-h-screen">
            <header className="sticky top-0 z-30 bg-white dark:bg-surface-800 shadow-sm border-b border-surface-200 dark:border-surface-700">
              <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xl select-none">
                      TT
                    </div>
                    <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      TaskTango
                    </h1>
                  </div>
                  <button 
                    onClick={toggleDarkMode}
                    className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700"
                    aria-label="Toggle dark mode"
                  >
                    {darkMode ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="5"></circle>
                        <line x1="12" y1="1" x2="12" y2="3"></line>
                        <line x1="12" y1="21" x2="12" y2="23"></line>
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                        <line x1="1" y1="12" x2="3" y2="12"></line>
                        <line x1="21" y1="12" x2="23" y2="12"></line>
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </header>
            
            <main className="flex-1 overflow-auto px-4 py-6 md:px-6 md:py-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/settings" element={<Settings darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </main>
        </div>
        
        <footer className="bg-white dark:bg-surface-800 border-t border-surface-200 dark:border-surface-700 py-4 z-10">
          <div className="max-w-7xl mx-auto px-4 text-center text-surface-500 dark:text-surface-400 text-sm">
            <p>TaskTango &copy; {new Date().getFullYear()} - Organize your tasks with style</p>
          </div>
        </footer>
      </div>
      
      <ToastContainer

        autoClose={4000}
        hideProgressBar={false}
        autoClose={3000}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        draggable={true}
        toastClassName="text-sm font-medium"
      />
    </>
  );
}

export default App;