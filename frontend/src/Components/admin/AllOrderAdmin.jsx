import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Sidebardashboard } from "./Sidebardashboard";
import { AllOrderAdmins, OrderDeleted } from "../../redux/slice/orderSlice";
import { FiEye, FiTrash } from "react-icons/fi";
import toast from "react-hot-toast";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";

const AllOrderAdmin = () => {
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.newOrder.getAllOrder?.orders);
    const status = useSelector((state) => state.newOrder.status);


    const [searchId, setSearchId] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        dispatch(AllOrderAdmins());

    }, [dispatch]);

    const filteredOrders = orders
        ?.filter((order) => (searchId ? order._id.includes(searchId) : true))
        ?.filter((order) => (statusFilter ? order.orderStatus === statusFilter : true));

    const totalPages = Math.ceil(filteredOrders?.length / itemsPerPage);
    const paginatedOrders = filteredOrders?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const clearFilters = () => {
        setSearchId("");
        setStatusFilter("");
        setCurrentPage(1);
    };

  const deleteorders=(id)=>{
    dispatch(OrderDeleted(id))
    .unwrap()
    .then(() => {
        toast.success("Order deleted successfully!");
        dispatch(AllOrderAdmins());
    })
    .catch((error) => {
        toast.error("Failed to delete order.");
        console.error(error);
    });
  }
  

  if (status === 'loading') {
    return <Loader />;
}

    
    return (
        <section className="">
            <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
                <Sidebardashboard />

                <div className="flex-1 px-4 lg:px-8">
                    <h2 className="text-lg text-center md:my-3 font-semibold text-black sm:text-xl md:text-2xl">All Orders</h2>

                    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        <input
                            type="text"
                            placeholder="Search by Order ID"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                            value={searchId}
                            onChange={(e) => setSearchId(e.target.value)}
                        />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                        >
                            <option value="">All Statuses</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            {/* <option value="Cancelled">Cancelled</option> */}
                        </select>
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
                                    <th className="px-4 py-2">Order ID</th>
                                    <th className="px-4 py-2">Status</th>
                                    <th className="px-4 py-2">Items</th>
                                    <th className="px-4 py-2">Amount</th>
                                    <th className="px-4 py-2">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-300">
                                {paginatedOrders?.length > 0 ? (
                                    paginatedOrders.map((order) => (
                                        <tr key={order._id} className="hover:bg-gray-50 text-black">
                                            <td className="px-4 py-2">{order._id}</td>
                                            <td
                                                className={`px-4 py-2 ${order.orderStatus === "Processing"
                                                    ? "text-yellow-500"
                                                    : order.orderStatus === "Delivered"
                                                        ? "text-green-500"
                                                        : "text-red-300"
                                                    }`}
                                            >
                                                {order.orderStatus}
                                            </td>

                                            <td className="px-4 py-2">{order.orderItems?.length}</td>
                                            <td className="px-4 py-2">${order.totalPrice?.toFixed(2)}</td>
                                            <td className="px-4 py-2 flex gap-2">
                                                <Link to={`/admin/process/${order._id}`}>
                                                    <button
                                                        // onClick={() => }
                                                        className="flex items-center justify-center rounded-lg border border-blue-500 px-3 py-2 text-sm font-medium text-blue-500 hover:bg-blue-500 hover:text-white"
                                                    >
                                                        <FaEdit />
                                                    </button>
                                                </Link>
                                                <button
                                                    onClick={() => {deleteorders(order._id) }}
                                                    className="flex items-center justify-center rounded-lg border border-red-500 px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-500 hover:text-white"
                                                >
                                                    <FiTrash className="" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="py-4 text-center text-gray-500">
                                            No orders found.
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

export default AllOrderAdmin;
