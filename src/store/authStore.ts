import { create } from 'zustand';
import { User, Tenant } from '../types';

interface AuthState {
  user: User | null;
  tenant: Tenant | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  tenant: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (email: string, password: string) => {
    set({ isLoading: true });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: '1',
      email,
      name: 'John Doe',
      role: 'admin',
      tenantId: 'tenant-1',
      preferences: {
        skinTone: 'medium',
        bodyType: 'rectangle',
        preferredLighting: 'natural',
        aiRecommendations: true
      }
    };

    const mockTenant: Tenant = {
      id: 'tenant-1',
      name: 'Fashion Forward Inc.',
      domain: 'fashionforward.com',
      settings: {
        allowedUsers: 100,
        features: ['ai-recommendations', 'analytics', 'api-access'],
        customBranding: true,
        apiAccess: true
      },
      subscription: 'enterprise'
    };

    set({ 
      user: mockUser, 
      tenant: mockTenant, 
      isAuthenticated: true, 
      isLoading: false 
    });
  },

  logout: () => {
    set({ user: null, tenant: null, isAuthenticated: false });
  },

  updateUser: (updates: Partial<User>) => {
    const { user } = get();
    if (user) {
      set({ user: { ...user, ...updates } });
    }
  }
}));