import { Link } from "react-router-dom";
import { Car } from "../../types";
import FeaturedCarCard from "../cars/FeaturedCarCard";

// Mock data for featured cars
const featuredCars: Car[] = [
  {
    id: "1",
    title: "2023 BMW 3 Series",
    price: 45000,
    description: "Luxury sedan with premium features",
    image: "/bmw-3.jpg",
    brand: "BMW",
    model: "3 Series",
    year: 2023,
    mileage: 5000,
    fuelType: "Gasoline",
    transmission: "Automatic",
    location: "New York, NY",
    seller: {
      id: "1",
      name: "Premium Motors",
      email: "info@premiummotors.com",
    },
    features: ["Leather Seats", "Navigation", "Sunroof"],
    createdAt: "2024-04-07",
  },
  {
    id: "2",
    title: "2024 Mercedes-Benz C-Class",
    price: 52000,
    description: "Elegant design with cutting-edge technology",
    image: "/mercedes-benz-C-Class.jpg", // Using same image as placeholder
    brand: "Mercedes-Benz",
    model: "C-Class",
    year: 2024,
    mileage: 1000,
    fuelType: "Hybrid",
    transmission: "Automatic",
    location: "Los Angeles, CA",
    seller: {
      id: "2",
      name: "Luxury Auto Gallery",
      email: "sales@luxuryautogallery.com",
    },
    features: ["360° Camera", "Wireless Charging", "Lane Assist"],
    createdAt: "2024-04-07",
  },
  {
    id: "3",
    title: "2023 Audi A4",
    price: 48000,
    description: "Perfect blend of performance and comfort",
    image: "/Audi-A4.jpg", // Using same image as placeholder
    brand: "Audi",
    model: "A4",
    year: 2023,
    mileage: 3000,
    fuelType: "Gasoline",
    transmission: "Automatic",
    location: "Chicago, IL",
    seller: {
      id: "3",
      name: "Elite Motors",
      email: "info@elitemotors.com",
    },
    features: ["Virtual Cockpit", "Bang & Olufsen Sound", "Quattro AWD"],
    createdAt: "2024-04-07",
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
            <FeaturedCarCard key={car.id} car={car} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/cars"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors"
          >
            View All Cars
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCars;
