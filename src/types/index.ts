export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'manager' | 'user';
  tenantId: string;
  avatar?: string;
  preferences: UserPreferences;
  measurements?: BodyMeasurements;
}

export interface UserPreferences {
  skinTone: 'light' | 'medium' | 'dark' | 'deep';
  bodyType: 'pear' | 'apple' | 'hourglass' | 'rectangle' | 'inverted-triangle';
  preferredLighting: 'natural' | 'warm' | 'cool' | 'studio';
  aiRecommendations: boolean;
}

export interface BodyMeasurements {
  height: number;
  weight: number;
  chest: number;
  waist: number;
  hips: number;
  shoulders: number;
}

export interface Tenant {
  id: string;
  name: string;
  domain: string;
  logo?: string;
  settings: TenantSettings;
  subscription: 'basic' | 'pro' | 'enterprise';
}

export interface TenantSettings {
  allowedUsers: number;
  features: string[];
  customBranding: boolean;
  apiAccess: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: 'clothing' | 'accessories' | 'shoes';
  brand: string;
  images: string[];
  sizes: string[];
  colors: string[];
  price: number;
  description: string;
  tags: string[];
}

export interface TryOnSession {
  id: string;
  userId: string;
  productId: string;
  timestamp: Date;
  duration: number;
  interactions: number;
  converted: boolean;
  feedback?: number;
}

export interface Analytics {
  totalSessions: number;
  conversionRate: number;
  averageSessionTime: number;
  popularProducts: Product[];
  userEngagement: {
    daily: number[];
    weekly: number[];
    monthly: number[];
  };
}