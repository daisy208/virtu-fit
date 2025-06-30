import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  Eye,
  Target,
  Clock,
  Download,
  Filter,
  Calendar,
  BarChart3
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  AreaChart,
  Area
} from 'recharts';

const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [loading, setLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState<any>(null);

  useEffect(() => {
    // Simulate loading analytics data
    const timer = setTimeout(() => {
      setAnalyticsData({
        overview: {
          totalSessions: 15847,
          uniqueUsers: 8923,
          conversionRate: 18.5,
          averageSessionTime: 4.2,
          totalRevenue: 245680,
          growthRate: 12.3
        },
        sessionData: [
          { date: '2024-01-01', sessions: 1200, conversions: 220, revenue: 15400 },
          { date: '2024-01-02', sessions: 1450, conversions: 280, revenue: 18200 },
          { date: '2024-01-03', sessions: 1800, conversions: 350, revenue: 22100 },
          { date: '2024-01-04', sessions: 1650, conversions: 310, revenue: 19800 },
          { date: '2024-01-05', sessions: 2200, conversions: 420, revenue: 28500 },
          { date: '2024-01-06', sessions: 2800, conversions: 580, revenue: 35200 },
          { date: '2024-01-07', sessions: 1950, conversions: 380, revenue: 24600 }
        ],
        deviceData: [
          { name: 'Mobile', value: 65, color: '#8B5CF6' },
          { name: 'Desktop', value: 25, color: '#3B82F6' },
          { name: 'Tablet', value: 10, color: '#10B981' }
        ],
        categoryPerformance: [
          { category: 'Clothing', sessions: 8500, conversions: 1530, rate: 18.0 },
          { category: 'Accessories', sessions: 4200, conversions: 672, rate: 16.0 },
          { category: 'Shoes', sessions: 3147, conversions: 535, rate: 17.0 }
        ],
        bodyTypeAnalytics: [
          { type: 'Rectangle', users: 2847, engagement: 85 },
          { type: 'Hourglass', users: 2156, engagement: 92 },
          { type: 'Pear', users: 1923, engagement: 78 },
          { type: 'Apple', users: 1456, engagement: 81 },
          { type: 'Inverted Triangle', users: 541, engagement: 88 }
        ],
        skinTonePreferences: [
          { tone: 'Light', count: 3245, preference: 'Natural Lighting' },
          { tone: 'Medium', count: 2876, preference: 'Warm Lighting' },
          { tone: 'Dark', count: 1892, preference: 'Studio Lighting' },
          { tone: 'Deep', count: 910, preference: 'Cool Lighting' }
        ]
      });
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [timeRange]);

  const timeRanges = [
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' }
  ];

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-80 bg-gray-200 rounded-xl"></div>
            <div className="h-80 bg-gray-200 rounded-xl"></div>
          </div>
        </div>
      </div>
    );
  }

  const { overview, sessionData, deviceData, categoryPerformance, bodyTypeAnalytics, skinTonePreferences } = analyticsData;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Advanced Analytics</h1>
          <p className="text-gray-600 mt-1">Comprehensive insights into virtual try-on performance</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            {timeRanges.map(range => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
          <motion.button
            className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: 'Total Sessions',
            value: overview.totalSessions.toLocaleString(),
            change: `+${overview.growthRate}%`,
            icon: Eye,
            color: 'from-blue-500 to-blue-600'
          },
          {
            title: 'Unique Users',
            value: overview.uniqueUsers.toLocaleString(),
            change: '+8.2%',
            icon: Users,
            color: 'from-green-500 to-green-600'
          },
          {
            title: 'Conversion Rate',
            value: `${overview.conversionRate}%`,
            change: '+3.1%',
            icon: Target,
            color: 'from-purple-500 to-purple-600'
          },
          {
            title: 'Avg. Session Time',
            value: `${overview.averageSessionTime}m`,
            change: '+15.7%',
            icon: Clock,
            color: 'from-orange-500 to-orange-600'
          }
        ].map((metric, index) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.title}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, shadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${metric.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-green-600 text-sm font-medium">{metric.change}</span>
              </div>
              <h3 className="text-gray-600 text-sm font-medium">{metric.title}</h3>
              <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Session Trends */}
        <motion.div
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Session & Conversion Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={sessionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="sessions" 
                stackId="1"
                stroke="#8B5CF6" 
                fill="#8B5CF6"
                fillOpacity={0.3}
              />
              <Area 
                type="monotone" 
                dataKey="conversions" 
                stackId="2"
                stroke="#3B82F6" 
                fill="#3B82F6"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Device Distribution */}
        <motion.div
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Device Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={deviceData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {deviceData.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center space-x-6 mt-4">
            {deviceData.map((item: any) => (
              <div key={item.name} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-gray-600">{item.name} ({item.value}%)</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Category Performance */}
      <motion.div
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Performance</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={categoryPerformance}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="category" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Bar dataKey="sessions" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="conversions" fill="#3B82F6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Body Type & Skin Tone Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Body Type Analytics */}
        <motion.div
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Body Type Analytics</h3>
          <div className="space-y-4">
            {bodyTypeAnalytics.map((item, index) => (
              <motion.div
                key={item.type}
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {item.type.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{item.type}</p>
                    <p className="text-sm text-gray-600">{item.users.toLocaleString()} users</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{item.engagement}%</p>
                  <p className="text-sm text-gray-600">engagement</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Skin Tone Preferences */}
        <motion.div
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Skin Tone & Lighting Preferences</h3>
          <div className="space-y-4">
            {skinTonePreferences.map((item, index) => (
              <motion.div
                key={item.tone}
                className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{item.tone} Skin Tone</h4>
                  <span className="text-sm font-semibold text-purple-600">{item.count.toLocaleString()}</span>
                </div>
                <p className="text-sm text-gray-600">Preferred: {item.preference}</p>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                    style={{ width: `${(item.count / Math.max(...skinTonePreferences.map(s => s.count))) * 100}%` }}
                  ></div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* AI Insights */}
      <motion.div
        className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <h3 className="text-xl font-semibold mb-4">AI-Powered Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white bg-opacity-10 rounded-lg p-4">
            <h4 className="font-medium mb-2">Peak Usage</h4>
            <p className="text-sm opacity-90">Users are most active between 2-4 PM on weekdays, with 35% higher conversion rates during this time.</p>
          </div>
          <div className="bg-white bg-opacity-10 rounded-lg p-4">
            <h4 className="font-medium mb-2">Size Accuracy</h4>
            <p className="text-sm opacity-90">AI size recommendations show 94% accuracy rate, reducing returns by 28% compared to manual sizing.</p>
          </div>
          <div className="bg-white bg-opacity-10 rounded-lg p-4">
            <h4 className="font-medium mb-2">Engagement Patterns</h4>
            <p className="text-sm opacity-90">Users with complete body profiles spend 67% more time in try-on sessions and convert 23% more often.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Analytics;