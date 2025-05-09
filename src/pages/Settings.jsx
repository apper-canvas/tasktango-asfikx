import { useState } from 'react';
import { toast } from 'react-toastify';
import { 
  Sun, 
  Moon, 
  Bell, 
  User, 
  Shield, 
  HardDrive, 
  Languages,
  Palette, 
  Clock,
  Save
} from 'lucide-react';

const Settings = ({ darkMode, toggleDarkMode }) => {
  // User settings state
  const [settings, setSettings] = useState({
    // Profile settings
    username: 'johndoe',
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    profilePicture: null,
    
    // Notifications
    emailNotifications: true,
    pushNotifications: true,
    taskReminders: true,
    weeklyDigest: true,
    
    // Appearance
    colorTheme: darkMode ? 'dark' : 'light',
    primaryColor: 'indigo', // Default from your Tailwind config
    reducedMotion: false,
    
    // Preferences
    defaultView: 'list',
    language: 'english',
    dateFormat: 'MM/DD/YYYY',
    startOfWeek: 'monday'
  });

  // Active tab management
  const [activeTab, setActiveTab] = useState('profile');

  const handleChange = (category, field, value) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      [field]: value
    }));
  };

  const handleSaveSettings = (category) => {
    // In a real app, you would save the settings to a database or localStorage
    toast.success(`${category} settings saved successfully!`);
  };

  // Tabs content
  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User size={18} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
    { id: 'appearance', label: 'Appearance', icon: <Palette size={18} /> },
    { id: 'preferences', label: 'Preferences', icon: <Clock size={18} /> }
  ];

  // Render active tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 rounded-full bg-surface-200 dark:bg-surface-700 flex items-center justify-center text-surface-500 dark:text-surface-400 overflow-hidden">
                  {settings.profilePicture ? (
                    <img src={settings.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User size={36} />
                  )}
                </div>
              </div>
              <div className="space-y-4 flex-grow">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1 font-medium">First Name</label>
                    <input 
                      type="text" 
                      className="input" 
                      value={settings.firstName}
                      onChange={(e) => handleChange('profile', 'firstName', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">Last Name</label>
                    <input 
                      type="text" 
                      className="input" 
                      value={settings.lastName}
                      onChange={(e) => handleChange('profile', 'lastName', e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="block mb-1 font-medium">Email</label>
                  <input 
                    type="email" 
                    className="input" 
                    value={settings.email}
                    onChange={(e) => handleChange('profile', 'email', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Username</label>
                  <input 
                    type="text" 
                    className="input" 
                    value={settings.username}
                    onChange={(e) => handleChange('profile', 'username', e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="border-t border-surface-200 dark:border-surface-700 pt-4">
              <button 
                className="btn-primary flex items-center gap-2"
                onClick={() => handleSaveSettings('Profile')}
              >
                <Save size={18} />
                Save Profile
              </button>
            </div>
          </div>
        );
      
      case 'notifications':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2">
                <div>
                  <h3 className="font-medium">Email Notifications</h3>
                  <p className="text-sm text-surface-500 dark:text-surface-400">Get task updates via email</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={settings.emailNotifications}
                    onChange={(e) => handleChange('notifications', 'emailNotifications', e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-surface-300 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-primary rounded-full peer dark:bg-surface-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-surface-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-surface-600 peer-checked:bg-primary"></div>
                </label>
              </div>
              
              <div className="flex justify-between items-center py-2">
                <div>
                  <h3 className="font-medium">Push Notifications</h3>
                  <p className="text-sm text-surface-500 dark:text-surface-400">Get notifications in the browser</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={settings.pushNotifications}
                    onChange={(e) => handleChange('notifications', 'pushNotifications', e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-surface-300 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-primary rounded-full peer dark:bg-surface-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-surface-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-surface-600 peer-checked:bg-primary"></div>
                </label>
              </div>

              <div className="flex justify-between items-center py-2">
                <div>
                  <h3 className="font-medium">Task Reminders</h3>
                  <p className="text-sm text-surface-500 dark:text-surface-400">Get reminders for upcoming deadlines</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={settings.taskReminders}
                    onChange={(e) => handleChange('notifications', 'taskReminders', e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-surface-300 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-primary rounded-full peer dark:bg-surface-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-surface-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-surface-600 peer-checked:bg-primary"></div>
                </label>
              </div>

              <div className="flex justify-between items-center py-2">
                <div>
                  <h3 className="font-medium">Weekly Digest</h3>
                  <p className="text-sm text-surface-500 dark:text-surface-400">Get weekly summary of your progress</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={settings.weeklyDigest}
                    onChange={(e) => handleChange('notifications', 'weeklyDigest', e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-surface-300 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-primary rounded-full peer dark:bg-surface-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-surface-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-surface-600 peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
            <div className="border-t border-surface-200 dark:border-surface-700 pt-4">
              <button 
                className="btn-primary flex items-center gap-2"
                onClick={() => handleSaveSettings('Notifications')}
              >
                <Save size={18} />
                Save Notification Settings
              </button>
            </div>
          </div>
        );

      case 'appearance':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Theme</h3>
                <div className="grid grid-cols-3 gap-3">
                  <div 
                    className={`card p-4 flex flex-col items-center gap-2 cursor-pointer ${!darkMode ? 'ring-2 ring-primary' : ''}`}
                    onClick={toggleDarkMode}
                  >
                    <Sun size={24} className="text-yellow-500" />
                    <span className="text-sm font-medium">Light</span>
                  </div>
                  <div 
                    className={`card p-4 flex flex-col items-center gap-2 cursor-pointer ${darkMode ? 'ring-2 ring-primary' : ''}`}
                    onClick={toggleDarkMode}
                  >
                    <Moon size={24} className="text-indigo-400" />
                    <span className="text-sm font-medium">Dark</span>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-surface-200 dark:border-surface-700 pt-4">
                <h3 className="font-medium mb-2">Animations</h3>
                <div className="flex justify-between items-center">
                  <div>
                    <p>Reduced Motion</p>
                    <p className="text-sm text-surface-500 dark:text-surface-400">Minimize animations for accessibility</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={settings.reducedMotion}
                      onChange={(e) => handleChange('appearance', 'reducedMotion', e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-surface-300 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-primary rounded-full peer dark:bg-surface-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-surface-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-surface-600 peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
            </div>
            <div className="border-t border-surface-200 dark:border-surface-700 pt-4">
              <button 
                className="btn-primary flex items-center gap-2"
                onClick={() => handleSaveSettings('Appearance')}
              >
                <Save size={18} />
                Save Appearance Settings
              </button>
            </div>
          </div>
        );

      case 'preferences':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Language</label>
                <select 
                  className="input" 
                  value={settings.language}
                  onChange={(e) => handleChange('preferences', 'language', e.target.value)}
                >
                  <option value="english">English</option>
                  <option value="spanish">Spanish</option>
                  <option value="french">French</option>
                  <option value="german">German</option>
                </select>
              </div>
              
              <div>
                <label className="block mb-1 font-medium">Default View</label>
                <select 
                  className="input" 
                  value={settings.defaultView}
                  onChange={(e) => handleChange('preferences', 'defaultView', e.target.value)}
                >
                  <option value="list">List</option>
                  <option value="board">Board</option>
                  <option value="calendar">Calendar</option>
                </select>
              </div>
              
              <div>
                <label className="block mb-1 font-medium">Date Format</label>
                <select 
                  className="input" 
                  value={settings.dateFormat}
                  onChange={(e) => handleChange('preferences', 'dateFormat', e.target.value)}
                >
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>
              
              <div>
                <label className="block mb-1 font-medium">Start of Week</label>
                <select 
                  className="input" 
                  value={settings.startOfWeek}
                  onChange={(e) => handleChange('preferences', 'startOfWeek', e.target.value)}
                >
                  <option value="monday">Monday</option>
                  <option value="sunday">Sunday</option>
                </select>
              </div>
            </div>
            <div className="border-t border-surface-200 dark:border-surface-700 pt-4">
              <button 
                className="btn-primary flex items-center gap-2"
                onClick={() => handleSaveSettings('Preferences')}
              >
                <Save size={18} />
                Save Preferences
              </button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Tabs Navigation */}
        <div className="md:w-64 flex-shrink-0">
          <nav className="card overflow-hidden">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`flex items-center gap-3 px-4 py-3 w-full text-left border-l-4 ${
                  activeTab === tab.id 
                    ? 'border-primary bg-primary bg-opacity-5 text-primary font-medium' 
                    : 'border-transparent hover:bg-surface-100 dark:hover:bg-surface-700'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
        
        {/* Tab Content */}
        <div className="flex-1">
          <div className="card p-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;