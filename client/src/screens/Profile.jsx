import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import api from "../config/axios";
import { setAuthUser } from "../../redux/slices/authSlice";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, token } = useSelector((state) => state.auth); 
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user); 
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };
  useEffect(()=>{

  }, [user]);

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await api.put(
        `/users/profile/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Profile updated successfully!");
        dispatch(setAuthUser(response.data.user));
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("An error occurred while updating your profile.");
    } finally {
      setLoading(false);
    }
  };
  if(!user) navigate("/");

  return (
    <>
    <Navbar/>
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Profile</h1>

      {isEditing ? (
        <form className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-lg font-medium text-gray-700">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-lg font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700">Phone 1</label>
              <input
                type="text"
                name="phone1"
                value={formData.phone1}
                onChange={handleInputChange}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-lg font-medium text-gray-700">Phone 2</label>
              <input
                type="text"
                name="phone2"
                value={formData.phone2}
                onChange={handleInputChange}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-lg font-medium text-gray-700">Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700">Website</label>
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex space-x-4 mt-6">
            <button
              type="button"
              onClick={handleSave}
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              onClick={handleEditToggle}
              className="bg-gray-300 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-400 transition duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          <p className="text-lg text-gray-700">
            <strong>First Name:</strong> {user.firstName}
          </p>
          <p className="text-lg text-gray-700">
            <strong>Last Name:</strong> {user.lastName}
          </p>
          <p className="text-lg text-gray-700">
            <strong>Email:</strong> {user.email}
          </p>
          <p className="text-lg text-gray-700">
            <strong>Phone 1:</strong> {user.phone1}
          </p>
          <p className="text-lg text-gray-700">
            <strong>Phone 2:</strong> {user.phone2}
          </p>
          <p className="text-lg text-gray-700">
            <strong>City:</strong> {user.city}
          </p>
          <p className="text-lg text-gray-700">
            <strong>Country:</strong> {user.country}
          </p>
          <p className="text-lg text-gray-700">
            <strong>Website:</strong> {user.website}
          </p>
          <button
            onClick={handleEditToggle}
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300 mt-6"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
    </>
  );
};

export default Profile;
