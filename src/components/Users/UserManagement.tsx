import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Search, 
  Filter, 
  UserPlus, 
  Edit, 
  Trash2,
  Shield,
  Mail,
  Phone,
  Calendar,
  Activity,
  MoreVertical,
  Eye,
  Ban
} from 'lucide-react';
import { User } from '../../types';

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    // Simulate loading users
    const timer = setTimeout(() => {
      const mockUsers: User[] = [
        {
          id: '1',
          email: 'john.doe@company.com',
          name: 'John Doe',
          role: 'admin',
          tenantId: 'tenant-1',
          avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
          preferences: {
            skinTone: 'medium',
            bodyType: 'rectangle',
            preferredLighting: 'natural',
            aiRecommendations: true
          },
          measurements: {
            height: 180,
            weight: 75,
            chest: 100,
            waist: 85,
            hips: 95,
            shoulders: 45
          }
        },
        {
          id: '2',
          email: 'sarah.johnson@company.com',
          name: 'Sarah Johnson',
          role: 'manager',
          tenantId: 'tenant-1',
          avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
          preferences: {
            skinTone: 'light',
            bodyType: 'hourglass',
            preferredLighting: 'warm',
            aiRecommendations: true
          },
          measurements: {
            height: 165,
            weight: 60,
            chest: 90,
            waist: 70,
            hips: 95,
            shoulders: 40
          }
        },
        {
          id: '3',
          email: 'mike.chen@company.com',
          name: 'Mike Chen',
          role: 'user',
          tenantId: 'tenant-1',
          avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
          preferences: {
            skinTone: 'medium',
            bodyType: 'rectangle',
            preferredLighting: 'cool',
            aiRecommendations: false
          },
          measurements: {
            height: 175,
            weight: 70,
            chest: 95,
            waist: 80,
            hips: 90,
            shoulders: 42
          }
        },
        {
          id: '4',
          email: 'emma.wilson@company.com',
          name: 'Emma Wilson',
          role: 'user',
          tenantId: 'tenant-1',
          avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150',
          preferences: {
            skinTone: 'light',
            bodyType: 'pear',
            preferredLighting: 'natural',
            aiRecommendations: true
          },
          measurements: {
            height: 160,
            weight: 55,
            chest: 85,
            waist: 65,
            hips: 90,
            shoulders: 38
          }
        },
        {
          id: '5',
          email: 'david.brown@company.com',
          name: 'David Brown',
          role: 'user',
          tenantId: 'tenant-1',
          avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150',
          preferences: {
            skinTone: 'dark',
            bodyType: 'inverted-triangle',
            preferredLighting: 'studio',
            aiRecommendations: true
          },
          measurements: {
            height: 185,
            weight: 85,
            chest: 110,
            waist: 90,
            hips: 95,
            shoulders: 50
          }
        }
      ];
      setUsers(mockUsers);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const roles = [
    { value: 'all', label: 'All Roles' },
    { value: 'admin', label: 'Admin' },
    { value: 'manager', label: 'Manager' },
    { value: 'user', label: 'User' }
  ];

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-700 border-red-200';
      case 'manager': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'user': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return Shield;
      case 'manager': return Users;
      case 'user': return Activity;
      default: return Users;
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <motion.div
        className="flex items-center justify-between mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-1">Manage user accounts, permissions, and body profiles</p>
        </div>
        <motion.button
          className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <UserPlus className="w-5 h-5" />
          <span>Add User</span>
        </motion.button>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { title: 'Total Users', value: users.length, color: 'from-blue-500 to-blue-600', icon: Users },
          { title: 'Active Today', value: Math.floor(users.length * 0.6), color: 'from-green-500 to-green-600', icon: Activity },
          { title: 'Admins', value: users.filter(u => u.role === 'admin').length, color: 'from-red-500 to-red-600', icon: Shield },
          { title: 'New This Week', value: Math.floor(users.length * 0.2), color: 'from-purple-500 to-purple-600', icon: Calendar }
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, shadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-gray-600 text-sm font-medium">{stat.title}</h3>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Filters */}
      <motion.div
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {roles.map(role => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
            <motion.button
              className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Filter className="w-5 h-5" />
              <span>More Filters</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Users Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-pulse">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <AnimatePresence>
            {filteredUsers.map((user, index) => {
              const RoleIcon = getRoleIcon(user.role);
              return (
                <motion.div
                  key={user.id}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                  onClick={() => setSelectedUser(user)}
                >
                  {/* User Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <img
                          src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`}
                          alt={user.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{user.name}</h3>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                    </div>
                    <div className="relative">
                      <motion.button
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <MoreVertical className="w-4 h-4 text-gray-500" />
                      </motion.button>
                    </div>
                  </div>

                  {/* Role Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getRoleColor(user.role)}`}>
                      <RoleIcon className="w-3 h-3 mr-1" />
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                    <div className="flex space-x-1">
                      <motion.button
                        className="p-1.5 hover:bg-blue-50 rounded-lg transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Eye className="w-4 h-4 text-blue-600" />
                      </motion.button>
                      <motion.button
                        className="p-1.5 hover:bg-gray-50 rounded-lg transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Edit className="w-4 h-4 text-gray-600" />
                      </motion.button>
                      <motion.button
                        className="p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </motion.button>
                    </div>
                  </div>

                  {/* User Preferences */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Body Type:</span>
                      <span className="font-medium capitalize">{user.preferences.bodyType}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Skin Tone:</span>
                      <span className="font-medium capitalize">{user.preferences.skinTone}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Lighting:</span>
                      <span className="font-medium capitalize">{user.preferences.preferredLighting}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">AI Recommendations:</span>
                      <span className={`font-medium ${user.preferences.aiRecommendations ? 'text-green-600' : 'text-red-600'}`}>
                        {user.preferences.aiRecommendations ? 'Enabled' : 'Disabled'}
                      </span>
                    </div>
                  </div>

                  {/* Body Measurements Preview */}
                  {user.measurements && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Body Measurements</h4>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Height:</span>
                          <span className="font-medium">{user.measurements.height}cm</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Weight:</span>
                          <span className="font-medium">{user.measurements.weight}kg</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Chest:</span>
                          <span className="font-medium">{user.measurements.chest}cm</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Waist:</span>
                          <span className="font-medium">{user.measurements.waist}cm</span>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Empty State */}
      {!loading && filteredUsers.length === 0 && (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No users found</h3>
          <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
          <motion.button
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Add Your First User
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default UserManagement;