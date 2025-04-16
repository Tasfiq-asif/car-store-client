import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "react-hot-toast";
import { LoadingOverlay } from "@/components/ui/loading-overlay";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState, ChangeEvent } from "react";
import { axiosProtected } from "@/lib/axios";
import { User } from "@/types";

// Define user interface

export default function ManageUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axiosProtected.get("/v1/user");
      const data = Array.isArray(res.data) ? res.data : res.data.data || [];
      setUsers(data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
      toast.error("Failed to load users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      setLoading(true);
      const response = await axiosProtected.delete(`/v1/user/${id}`);

      if (response.data && response.status === 200) {
        toast.success("User deleted successfully");
        await fetchUsers(); // Refresh the list after delete
      } else {
        throw new Error("Unexpected response from server");
      }
    } catch (err: any) {
      console.error("Failed to delete user:", err);

      // Get the error message from the response if possible
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to delete user. Please try again.";

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = (user: User) => {
    setSelectedUser(user);
    setEditModalOpen(true);
  };

  const handleEditChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (selectedUser) {
      setSelectedUser((prev) => (prev ? { ...prev, [name]: value } : null));
    }
  };

  const submitUpdate = async () => {
    if (!selectedUser) return;
    setIsSubmitting(true);

    try {
      const response = await axiosProtected.put(
        `/v1/user/${selectedUser._id}`,
        selectedUser
      );

      if (response.data && response.status === 200) {
        toast.success("User updated successfully");
        setEditModalOpen(false);
        await fetchUsers(); // Refresh the list after update
      } else {
        throw new Error("Unexpected response from server");
      }
    } catch (err: any) {
      console.error("Failed to update user:", err);

      // Get the error message from the response if possible
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to update user. Please try again.";

      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 relative">
      <LoadingOverlay isLoading={loading} text="Loading users..." />

      <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">
        Manage Users
      </h2>
      <Card>
        <CardContent>
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">All Users</h2>
            <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 border">#</th>
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Email</th>
                  <th className="px-4 py-2 border">Role</th>
                  <th className="px-4 py-2 border">Status</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users?.map((user, index) => (
                  <tr key={user._id} className="hover:bg-gray-100">
                    <td className="px-4 py-2 border text-center">
                      {index + 1}
                    </td>
                    <td className="px-4 py-2 border">{user.name}</td>
                    <td className="px-4 py-2 border">{user.email}</td>
                    <td className="px-4 py-2 border text-center">
                      {user.role}
                    </td>
                    <td className="px-4 py-2 border text-center">
                      <span
                        className={
                          user.userStatus === "active"
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      >
                        {user.userStatus}
                      </span>
                    </td>
                    <td className="border px-4 py-2 space-x-2">
                      <Button
                        onClick={() => handleUpdate(user)}
                        variant="outline"
                        className="text-blue-600"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDelete(user._id)}
                        variant="destructive"
                      >
                        Delete
                      </Button>
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
            <DialogTitle>Edit User Details</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div>
                <Label>Name</Label>
                <Input
                  name="name"
                  value={selectedUser.name}
                  onChange={handleEditChange}
                />
              </div>
              <div>
                <Label>Role</Label>
                <Select
                  value={selectedUser.role}
                  onValueChange={(value: "user" | "admin") =>
                    setSelectedUser((prev) =>
                      prev ? { ...prev, role: value } : null
                    )
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Status</Label>
                <Select
                  value={selectedUser.userStatus}
                  onValueChange={(value: "active" | "inactive") =>
                    setSelectedUser((prev) =>
                      prev
                        ? {
                            ...prev,
                            userStatus: value,
                          }
                        : null
                    )
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="pt-4 text-right">
                <Button onClick={submitUpdate} disabled={isSubmitting}>
                  {isSubmitting ? "Updating..." : "Update User"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* For the edit modal - show a loading overlay when submitting */}
      {isSubmitting && (
        <LoadingOverlay isLoading={true} text="Updating user..." />
      )}
    </div>
  );
}
