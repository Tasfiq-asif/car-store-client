export interface User {
  name: string;
  email: string;
  role: "user" | "admin";
  userStatus: "active" | "inactive";
}

export interface Car {
  id: string;
  title: string;
  price: number;
  description: string;
  image: string;
  brand: string;
  model: string;
  year: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  location: string;
  seller: User;
  features: string[];
  createdAt: string;
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
