import { create } from 'zustand';
import { Product, TryOnSession } from '../types';

interface TryOnState {
  selectedProduct: Product | null;
  isVirtualTryOnActive: boolean;
  currentSession: TryOnSession | null;
  cameraStream: MediaStream | null;
  aiRecommendations: Product[];
  setSelectedProduct: (product: Product) => void;
  startTryOn: () => void;
  endTryOn: () => void;
  setCameraStream: (stream: MediaStream | null) => void;
  generateRecommendations: (userId: string) => Promise<void>;
}

export const useTryOnStore = create<TryOnState>((set, get) => ({
  selectedProduct: null,
  isVirtualTryOnActive: false,
  currentSession: null,
  cameraStream: null,
  aiRecommendations: [],

  setSelectedProduct: (product: Product) => {
    set({ selectedProduct: product });
  },

  startTryOn: () => {
    const session: TryOnSession = {
      id: Date.now().toString(),
      userId: '1',
      productId: get().selectedProduct?.id || '',
      timestamp: new Date(),
      duration: 0,
      interactions: 0,
      converted: false
    };
    
    set({ 
      isVirtualTryOnActive: true, 
      currentSession: session 
    });
  },

  endTryOn: () => {
    set({ 
      isVirtualTryOnActive: false, 
      currentSession: null,
      cameraStream: null 
    });
  },

  setCameraStream: (stream: MediaStream | null) => {
    set({ cameraStream: stream });
  },

  generateRecommendations: async (userId: string) => {
    // Simulate AI recommendation API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockRecommendations: Product[] = [
      {
        id: '1',
        name: 'Classic Denim Jacket',
        category: 'clothing',
        brand: 'StyleCo',
        images: ['https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg'],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        colors: ['Blue', 'Black', 'White'],
        price: 89.99,
        description: 'Timeless denim jacket perfect for any occasion',
        tags: ['casual', 'versatile', 'trending']
      },
      {
        id: '2',
        name: 'Elegant Evening Dress',
        category: 'clothing',
        brand: 'LuxeFashion',
        images: ['https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg'],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        colors: ['Black', 'Navy', 'Burgundy'],
        price: 159.99,
        description: 'Sophisticated dress for special occasions',
        tags: ['formal', 'elegant', 'premium']
      }
    ];

    set({ aiRecommendations: mockRecommendations });
  }
}));