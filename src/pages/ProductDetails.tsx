import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  FaCar,
  FaGasPump,
  FaRoad,
  FaCalendarAlt,
  FaPalette,
  FaCog,
  FaMapMarkerAlt,
  FaCheckCircle,
} from "react-icons/fa";
import { ScrollArea } from "@/components/ui/scroll-area";

const ProductDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [car, setCar] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      const fetchCarDetails = async () => {
        try {
          const response = await fetch(`http://localhost:8000/api/v1/cars/${id}`);
          if (!response.ok) {
            throw new Error("Failed to fetch car details");
          }
          const data = await response.json();
          setCar(data);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      if (id) {
        fetchCarDetails();
      }
    }, [id]);

    if (loading) {
      return <div>Loading...</div>;
    }
    if (error) {
      return <div>Error: {error}</div>;
    }
    console.log(car.data);
    const {
      title,
      subtitle,
      description,
      price,
      image,
      features,
      brand,
      model,
      year,
      mileage,
      fuelType,
      transmission,
      location,
      color,
    } = car.data;
    return (
      <div>
        <div className="pt-12 pb-16 bg-gray-100 ">
          <div className="container mx-auto px-4 md:px-8 lg:px-12">
            <Card className="overflow-hidden shadow-lg">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img
                    src={image}
                    alt={title}
                    className="w-full h-auto object-cover border-8 rounded-3xl rounded-tl-none"
                  />
                  <div className='p-10'>
                    <h3 className="text-lg font-semibold mb-2">Description</h3>
                    <p className="text-gray-700">{description}</p>
                  </div>
                </div>
                <div className="md:w-1/2 p-6">
                  <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold tracking-tight">
                      {title}
                    </CardTitle>
                    <CardDescription className="text-gray-500">
                      {subtitle}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <div className="flex items-center space-x-2">
                      <FaCar className="text-gray-500" />
                      <span className="font-semibold">
                        {brand} {model}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaCalendarAlt className="text-gray-500" />
                      <span>Year: {year}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaRoad className="text-gray-500" />
                      <span>Mileage: {mileage}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaGasPump className="text-gray-500" />
                      <span>Fuel Type: {fuelType}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaCog className="text-gray-500" />
                      <span>Transmission: {transmission}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaPalette className="text-gray-500" />
                      <span>Color: {color}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaMapMarkerAlt className="text-gray-500" />
                      <span>Location: {location}</span>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mt-2 mb-2">Features</h3>
                      <ScrollArea className="max-h-32 scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-gray-500 rounded-md p-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {features &&
                            features.map((feature, index) => (
                              <Badge key={index} className="gap-2">
                                <FaCheckCircle className="text-green-500" />
                                {feature}
                              </Badge>
                            ))}
                        </div>
                      </ScrollArea>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <div className="text-3xl font-semibold">$ {price}</div>
                    <Button>Buy Now</Button>
                  </CardFooter>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
};

export default ProductDetails;
