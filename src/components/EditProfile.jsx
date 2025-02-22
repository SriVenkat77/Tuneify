import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import { toast } from "react-toastify";
import { FaEnvelope, FaUser } from "react-icons/fa";

const EditProfile = () => {
  const [user, setUser] = useState({ name: "", email: "" });
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("https://tuneify-pbc9.onrender.com/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser({ name: res.data.name, email: res.data.email });
        setFormData({ name: res.data.name, email: res.data.email, password: "" });
      } catch (err) {
        toast.error("Failed to fetch user details");
      }
    };
    fetchUser();

    // Scroll to the edited section when page loads with hash
    if (window.location.hash) {
      const element = document.querySelector(window.location.hash);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put("https://tuneify-pbc9.onrender.com/api/user/profile", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser({ name: formData.name, email: formData.email });
      setEditMode(false);
      toast.success("Profile updated !");

      // Redirect to profile with a hash to scroll to the updated section
      navigate("/profile");
    } catch (err) {
      toast.error("Error updating profile");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 shadow-2xl rounded-xl p-6 border-2 border-black bg-gray-900 text-white pb-24 overflow-hidden">
         
      
      <h2 className="text-3xl font-bold text-center mb-4">Profile Data</h2>
      <p className="text-gray-400 text-sm text-center mb-4">
        Here, you can view and update your profile details. Click "Edit Profile" to make changes.
      </p>

      <div id="edit-section" className="text-center p-4 bg-black border border-white rounded-lg">
        {/* Username Section */}
        <p className="flex items-center gap-2 text-gray-300 text-lg font-semibold">
          <FaUser className="text-yellow-400" /> Username
        </p>
        <p className="text-md sm:text-xl font-semibold text-gray-400">
          <span className="font-normal overflow-hidden truncate w-48 inline-block hover:overflow-visible">
            {user.name}
          </span>
        </p>

        {/* Email Section */}
        <p className="flex items-center gap-2 text-gray-300 text-lg font-semibold mt-4">
          <FaEnvelope className="text-blue-400" /> Email
        </p>
        <p className="text-sm sm:text-lg text-gray-400">
          <span className="font-normal overflow-hidden truncate w-48 inline-block hover:overflow-visible">
            {user.email}
          </span>
        </p>

        <button
          onClick={() => setEditMode(!editMode)}
          className="mt-4 bg-yellow-500 text-white px-5 py-2 rounded-lg hover:bg-yellow-400 transition-all"
        >
          {editMode ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      {editMode && (
        <form onSubmit={handleSubmit} className="mt-6 p-4 rounded-lg shadow-inner">
          <div className="space-y-4">
            <label className="font-semibold text-gray-400">Username:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              required
              className="w-full p-3 border bg-gray-800 border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-400 truncate hover:overflow-visible"
            />

            <label className="font-semibold text-gray-400">Password:</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="New Password"
              className="w-full p-3 border bg-gray-800 border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-400"
            />

            <button
              type="submit"
              className="w-full bg-yellow-500 text-white px-5 py-2 rounded-lg hover:bg-yellow-400 transition-all"
            >
              Save Changes
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditProfile;
