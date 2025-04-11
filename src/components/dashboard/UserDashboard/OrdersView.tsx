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
      setOrders(res.data);
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
            <table className="min-w-full border">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 border">Customer</th>
                  <th className="px-4 py-2 border">Product</th>
                  <th className="px-4 py-2 border">Amount</th>
                  <th className="px-4 py-2 border">Status</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders?.map((order) => (
                  <tr key={order._id} className="text-center">
                    <td className="border px-4 py-2">{order.customerName}</td>
                    <td className="border px-4 py-2">{order.product}</td>
                    <td className="border px-4 py-2">${order.amount}</td>
                    <td className="border px-4 py-2">{order.status}</td>
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
