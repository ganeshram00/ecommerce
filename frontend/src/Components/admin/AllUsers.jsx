import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteUser, GetAllUser } from "../../redux/slice/userSlicer";
import { Sidebardashboard } from "./Sidebardashboard";
import toast from "react-hot-toast";
import { FiTrash } from "react-icons/fi";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";

const AllUsers = () => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.user?.allUser?.users);
    const deletusermsg = useSelector((state) => state.user.deleteUser);
    const status = useSelector((state) => state.user.status);

    const navigate = useNavigate()

    const [searchId, setSearchId] = useState("");
    const [roleFilter, setRoleFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        dispatch(GetAllUser());
    }, [dispatch]);

    // Apply filters
    const filteredUsers = users
        ?.filter((user) => (searchId ? user._id.includes(searchId) : true)) // Search by ID
        ?.filter((user) => (roleFilter ? user.role === roleFilter : true)); // Filter by Role

    const totalPages = Math.ceil(filteredUsers?.length / itemsPerPage);
    const paginatedUsers = filteredUsers?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const clearFilters = () => {
        setSearchId("");
        setRoleFilter("");
        setCurrentPage(1);
    };

    if (status === 'loading') {
        return <Loader />;
    }



    return (
        <section className="">
            <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
                <Sidebardashboard />

                <div className="flex-1 px-4 lg:px-8  py-8 md:py-16">
                    <h2 className="text-lg text-center md:my-3 font-semibold text-black sm:text-xl md:text-2xl">All Users</h2>

                    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {/* Search by User ID */}
                        <input
                            type="text"
                            placeholder="Search by User ID"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                            value={searchId}
                            onChange={(e) => setSearchId(e.target.value)}
                        />

                        {/* Filter by Role */}
                        <select
                            value={roleFilter}
                            onChange={(e) => setRoleFilter(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                        >
                            <option value="">All Roles</option>
                            <option value="admin">admin</option>
                            <option value="user">user</option>
                        </select>

                        {/* Clear Filters */}
                        <button
                            onClick={clearFilters}
                            className="w-full lg:w-auto rounded-lg border border-red-500 px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-500 hover:text-white"
                        >
                            Clear Filters
                        </button>
                    </div>

                    <div className="mt-6 overflow-x-auto">
                        <table className="min-w-full table-auto text-left text-sm">
                            <thead className="border-b bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2">User ID</th>
                                    <th className="px-4 py-2">Name</th>
                                    <th className="px-4 py-2">Email</th>
                                    <th className="px-4 py-2">Role</th>
                                    <th className="px-4 py-2">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-300">
                                {paginatedUsers?.length > 0 ? (
                                    paginatedUsers.map((user) => (
                                        <tr key={user._id} className="hover:bg-gray-50 text-black">
                                            <td className="px-4 py-2">{user._id}</td>
                                            <td className="px-4 py-2">{user.name}</td>
                                            <td className="px-4 py-2">{user.email}</td>
                                            <td className="px-4 py-2">{user.role}</td>
                                            <td className="px-4 py-2 flex gap-2">
                                                {/* Edit Button */}
                                                <button
                                                    onClick={() => {
                                                        navigate(`/admin/updateRole/${user._id}`)
                                                    }}
                                                    className="flex items-center justify-center rounded-lg border border-blue-500 px-3 py-2 text-sm font-medium text-blue-500 hover:bg-blue-500 hover:text-white"
                                                >
                                                    <FaEdit />
                                                </button>

                                                {/* Delete Button */}
                                                <button
                                                   onClick={() => {
                                                    dispatch(DeleteUser(user._id))
                                                        .then(() => {
                                                            toast.success("User deleted successfully...");
                                                            dispatch(GetAllUser());
                                                        })
                                                        .catch((error) => {
                                                            toast.error("Failed to delete user: " + error.message);
                                                        });
                                                }}
                                                
                                                    className="flex items-center justify-center rounded-lg border border-red-500 px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-500 hover:text-white"
                                                >
                                                    <FiTrash />
                                                </button>
                                            </td>

                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="py-4 text-center text-gray-500">
                                            No users found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-6 flex flex-wrap justify-center gap-2">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentPage(index + 1)}
                                className={`rounded-lg px-4 py-2 text-sm ${currentPage === index + 1
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200 text-gray-800"
                                    }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AllUsers;
