import { Link } from "react-router-dom";
import { Car } from "../../types";

interface FeaturedCarCardProps {
  car: Car;
}

const FeaturedCarCard = ({ car }: FeaturedCarCardProps) => {
  return (
    <Link to={`/cars/${car.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <img
          src={car.image}
          alt={car.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold">{car.title}</h3>
          <p className="text-2xl font-bold text-blue-600">
            ${car.price.toLocaleString()}
          </p>
          <p className="text-gray-600 mt-2">{car.location}</p>
        </div>
      </div>
    </Link>
  );
};

export default FeaturedCarCard;
