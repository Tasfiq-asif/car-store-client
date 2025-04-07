import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import FeaturedCars from "../components/home/FeaturedCars";

const bannerSlides = [
  {
    image: "/hero-1.jpg",
    title: "Find Your Dream Car",
    description: "Browse through our extensive collection of premium vehicles",
  },
  {
    image: "/hero-2.jpg",
    title: "Best Deals Guaranteed",
    description: "Get the best prices on quality used and new cars",
  },
  {
    image: "/hero-3.jpg",
    title: "Expert Service",
    description:
      "Our team of experts is here to help you make the right choice",
  },
];

const Home = () => {
  return (
    <div>
      {/* Banner Section */}
      <section className="relative">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          className="h-[600px]"
        >
          {bannerSlides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div
                className="relative h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-40" />
                <div className="absolute inset-0 flex items-center justify-center text-center">
                  <div className="max-w-3xl px-4">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                      {slide.title}
                    </h1>
                    <p className="text-xl text-white mb-8">
                      {slide.description}
                    </p>
                    <Link
                      to="/cars"
                      className="inline-block bg-blue-600 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      Browse Cars
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Featured Cars Section */}
      <FeaturedCars />

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              What Our Customers Say
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Read about experiences from our satisfied customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-xl font-semibold text-gray-600">
                    JD
                  </span>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">John Doe</h4>
                  <p className="text-gray-600">Bought a BMW 3 Series</p>
                </div>
              </div>
              <p className="text-gray-700">
                "Excellent service and amazing selection of cars. The team was
                very helpful throughout the entire process."
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
