import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { axiosProtected } from "@/lib/axios";
import { Order } from "@/types";

export default function OrderTable() {
  const [orders, setOrders] = useState<Order[] | undefined>();
  const [revenue, setRevenue] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchOrders();
    fetchRevenue();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axiosProtected.get(
        import.meta.env.VITE_API_URL + "v1/orders"
      );
      console.log(res.data.data);
      setOrders(res.data.data);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    } finally {
      setLoading(false);
    }
  };
  console.log(orders);

  const fetchRevenue = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/v1/orders/revenue"
      );
      // console.log(res.data.data);
      setRevenue(res.data.data);
    } catch (err) {
      console.error("Failed to fetch revenue:", err);
    }
  };

  const handleStatusChange = async (orderId: string, status: string) => {
    try {
      await axios.patch(`http://localhost:8000/api/v1/orders/${orderId}`, {
        status,
      });
      setOrders((prev) =>
        prev
          ? prev.map((order) =>
              order._id === orderId ? { ...order, status } : order
            )
          : []
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
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">All Sales Data</h2>
            <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 border">#</th>
                  <th className="px-4 py-2 border">Car ID</th>
                  <th className="px-4 py-2 border">Customer Email</th>
                  <th className="px-4 py-2 border">Quantity</th>
                  <th className="px-4 py-2 border">Total Price ($)</th>
                  <th className="px-4 py-2 border">Sale Date</th>
                </tr>
              </thead>
              <tbody>
                {orders?.map((sale, index) => (
                  <tr key={sale.carId + index} className="hover:bg-gray-100">
                    <td className="px-4 py-2 border text-center">
                      {index + 1}
                    </td>
                    <td className="px-4 py-2 border">{sale.carId}</td>
                    <td className="px-4 py-2 border">{sale.email}</td>
                    <td className="px-4 py-2 border text-center">
                      {sale.quantity}
                    </td>
                    <td className="px-4 py-2 border text-right">
                      {sale.totalprice}
                    </td>
                    <td className="px-4 py-2 border text-center">
                      {new Date(sale.createdAt).toLocaleDateString()}
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
