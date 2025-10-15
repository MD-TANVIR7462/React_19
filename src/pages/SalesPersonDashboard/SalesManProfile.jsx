import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pencil, Save, X } from "lucide-react";
import { motion } from "framer-motion";
const SalesManProfile = () => {
  const [profile, setProfile] = useState({
    name: "Joe Draft",
    email: "joe.draft@gmail.com",
    phone: "(555) 123-4567",
    address: "123 Main Street",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "United States",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);

  const handleChange = (field, value) => {
    setEditedProfile({ ...editedProfile, [field]: value });
  };

  const handleEdit = () => {
    setEditedProfile(profile);
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  return (
    <div className=" mx-auto lg:w-[70dvw] xl:w-full">
      <Card className="shadow-md border border-gray-200 bg-gradient-to-br from-white to-gray-50 rounded-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-4 border-b">
       {!isEditing &&<CardTitle className="sm:text-xl font-semibold text-gray-800">Profile Information</CardTitle>}   

          {!isEditing ? (
            <Button
              onClick={handleEdit}
              variant="outline"
              className="cursor-pointer hover:bg-gray-100 transition-colors"
            >
              <Pencil className="h-4 w-4 mr-2 text-gray-600" />
              <span className="hidden sm:block">Edit Profile</span>
            </Button>
          ) : (
            <div className="flex gap-2 w-full   justify-center">
              <Button onClick={handleCancel} variant="outline" className="cursor-pointer hover:bg-gray-100">
                <X className="h-4 w-4 mr-2 text-gray-600 hidden sm:block" />
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="cursor-pointer bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-sm"
              >
                <Save className="h-4 w-4 mr-2  hidden sm:block" />
                Save Changes
              </Button>
            </div>
          )}
        </CardHeader>

        <CardContent className="pt-6">
          {/* Profile Avatar Section */}
          <div className="flex flex-col items-center mb-8">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-green-400 via-emerald-500 to-green-600 blur-sm opacity-30"></div>
              <Avatar className="h-32 w-32 mb-4 relative border-4 border-white shadow-md">
                <AvatarImage src="/placeholder.svg?height=128&width=128" alt={profile.name} />
                <AvatarFallback className="text-2xl bg-emerald-100 text-emerald-700">
                  {profile.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </motion.div>

            <h2 className="text-2xl font-semibold text-gray-800 mt-2">{profile.name}</h2>
            <p className="text-sm text-gray-500">{profile.email}</p>
          </div>

          {/* Editable Fields */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={isEditing ? editedProfile.name : profile.name}
                onChange={(e) => handleChange("name", e.target.value)}
                disabled={!isEditing}
                className={`${
                  isEditing ? "border-green-400/30 focus-visible:ring-green-500" : "border-gray-200 bg-gray-50"
                }`}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={isEditing ? editedProfile.email : profile.email}
                onChange={(e) => handleChange("email", e.target.value)}
                disabled={!isEditing}
                className={`${
                  isEditing ? "border-green-400/30 focus-visible:ring-green-500" : "border-gray-200 bg-gray-50"
                }`}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={isEditing ? editedProfile.phone : profile.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                disabled={!isEditing}
                className={`${
                  isEditing ? "border-green-400/30 focus-visible:ring-green-500" : "border-gray-200 bg-gray-50"
                }`}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Street Address</Label>
              <Input
                id="address"
                value={isEditing ? editedProfile.address : profile.address}
                onChange={(e) => handleChange("address", e.target.value)}
                disabled={!isEditing}
                className={`${
                  isEditing ? "border-green-400/30 focus-visible:ring-green-500" : "border-gray-200 bg-gray-50"
                }`}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={isEditing ? editedProfile.city : profile.city}
                onChange={(e) => handleChange("city", e.target.value)}
                disabled={!isEditing}
                className={`${
                  isEditing ? "border-green-400/30 focus-visible:ring-green-500" : "border-gray-200 bg-gray-50"
                }`}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                value={isEditing ? editedProfile.state : profile.state}
                onChange={(e) => handleChange("state", e.target.value)}
                disabled={!isEditing}
                className={`${
                  isEditing ? "border-green-400/30 focus-visible:ring-green-500" : "border-gray-200 bg-gray-50"
                }`}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="zipCode">ZIP Code</Label>
              <Input
                id="zipCode"
                value={isEditing ? editedProfile.zipCode : profile.zipCode}
                onChange={(e) => handleChange("zipCode", e.target.value)}
                disabled={!isEditing}
                className={`${
                  isEditing ? "border-green-400/30 focus-visible:ring-green-500" : "border-gray-200 bg-gray-50"
                }`}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                value={isEditing ? editedProfile.country : profile.country}
                onChange={(e) => handleChange("country", e.target.value)}
                disabled={!isEditing}
                className={`${
                  isEditing ? "border-green-400/30 focus-visible:ring-green-500" : "border-gray-200 bg-gray-50"
                }`}
              />
            </div>
          </div>

          {!isEditing && (
            <div className="mt-8 text-center text-sm text-gray-400">
              Last updated: <span className="font-medium text-gray-500">2 days ago</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
export default SalesManProfile;
