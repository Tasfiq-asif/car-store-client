export interface User {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  userStatus: "active" | "inactive";
  photo?: string;
}

export interface Car {
  _id: string;
  brand: string;
  model: string;
  title: string;
  subtitle: string;
  image: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: "Petrol" | "Diesel" | "Electric" | "Hybrid" | "Gasoline";
  transmission: "Automatic" | "Manual";
  category: "Sedan" | "SUV" | "Truck" | "Coupe" | "Convertible";
  location: string;
  color: string;
  features: string[];
  description: string | null;
  quantity: number;
  inStock: boolean;
}

export interface CarFilters {
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  minYear?: number;
  maxYear?: number;
  transmission?: string;
  fuelType?: string;
}
// Define interface for profile data
export interface ProfileData {
  name: string;
  photo?: string | null;
}

// Define interface for password data
export interface PasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// Define interface for API error
export interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}
