import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch, FaFilter } from "react-icons/fa";
import { url } from '../../App';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${url}/api/user/admin`);
      setUsers(response.data);
      setFilteredUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    applyFilters(e.target.value, filter);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    applyFilters(search, e.target.value);
  };

  const applyFilters = (searchQuery, filterType) => {
    let filtered = users.filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filterType === "premium") {
      filtered = filtered.filter((user) => user.isPremium);
    } else if (filterType === "non-premium") {
      filtered = filtered.filter((user) => !user.isPremium);
    }

    setFilteredUsers(filtered);
  };

  return (
    <div className="p-3 pt-12 max-w-6xl mx-auto text-white rounded-lg shadow-md ">
      <h2 className="text-2xl font-bold mb-6 ">All Users</h2>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
        <div className="relative w-full sm:w-auto">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name..."
            className="pl-10 pr-4 py-2 border rounded-md text-black w-full sm:w-64"
            value={search}
            onChange={handleSearch}
          />
        </div>

        <div className="relative w-full sm:w-auto">
          <FaFilter className="absolute left-3 top-3 text-gray-400" />
          <select
            className="pl-10 pr-4 py-2 border rounded-md text-black w-full sm:w-48"
            value={filter}
            onChange={handleFilterChange}
          >
            <option value="all">All Users</option>
            <option value="premium">Premium Users</option>
            <option value="non-premium">Free Users</option>
          </select>
        </div>
      </div>

      {/* User Count */}
      <div className="flex flex-col sm:flex-row justify-between mb-6 gap-2">
        <span className="bg-blue-600 px-4 py-2 rounded-md text-center sm:text-left font-semibold">
          Total Users: {users.length}
        </span>
        <span className="bg-green-600 px-4 py-2 rounded-md text-center sm:text-left font-semibold">
          Premium Users: {users.filter((user) => user.isPremium).length}
        </span>
      </div>

      {/* Users Table */}
      <div className="hidden md:block">
        {/* User List Header */}
        <div className="grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[1fr_1fr_1fr] items-center gap-3 p-3 border border-gray-600 text-sm bg-white text-black rounded-md my-2">
          <b>User Name</b>
          <b>Email</b>
          <b>Plan</b>
        </div>

        {/* User List */}
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user, index) => (
            <div
              key={index}
              className="grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[1fr_1fr_1fr] items-center gap-3 p-3 border border-gray-600 text-sm bg-gray-800 text-white rounded-md my-2"
            >
              {/* User Name */}
              <p className="font-medium">{user.name}</p>

              {/* Email */}
              <p className="truncate hover:whitespace-normal hover:bg-gray-700 px-2 py-1 rounded-md cursor-pointer">
                {user.email}
              </p>

              {/* Plan */}
              <span
                className={`px-3 py-4 rounded-md text-center text-white font-semibold ${user.isPremium ? "bg-green-500" : "bg-red-500"
                  }`}
              >
                {user.isPremium ? "Tuneify Premium" : "Tuneify Free"}
              </span>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center mt-6">No users found.</p>
        )}

      </div>

      {/* Responsive Card Layout for Mobile */}
      <div className="md:hidden">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div key={user.email} className="bg-gray-800 p-4 mb-3 rounded-lg shadow">
              <h3 className="text-lg font-bold"><span className="font-normal">UserName</span> {user.name}</h3>
              <p className="text-gray-300 truncate hover:whitespace-normal hover:bg-gray-700 px-2 py-1 rounded-md cursor-pointer">
                {user.email}
              </p> Plan <br />
              <span
                className={`px-3 py-1 mt-2 inline-block rounded-md text-white font-semibold ${user.isPremium ? "bg-green-500" : "bg-red-500"
                  }`}
              >
                {user.isPremium ? "Premium" : "Free"}
              </span>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">No users found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
