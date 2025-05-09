import { useState } from 'react';
import Chart from 'react-apexcharts';
import { Calendar, Clock, CheckCircle, BarChart2, PieChart, TrendingUp, ChevronUp, ChevronDown } from 'lucide-react';

const Analytics = () => {
  // This would typically come from your state management or API
  const [timeRange, setTimeRange] = useState('week');
  
  // Task completion data (sample data)
  const completionData = {
    week: {
      dates: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      completed: [5, 7, 4, 6, 8, 3, 5],
      created: [6, 8, 5, 7, 10, 4, 3]
    },
    month: {
      dates: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      completed: [24, 18, 26, 23],
      created: [28, 23, 25, 30]
    },
    year: {
      dates: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      completed: [45, 52, 38, 41, 55, 37, 43, 38, 40, 45, 60, 0],
      created: [48, 55, 39, 43, 58, 40, 46, 41, 45, 52, 63, 0]
    }
  };

  // Task distribution by status (sample data)
  const taskStatusData = {
    labels: ['Completed', 'In Progress', 'Not Started', 'Overdue'],
    series: [63, 21, 10, 6]
  };

  // Task distribution by category (sample data)
  const taskCategoryData = {
    labels: ['Work', 'Personal', 'Health', 'Education', 'Home'],
    series: [40, 25, 15, 10, 10]
  };

  // Key performance indicators
  const kpiData = [
    { 
      title: 'Completion Rate', 
      value: '87%', 
      change: 12, 
      icon: <CheckCircle className="text-green-500" size={24} />,
      color: 'bg-green-50 dark:bg-green-900 dark:bg-opacity-20'
    },
    { 
      title: 'Average Tasks/Day', 
      value: '5.3', 
      change: -2, 
      icon: <Calendar className="text-blue-500" size={24} />,
      color: 'bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20'
    },
    { 
      title: 'Avg. Completion Time', 
      value: '2.4d', 
      change: -8, 
      icon: <Clock className="text-purple-500" size={24} />,
      color: 'bg-purple-50 dark:bg-purple-900 dark:bg-opacity-20'
    }
  ];

  // Chart options for Task Completion
  const completionChartOptions = {
    chart: {
      type: 'line',
      toolbar: {
        show: false
      },
      fontFamily: 'Inter, ui-sans-serif, system-ui'
    },
    colors: ['#6366f1', '#d1d5db'],
    stroke: {
      curve: 'smooth',
      width: [3, 2]
    },
    xaxis: {
      categories: completionData[timeRange].dates,
    },
    grid: {
      borderColor: '#e2e8f0',
      strokeDashArray: 4,
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right'
    },
    dataLabels: {
      enabled: false
    }
  };

  const completionChartSeries = [
    {
      name: 'Completed',
      data: completionData[timeRange].completed
    },
    {
      name: 'Created',
      data: completionData[timeRange].created
    }
  ];

  // Donut chart options
  const donutChartOptions = {
    chart: {
      type: 'donut',
      fontFamily: 'Inter, ui-sans-serif, system-ui'
    },
    colors: ['#6366f1', '#14b8a6', '#f97316', '#ef4444'],
    legend: {
      position: 'bottom'
    },
    plotOptions: {
      pie: {
        donut: {
          size: '55%'
        }
      }
    },
    dataLabels: {
      enabled: false
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Analytics & Insights</h1>
        <div className="flex space-x-2">
          <button 
            className={`btn-outline text-sm ${timeRange === 'week' ? 'bg-primary bg-opacity-10 text-primary border-primary' : ''}`}
            onClick={() => setTimeRange('week')}
          >
            Week
          </button>
          <button 
            className={`btn-outline text-sm ${timeRange === 'month' ? 'bg-primary bg-opacity-10 text-primary border-primary' : ''}`}
            onClick={() => setTimeRange('month')}
          >
            Month
          </button>
          <button 
            className={`btn-outline text-sm ${timeRange === 'year' ? 'bg-primary bg-opacity-10 text-primary border-primary' : ''}`}
            onClick={() => setTimeRange('year')}
          >
            Year
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {kpiData.map((kpi, index) => (
          <div key={index} className={`card p-5 ${kpi.color}`}>
            <div className="flex justify-between items-center mb-3">
              <div className="text-surface-500 dark:text-surface-400 font-medium">{kpi.title}</div>
              {kpi.icon}
            </div>
            <div className="text-2xl font-bold mb-1">{kpi.value}</div>
            <div className={`flex items-center text-sm ${kpi.change > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {kpi.change > 0 ? (
                <><ChevronUp size={16} />{kpi.change}% increase</>
              ) : (
                <><ChevronDown size={16} />{Math.abs(kpi.change)}% decrease</>
              )}
              <span className="text-surface-500 dark:text-surface-400 ml-1">vs last {timeRange}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tasks Completion Chart */}
        <div className="card p-5">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <TrendingUp size={20} className="text-primary" />
            Task Completion Trend
          </h2>
          <Chart 
            options={completionChartOptions} 
            series={completionChartSeries} 
            type="line" 
            height={300}
          />
        </div>

        {/* Task Status Distribution */}
        <div className="card p-5">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <PieChart size={20} className="text-primary" />
            Task Status Distribution
          </h2>
          <Chart 
            options={{...donutChartOptions, labels: taskStatusData.labels}} 
            series={taskStatusData.series} 
            type="donut" 
            height={300} 
          />
        </div>
      </div>
    </div>
  );
};

export default Analytics;