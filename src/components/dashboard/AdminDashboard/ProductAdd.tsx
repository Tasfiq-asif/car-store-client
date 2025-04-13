import  { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import axios from "axios";

const categories = ["Sedan", "SUV", "Truck", "Coupe", "Convertible"];
const fuelTypes = ["Petrol", "Diesel", "Electric", "Hybrid"];
const transmissions = ["Automatic", "Manual"];

export default function AddProducts() {
  const [form, setForm] = useState({
    brand: "",
    model: "",
    title: "",
    subtitle: "",
    image: null,
    year: "",
    price: "",
    mileage: "",
    fuelType: "Petrol",
    transmission: "Automatic",
    category: "Sedan",
    location: "",
    color: "",
    features: "",
    description: "",
    quantity: "",
    inStock: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    const newValue = type === "checkbox" ? checked : type === "file" ? files[0] : value;
    setForm((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = "";
      if (form.image) {
        const formData = new FormData();
        formData.append("image", form.image);
        const res = await axios.post(`https://api.imgbb.com/1/upload?key=18f98d5fc654a620f944bea8182d6c6c`, formData);
        imageUrl = res.data.data.url;
      }

      const productData = {
        brand: form.brand,
        model: form.model,
        title: form.title,
        subtitle: form.subtitle,
        image: imageUrl,
        year: Number(form.year),
        price: Number(form.price),
        mileage: Number(form.mileage),
        fuelType: form.fuelType,
        transmission: form.transmission,
        category: form.category,
        location: form.location,
        color: form.color,
        features: form.features.split(',').map(f => f.trim()),
        description: form.description,
        quantity: Number(form.quantity),
        inStock: form.inStock,
      };

      const response = await axios.post("http://localhost:8000/api/v1/cars", productData);
      console.log("Backend Response:", response.data);
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Something went wrong while submitting the product.");
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-100 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="w-full max-w-3xl shadow-2xl rounded-2xl p-6 bg-white">
        <CardContent>
          <h2 className="text-2xl font-bold text-center mb-6 text-green-700">Add New Car</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><Label>Brand</Label><Input name="brand" value={form.brand} onChange={handleChange} required /></div>
            <div><Label>Model</Label><Input name="model" value={form.model} onChange={handleChange} required /></div>
            <div><Label>Title</Label><Input name="title" value={form.title} onChange={handleChange} required /></div>
            <div><Label>Subtitle</Label><Input name="subtitle" value={form.subtitle} onChange={handleChange} required /></div>
            <div><Label>Year</Label><Input type="number" name="year" value={form.year} onChange={handleChange} required /></div>
            <div><Label>Price</Label><Input type="number" name="price" value={form.price} onChange={handleChange} required /></div>
            <div><Label>Mileage</Label><Input type="number" name="mileage" value={form.mileage} onChange={handleChange} required /></div>
            <div>
              <Label>Fuel Type</Label>
              <select name="fuelType" value={form.fuelType} onChange={handleChange} className="w-full border rounded-md px-3 py-2">
                {fuelTypes.map(type => <option key={type} value={type}>{type}</option>)}
              </select>
            </div>
            <div>
              <Label>Transmission</Label>
              <select name="transmission" value={form.transmission} onChange={handleChange} className="w-full border rounded-md px-3 py-2">
                {transmissions.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <Label>Category</Label>
              <select name="category" value={form.category} onChange={handleChange} className="w-full border rounded-md px-3 py-2">
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            <div><Label>Location</Label><Input name="location" value={form.location} onChange={handleChange} required /></div>
            <div><Label>Color</Label><Input name="color" value={form.color} onChange={handleChange} required /></div>
            <div><Label>Features (comma-separated)</Label><Input name="features" value={form.features} onChange={handleChange} required /></div>
            <div className="col-span-2">
              <Label>Description</Label>
              <Textarea name="description" value={form.description} onChange={handleChange} rows={4} required />
            </div>
            <div>
              <Label>In Stock</Label>
              <Input type="checkbox" name="inStock" checked={form.inStock} onChange={handleChange} />
            </div>
            <div>
              <Label>Car Image</Label>
              <Input type="file" name="image" accept="image/*" onChange={handleChange} />
            </div>
            <div><Label>Quantity</Label><Input type="number" name="quantity" value={form.quantity} onChange={handleChange} required /></div>
            <div className="col-span-2">
              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl">
                Add Car
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}


