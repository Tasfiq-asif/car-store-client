import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function OrderTable() {
  const [orders, setOrders] = useState([]);
  const [revenue, setRevenue] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
    fetchRevenue();
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

  const fetchRevenue = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/orders/revenue");
      setRevenue(res.data.totalRevenue);
    } catch (err) {
      console.error("Failed to fetch revenue:", err);
    }
  };

  const handleStatusChange = async (orderId, status) => {
    try {
      await axios.patch(`http://localhost:8000/api/v1/orders/${orderId}`, { status });
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status } : order
        )
      );
    } catch (err) {
      console.error("Failed to update order status:", err);
    }
  };

  if (loading) return <p className="text-center p-4">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center text-blue-700 mb-4">
        Orders Table
      </h2>
      <p className="text-lg font-semibold text-center mb-6">
        Total Revenue: ${revenue}
      </p>
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
                    <td className="border px-4 py-2 space-x-2">
                      <Button
                        onClick={() => handleStatusChange(order._id, "accepted")}
                        className="bg-green-500 hover:bg-green-600 text-white"
                      >
                        Accept
                      </Button>
                      <Button
                        onClick={() => handleStatusChange(order._id, "canceled")}
                        className="bg-red-500 hover:bg-red-600 text-white"
                      >
                        Cancel
                      </Button>
                    </td>
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
