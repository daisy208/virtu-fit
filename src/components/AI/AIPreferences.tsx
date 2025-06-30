import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Zap, 
  Target, 
  Eye, 
  Palette,
  User,
  Settings,
  BarChart3,
  Lightbulb,
  Cpu,
  Save,
  RefreshCw
} from 'lucide-react';

const AIPreferences: React.FC = () => {
  const [preferences, setPreferences] = useState({
    bodyAnalysis: {
      enabled: true,
      accuracy: 'high',
      realTimeProcessing: true,
      confidenceThreshold: 85
    },
    sizeRecommendation: {
      enabled: true,
      algorithm: 'advanced',
      considerBodyType: true,
      considerBrand: true,
      learningMode: true
    },
    lightingOptimization: {
      enabled: true,
      autoAdjust: true,
      skinToneAdaptation: true,
      environmentalFactors: true
    },
    personalizedRecommendations: {
      enabled: true,
      stylePreferences: true,
      purchaseHistory: true,
      behaviorAnalysis: true,
      collaborativeFiltering: true
    },
    performance: {
      processingSpeed: 'balanced',
      qualityLevel: 'high',
      cacheResults: true,
      batchProcessing: false
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const handleSave = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLastSaved(new Date());
    setIsLoading(false);
  };

  const handleReset = () => {
    // Reset to default values
    setPreferences({
      bodyAnalysis: {
        enabled: true,
        accuracy: 'high',
        realTimeProcessing: true,
        confidenceThreshold: 85
      },
      sizeRecommendation: {
        enabled: true,
        algorithm: 'advanced',
        considerBodyType: true,
        considerBrand: true,
        learningMode: true
      },
      lightingOptimization: {
        enabled: true,
        autoAdjust: true,
        skinToneAdaptation: true,
        environmentalFactors: true
      },
      personalizedRecommendations: {
        enabled: true,
        stylePreferences: true,
        purchaseHistory: true,
        behaviorAnalysis: true,
        collaborativeFiltering: true
      },
      performance: {
        processingSpeed: 'balanced',
        qualityLevel: 'high',
        cacheResults: true,
        batchProcessing: false
      }
    });
  };

  const updatePreference = (section: string, key: string, value: any) => {
    setPreferences(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [key]: value
      }
    }));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">AI Preferences</h1>
          <p className="text-gray-600 mt-1">Configure AI-powered features and optimization settings</p>
        </div>
        <div className="flex items-center space-x-4">
          <motion.button
            onClick={handleReset}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reset</span>
          </motion.button>
          <motion.button
            onClick={handleSave}
            disabled={isLoading}
            className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isLoading ? (
              <>
                <motion.div
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </>
            )}
          </motion.button>
        </div>
      </motion.div>

      {/* Last Saved Indicator */}
      {lastSaved && (
        <motion.div
          className="bg-green-50 border border-green-200 rounded-lg p-3 text-green-700 text-sm"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Settings saved successfully at {lastSaved.toLocaleTimeString()}
        </motion.div>
      )}

      {/* AI Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'Body Analysis', icon: User, status: preferences.bodyAnalysis.enabled, color: 'from-blue-500 to-blue-600' },
          { title: 'Size Recommendations', icon: Target, status: preferences.sizeRecommendation.enabled, color: 'from-green-500 to-green-600' },
          { title: 'Lighting Optimization', icon: Eye, status: preferences.lightingOptimization.enabled, color: 'from-yellow-500 to-yellow-600' },
          { title: 'Personalization', icon: Brain, status: preferences.personalizedRecommendations.enabled, color: 'from-purple-500 to-purple-600' }
        ].map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-lg flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${item.status ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className={`text-sm font-medium ${item.status ? 'text-green-600' : 'text-red-600'}`}>
                  {item.status ? 'Active' : 'Inactive'}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Configuration Sections */}
      <div className="space-y-6">
        {/* Body Analysis Settings */}
        <motion.div
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Body Analysis</h3>
              <p className="text-sm text-gray-600">Configure AI-powered body measurement and analysis</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center space-x-3 mb-4">
                <input
                  type="checkbox"
                  checked={preferences.bodyAnalysis.enabled}
                  onChange={(e) => updatePreference('bodyAnalysis', 'enabled', e.target.checked)}
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <span className="font-medium text-gray-900">Enable Body Analysis</span>
              </label>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Analysis Accuracy</label>
                  <select
                    value={preferences.bodyAnalysis.accuracy}
                    onChange={(e) => updatePreference('bodyAnalysis', 'accuracy', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="standard">Standard</option>
                    <option value="high">High</option>
                    <option value="ultra">Ultra High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confidence Threshold: {preferences.bodyAnalysis.confidenceThreshold}%
                  </label>
                  <input
                    type="range"
                    min="50"
                    max="99"
                    value={preferences.bodyAnalysis.confidenceThreshold}
                    onChange={(e) => updatePreference('bodyAnalysis', 'confidenceThreshold', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="flex items-center space-x-3 mb-4">
                <input
                  type="checkbox"
                  checked={preferences.bodyAnalysis.realTimeProcessing}
                  onChange={(e) => updatePreference('bodyAnalysis', 'realTimeProcessing', e.target.checked)}
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <span className="font-medium text-gray-900">Real-time Processing</span>
              </label>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Processing Stats</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Average Processing Time:</span>
                    <span className="font-medium">1.2s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Accuracy Rate:</span>
                    <span className="font-medium text-green-600">94.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Daily Analyses:</span>
                    <span className="font-medium">2,847</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Size Recommendation Settings */}
        <motion.div
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Size Recommendation Engine</h3>
              <p className="text-sm text-gray-600">AI-powered size suggestions based on body analysis</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={preferences.sizeRecommendation.enabled}
                  onChange={(e) => updatePreference('sizeRecommendation', 'enabled', e.target.checked)}
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <span className="font-medium text-gray-900">Enable Size Recommendations</span>
              </label>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Algorithm Type</label>
                <select
                  value={preferences.sizeRecommendation.algorithm}
                  onChange={(e) => updatePreference('sizeRecommendation', 'algorithm', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="basic">Basic</option>
                  <option value="advanced">Advanced ML</option>
                  <option value="neural">Neural Network</option>
                </select>
              </div>

              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={preferences.sizeRecommendation.considerBodyType}
                  onChange={(e) => updatePreference('sizeRecommendation', 'considerBodyType', e.target.checked)}
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <span className="text-sm text-gray-700">Consider Body Type</span>
              </label>

              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={preferences.sizeRecommendation.considerBrand}
                  onChange={(e) => updatePreference('sizeRecommendation', 'considerBrand', e.target.checked)}
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <span className="text-sm text-gray-700">Consider Brand Sizing</span>
              </label>
            </div>

            <div>
              <label className="flex items-center space-x-3 mb-4">
                <input
                  type="checkbox"
                  checked={preferences.sizeRecommendation.learningMode}
                  onChange={(e) => updatePreference('sizeRecommendation', 'learningMode', e.target.checked)}
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <span className="font-medium text-gray-900">Continuous Learning</span>
              </label>

              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Recommendation Performance</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-blue-700">Accuracy Rate:</span>
                    <span className="font-medium text-blue-900">96.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Return Reduction:</span>
                    <span className="font-medium text-blue-900">-28%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">User Satisfaction:</span>
                    <span className="font-medium text-blue-900">4.8/5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Lighting Optimization */}
        <motion.div
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center">
              <Eye className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Lighting Optimization</h3>
              <p className="text-sm text-gray-600">Adaptive lighting based on skin tone and environment</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={preferences.lightingOptimization.enabled}
                  onChange={(e) => updatePreference('lightingOptimization', 'enabled', e.target.checked)}
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <span className="font-medium text-gray-900">Enable Optimization</span>
              </label>

              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={preferences.lightingOptimization.autoAdjust}
                  onChange={(e) => updatePreference('lightingOptimization', 'autoAdjust', e.target.checked)}
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <span className="text-sm text-gray-700">Auto-adjust Lighting</span>
              </label>
            </div>

            <div className="space-y-4">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={preferences.lightingOptimization.skinToneAdaptation}
                  onChange={(e) => updatePreference('lightingOptimization', 'skinToneAdaptation', e.target.checked)}
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <span className="text-sm text-gray-700">Skin Tone Adaptation</span>
              </label>

              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={preferences.lightingOptimization.environmentalFactors}
                  onChange={(e) => updatePreference('lightingOptimization', 'environmentalFactors', e.target.checked)}
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <span className="text-sm text-gray-700">Environmental Factors</span>
              </label>
            </div>

            <div className="bg-yellow-50 rounded-lg p-4">
              <h4 className="font-medium text-yellow-900 mb-2">Lighting Stats</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-yellow-700">Adjustments/Day:</span>
                  <span className="font-medium text-yellow-900">1,247</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-yellow-700">User Preference:</span>
                  <span className="font-medium text-yellow-900">Natural</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Performance Settings */}
        <motion.div
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center">
              <Cpu className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Performance & Processing</h3>
              <p className="text-sm text-gray-600">Optimize AI processing speed and quality</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Processing Speed</label>
                <select
                  value={preferences.performance.processingSpeed}
                  onChange={(e) => updatePreference('performance', 'processingSpeed', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="fast">Fast (Lower Quality)</option>
                  <option value="balanced">Balanced</option>
                  <option value="quality">Quality (Slower)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quality Level</label>
                <select
                  value={preferences.performance.qualityLevel}
                  onChange={(e) => updatePreference('performance', 'qualityLevel', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="standard">Standard</option>
                  <option value="high">High</option>
                  <option value="ultra">Ultra</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={preferences.performance.cacheResults}
                  onChange={(e) => updatePreference('performance', 'cacheResults', e.target.checked)}
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <span className="text-sm text-gray-700">Cache Results</span>
              </label>

              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={preferences.performance.batchProcessing}
                  onChange={(e) => updatePreference('performance', 'batchProcessing', e.target.checked)}
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <span className="text-sm text-gray-700">Batch Processing</span>
              </label>

              <div className="bg-red-50 rounded-lg p-4">
                <h4 className="font-medium text-red-900 mb-2">System Performance</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-red-700">CPU Usage:</span>
                    <span className="font-medium text-red-900">23%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-red-700">Memory:</span>
                    <span className="font-medium text-red-900">1.2GB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-red-700">Queue:</span>
                    <span className="font-medium text-red-900">12 jobs</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AIPreferences;