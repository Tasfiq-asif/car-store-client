
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";

export default function ManageProducts() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/cars");
      const data = Array.isArray(res.data) ? res.data : res.data.data || [];
      setCars(data);
    } catch (err) {
      console.error("Failed to fetch cars:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/cars/${id}`);
      setCars((prev) => prev.filter((car) => car._id !== id));
    } catch (err) {
      console.error("Failed to delete car:", err);
    }
  };

  const handleUpdate = (car) => {
    setSelectedCar(car);
    setEditModalOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setSelectedCar((prev) => ({ ...prev, [name]: value }));
  };

  const submitUpdate = async () => {
    try {
      await axios.put(`http://localhost:8000/api/v1/cars/${selectedCar._id}`, selectedCar);
      setCars((prev) => prev.map((c) => (c._id === selectedCar._id ? selectedCar : c)));
      setEditModalOpen(false);
    } catch (err) {
      console.error("Failed to update car:", err);
    }
  };

  if (loading) return <p className="text-center p-4">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">Manage Cars</h2>
      <Card>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full border">
              <thead className="bg-blue-100">
                <tr>
                  <th className="px-4 py-2 border">Brand</th>
                  <th className="px-4 py-2 border">Model</th>
                  <th className="px-4 py-2 border">Year</th>
                  <th className="px-4 py-2 border">Price</th>
                  <th className="px-4 py-2 border">Category</th>
                  <th className="px-4 py-2 border">Stock</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cars.map((car) => (
                  <tr key={car._id} className="text-center">
                    <td className="border px-4 py-2">{car.brand}</td>
                    <td className="border px-4 py-2">{car.model}</td>
                    <td className="border px-4 py-2">{car.year}</td>
                    <td className="border px-4 py-2">${car.price}</td>
                    <td className="border px-4 py-2">{car.category}</td>
                    <td className="border px-4 py-2">{car.inStock ? "Yes" : "No"}</td>
                    <td className="border px-4 py-2 space-x-2">
                      <Button onClick={() => handleUpdate(car)} variant="outline" className="text-blue-600">Edit</Button>
                      <Button onClick={() => handleDelete(car._id)} variant="destructive">Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Car Details</DialogTitle>
          </DialogHeader>
          {selectedCar && (
            <div className="space-y-4">
              <div>
                <Label>Brand</Label>
                <Input name="brand" value={selectedCar.brand} onChange={handleEditChange} />
              </div>
              <div>
                <Label>Model</Label>
                <Input name="model" value={selectedCar.model} onChange={handleEditChange} />
              </div>
              <div>
                <Label>Year</Label>
                <Input name="year" value={selectedCar.year} onChange={handleEditChange} type="number" />
              </div>
              <div>
                <Label>Price</Label>
                <Input name="price" value={selectedCar.price} onChange={handleEditChange} type="number" />
              </div>
              <div>
                <Label>Category</Label>
                <Select value={selectedCar.category} onValueChange={(value) => setSelectedCar((prev) => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Sedan">Sedan</SelectItem>
                    <SelectItem value="SUV">SUV</SelectItem>
                    <SelectItem value="Truck">Truck</SelectItem>
                    <SelectItem value="Coupe">Coupe</SelectItem>
                    <SelectItem value="Convertible">Convertible</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Stock</Label>
                <Select value={selectedCar.inStock ? "true" : "false"} onValueChange={(value) => setSelectedCar((prev) => ({ ...prev, inStock: value === "true" }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select stock status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">In Stock</SelectItem>
                    <SelectItem value="false">Out of Stock</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="pt-4 text-right">
                <Button onClick={submitUpdate}>Update</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
