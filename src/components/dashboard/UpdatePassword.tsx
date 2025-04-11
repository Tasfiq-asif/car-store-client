
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { useState } from "react";

export default function UpdatePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUpdate = () => {
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match");
      return;
    }
    console.log(confirmPassword, currentPassword, newPassword);
    // Call password update logic here
    alert("Password updated successfully!");
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-200 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-md shadow-2xl rounded-2xl p-6 bg-white">
        <CardContent>
          <h2 className="text-2xl font-bold text-center mb-6 text-purple-700">Update Password</h2>

          <div className="mb-4">
            <Label htmlFor="current">Current Password</Label>
            <Input
              id="current"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password"
              className="mt-1"
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="new">New Password</Label>
            <Input
              id="new"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="mt-1"
            />
          </div>

          <div className="mb-6">
            <Label htmlFor="confirm">Confirm New Password</Label>
            <Input
              id="confirm"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="mt-1"
            />
          </div>

          <Button
            onClick={handleUpdate}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-xl"
          >
            Update Password
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
