import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { axiosProtected } from "@/lib/axios";
import { Order } from "@/types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, AlertCircle } from "lucide-react";

export default function OrderTable() {
  const [orders, setOrders] = useState<Order[] | undefined>();
  const [revenue, setRevenue] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
    fetchRevenue();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);

      // This will use the baseURL from axiosProtected configuration
      const res = await axiosProtected.get(`/v1/orders/all`);

      console.log("API Response:", res);

      if (res.data && res.data.data) {
        console.log("Orders data:", res.data.data);
        setOrders(res.data.data);
      } else {
        setError("Unexpected response format from server");
      }
    } catch (err: any) {
      console.error("Failed to fetch orders:", err);
      if (err.response?.status === 404) {
        setError(
          "Orders endpoint not found. Please check your API configuration."
        );
      } else {
        setError(err.response?.data?.message || "Failed to fetch orders");
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchRevenue = async () => {
    try {
      // This will use the baseURL from axiosProtected configuration
      const res = await axiosProtected.get(`/v1/orders/revenue`);
      if (res.data && res.data.data !== undefined) {
        setRevenue(res.data.data);
      }
    } catch (err: any) {
      console.error("Failed to fetch revenue:", err);
    }
  };

  const handleStatusChange = async (orderId: string, status: string) => {
    try {
      // This will use the baseURL from axiosProtected configuration
      await axiosProtected.patch(`/v1/orders/${orderId}`, {
        status,
      });

      setOrders((prev) =>
        prev
          ? prev.map((order) =>
              order._id === orderId ? { ...order, status } : order
            )
          : []
      );
    } catch (err: any) {
      console.error("Failed to update order status:", err);
      alert(err.response?.data?.message || "Failed to update order status");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        <p className="ml-2">Loading order data...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center text-blue-700 mb-4">
        Orders Table
      </h2>

      <p className="text-lg font-semibold text-center mb-6">
        Total Revenue: ${revenue}
      </p>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {!loading && orders?.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No orders found.</p>
        </div>
      )}

      {orders && orders.length > 0 && (
        <Card>
          <CardContent>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">All Sales Data</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="px-4 py-2 border">#</th>
                      <th className="px-4 py-2 border">Car ID</th>
                      <th className="px-4 py-2 border">Customer Email</th>
                      <th className="px-4 py-2 border">Quantity</th>
                      <th className="px-4 py-2 border">Total Price ($)</th>
                      <th className="px-4 py-2 border">Sale Date</th>
                      <th className="px-4 py-2 border">Payment Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((sale, index) => (
                      <tr key={sale._id} className="hover:bg-gray-100">
                        <td className="px-4 py-2 border text-center">
                          {index + 1}
                        </td>
                        <td className="px-4 py-2 border">{sale.carId}</td>
                        <td className="px-4 py-2 border">{sale.email}</td>
                        <td className="px-4 py-2 border text-center">
                          {sale.quantity}
                        </td>
                        <td className="px-4 py-2 border text-right">
                          ${sale.totalprice}
                        </td>
                        <td className="px-4 py-2 border text-center">
                          {new Date(sale.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-2 border text-center">
                          {sale.paymentStatus || "N/A"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
