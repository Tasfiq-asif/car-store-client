import  { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";

export default function OrderView() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/orders");
      setOrders(res.data.data);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    } finally {
      setLoading(false);
    }
  };




  if (loading) return <p className="text-center p-4">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center text-blue-700 mb-4">
        Orders Table
      </h2>
      <Card>
        <CardContent>
          <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 border">#</th>
            <th className="px-4 py-2 border">Car ID</th>
            <th className="px-4 py-2 border">Customer Email</th>
            <th className="px-4 py-2 border">Quantity</th>
            <th className="px-4 py-2 border">Total Price ($)</th>
            <th className="px-4 py-2 border">Buy Date</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((sale, index) => (
            <tr key={sale.carId + index} className="hover:bg-gray-100">
              <td className="px-4 py-2 border text-center">{index + 1}</td>
              <td className="px-4 py-2 border">{sale.carId}</td>
              <td className="px-4 py-2 border">{sale.email}</td>
              <td className="px-4 py-2 border text-center">{sale.quantity}</td>
              <td className="px-4 py-2 border text-right">{sale.totalprice}</td>
              <td className="px-4 py-2 border text-center">{new Date(sale.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
