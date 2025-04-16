import { Link } from "react-router-dom";
import { Car } from "../../types";
import { Button } from "@/components/ui/button";
import FeaturedCarCard from "../cars/FeaturedCarCard";

// Mock data for featured cars
const featuredCars: Car[] = [
  {
    _id: "1",
    title: "2023 BMW 3 Series",
    subtitle: "Luxury sedan with premium features",
    price: 45000,
    description: "Luxury sedan with premium features",
    image: "/bmw-3.jpg",
    brand: "BMW",
    model: "3 Series",
    year: 2023,
    mileage: 5000,
    fuelType: "Petrol",
    transmission: "Automatic",
    category: "Sedan",
    location: "New York, NY",
    color: "Black",
    features: ["Leather Seats", "Navigation", "Sunroof"],
    quantity: 1,
    inStock: true,
  },
  {
    _id: "2",
    title: "2024 Mercedes-Benz C-Class",
    subtitle: "Elegant design with cutting-edge technology",
    price: 52000,
    description: "Elegant design with cutting-edge technology",
    image: "/mercedes-benz-C-Class.jpg",
    brand: "Mercedes-Benz",
    model: "C-Class",
    year: 2024,
    mileage: 1000,
    fuelType: "Hybrid",
    transmission: "Automatic",
    category: "Sedan",
    location: "Los Angeles, CA",
    color: "Silver",
    features: ["360° Camera", "Wireless Charging", "Lane Assist"],
    quantity: 1,
    inStock: true,
  },
  {
    _id: "3",
    title: "2023 Audi A4",
    subtitle: "Perfect blend of performance and comfort",
    price: 48000,
    description: "Perfect blend of performance and comfort",
    image: "/Audi-A4.jpg",
    brand: "Audi",
    model: "A4",
    year: 2023,
    mileage: 3000,
    fuelType: "Petrol",
    transmission: "Automatic",
    category: "Sedan",
    location: "Chicago, IL",
    color: "White",
    features: ["Virtual Cockpit", "Bang & Olufsen Sound", "Quattro AWD"],
    quantity: 1,
    inStock: true,
  },
];

const FeaturedCars = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Featured Cars</h2>
          <p className="mt-4 text-xl text-gray-600">
            Discover our hand-picked selection of premium vehicles
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCars.map((car) => (
            <FeaturedCarCard key={car._id} car={car} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg" variant="outline">
            <Link to="/allProducts">View All Cars</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCars;
