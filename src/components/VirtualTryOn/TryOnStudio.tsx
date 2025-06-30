import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Webcam from 'react-webcam';
import { 
  Camera, 
  RotateCcw, 
  Download, 
  Share2, 
  Sparkles,
  Palette,
  Sun,
  User
} from 'lucide-react';
import { useTryOnStore } from '../../store/tryOnStore';
import { useAuthStore } from '../../store/authStore';

const TryOnStudio: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [selectedLighting, setSelectedLighting] = useState('natural');
  const [selectedFilter, setSelectedFilter] = useState('none');
  
  const { 
    selectedProduct, 
    isVirtualTryOnActive, 
    startTryOn, 
    endTryOn,
    generateRecommendations 
  } = useTryOnStore();
  
  const { user } = useAuthStore();

  useEffect(() => {
    if (user && isVirtualTryOnActive) {
      generateRecommendations(user.id);
    }
  }, [isVirtualTryOnActive, user, generateRecommendations]);

  const handleCapture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedImage(imageSrc);
      setIsCapturing(true);
      
      // Simulate processing time
      setTimeout(() => setIsCapturing(false), 2000);
    }
  };

  const lightingOptions = [
    { id: 'natural', label: 'Natural', icon: Sun },
    { id: 'warm', label: 'Warm', icon: Sun },
    { id: 'cool', label: 'Cool', icon: Sun },
    { id: 'studio', label: 'Studio', icon: Sun }
  ];

  const filterOptions = [
    { id: 'none', label: 'None' },
    { id: 'enhance', label: 'Enhance' },
    { id: 'smooth', label: 'Smooth' },
    { id: 'vibrant', label: 'Vibrant' }
  ];

  return (
    <div className="h-full flex">
      {/* Main Try-On Area */}
      <div className="flex-1 bg-gray-900 relative overflow-hidden">
        <AnimatePresence>
          {isVirtualTryOnActive ? (
            <motion.div
              className="w-full h-full relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
            >
              {/* Webcam Feed */}
              <Webcam
                ref={webcamRef}
                className="w-full h-full object-cover"
                screenshotFormat="image/jpeg"
                videoConstraints={{
                  width: 1280,
                  height: 720,
                  facingMode: "user"
                }}
              />

              {/* AI Overlay Effects */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Body Detection Outline */}
                <motion.div
                  className="absolute inset-0 border-2 border-purple-500 opacity-30"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                  style={{
                    clipPath: 'polygon(30% 10%, 70% 10%, 80% 40%, 70% 90%, 30% 90%, 20% 40%)'
                  }}
                />

                {/* AI Processing Indicator */}
                {isCapturing && (
                  <motion.div
                    className="absolute top-4 left-4 bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Sparkles className="w-4 h-4 animate-spin" />
                    <span>AI Processing...</span>
                  </motion.div>
                )}

                {/* Size Recommendation Overlay */}
                <motion.div
                  className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-4 rounded-lg"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 }}
                >
                  <h3 className="font-semibold mb-2">AI Fit Analysis</h3>
                  <div className="space-y-1 text-sm">
                    <p>Recommended Size: <span className="text-green-400">M</span></p>
                    <p>Fit Confidence: <span className="text-blue-400">94%</span></p>
                    <p>Body Type Match: <span className="text-purple-400">Excellent</span></p>
                  </div>
                </motion.div>
              </div>

              {/* Controls Overlay */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                <div className="flex items-center space-x-4 bg-black bg-opacity-50 backdrop-blur-sm rounded-full px-6 py-3">
                  <motion.button
                    onClick={handleCapture}
                    className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Camera className="w-6 h-6 text-gray-900" />
                  </motion.button>
                  
                  <motion.button
                    className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <RotateCcw className="w-5 h-5 text-white" />
                  </motion.button>
                  
                  <motion.button
                    onClick={endTryOn}
                    className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    End Session
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              className="w-full h-full flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="text-center text-white">
                <motion.div
                  className="w-24 h-24 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Camera className="w-12 h-12" />
                </motion.div>
                <h2 className="text-2xl font-bold mb-4">Virtual Try-On Studio</h2>
                <p className="text-gray-400 mb-8">Select a product and start your virtual try-on experience</p>
                {selectedProduct && (
                  <motion.button
                    onClick={startTryOn}
                    className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Start Try-On
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Controls Panel */}
      <div className="w-80 bg-white border-l border-gray-200 p-6 overflow-y-auto">
        <h3 className="text-lg font-semibold mb-6">Try-On Controls</h3>

        {/* Product Info */}
        {selectedProduct && (
          <motion.div
            className="mb-6 p-4 bg-gray-50 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <img
              src={selectedProduct.images[0]}
              alt={selectedProduct.name}
              className="w-full h-32 object-cover rounded-lg mb-3"
            />
            <h4 className="font-semibold">{selectedProduct.name}</h4>
            <p className="text-sm text-gray-600">{selectedProduct.brand}</p>
            <p className="text-lg font-bold text-purple-600">${selectedProduct.price}</p>
          </motion.div>
        )}

        {/* Lighting Controls */}
        <div className="mb-6">
          <h4 className="font-medium mb-3 flex items-center">
            <Sun className="w-4 h-4 mr-2" />
            Lighting
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {lightingOptions.map((option) => (
              <motion.button
                key={option.id}
                onClick={() => setSelectedLighting(option.id)}
                className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                  selectedLighting === option.id
                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {option.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Filter Controls */}
        <div className="mb-6">
          <h4 className="font-medium mb-3 flex items-center">
            <Palette className="w-4 h-4 mr-2" />
            Filters
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {filterOptions.map((option) => (
              <motion.button
                key={option.id}
                onClick={() => setSelectedFilter(option.id)}
                className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                  selectedFilter === option.id
                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {option.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Body Type & Skin Tone */}
        <div className="mb-6">
          <h4 className="font-medium mb-3 flex items-center">
            <User className="w-4 h-4 mr-2" />
            Personal Settings
          </h4>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Body Type
              </label>
              <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                <option value="rectangle">Rectangle</option>
                <option value="pear">Pear</option>
                <option value="apple">Apple</option>
                <option value="hourglass">Hourglass</option>
                <option value="inverted-triangle">Inverted Triangle</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Skin Tone
              </label>
              <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                <option value="light">Light</option>
                <option value="medium">Medium</option>
                <option value="dark">Dark</option>
                <option value="deep">Deep</option>
              </select>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {capturedImage && (
          <div className="space-y-3">
            <motion.button
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Download className="w-4 h-4" />
              <span>Save Image</span>
            </motion.button>
            
            <motion.button
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TryOnStudio;