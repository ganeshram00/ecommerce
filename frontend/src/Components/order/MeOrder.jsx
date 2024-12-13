import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { myOrder } from '../../redux/slice/orderSlice';
import { FaEye } from 'react-icons/fa'; // Import the eye icon from react-icons
import { Link } from 'react-router-dom';

const MeOrder = () => {
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.newOrder.userOrder);

    const [filterStatus, setFilterStatus] = useState('');
    const [search, setSearch] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        dispatch(myOrder());
    }, [dispatch]);

    const filteredOrders = orders
        ?.filter((order) => (filterStatus ? order.orderStatus === filterStatus : true))
        ?.filter((order) => (search ? order._id.includes(search) : true))
        ?.filter((order) => (minPrice ? order.totalPrice >= parseFloat(minPrice) : true))
        ?.filter((order) => (maxPrice ? order.totalPrice <= parseFloat(maxPrice) : true));

    const totalPages = Math.ceil(filteredOrders?.length / itemsPerPage);
    const paginatedOrders = filteredOrders?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const clearFilters = () => {
        setFilterStatus('');
        setSearch('');
        setMinPrice('');
        setMaxPrice('');
        setCurrentPage(1);
    };

    return (
        <section className="bg-white py-8 antialiased md:py-16">
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                <div className="mx-auto max-w-5xl">
                    <h2 className="text-xl font-semibold text-black sm:text-2xl">My Orders</h2>

                    {/* Filters */}
                    <div className="mt-6 flex flex-wrap gap-4">
                        <select
                            className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                        >
                            <option value="">All Status</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                        </select>
                        <input
                            type="text"
                            placeholder="Search by Order ID"
                            className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Min Price"
                            className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Max Price"
                            className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                        />
                        <button
                            onClick={clearFilters}
                            className="rounded-lg border border-red-500 px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-500 hover:text-white"
                        >
                            Clear Filters
                        </button>
                    </div>

                    {/* Orders Table */}
                    <div className="mt-6 overflow-x-auto">
                        <table className="min-w-full table-auto text-left">
                            <thead className="border-b bg-white">
                                <tr>
                                    <th className="px-4 py-2">Order ID</th>
                                    <th className="px-4 py-2">Date</th>
                                    <th className="px-4 py-2">Status</th>
                                    <th className="px-4 py-2">Total Price</th>
                                    <th className="px-4 py-2">Items</th>
                                    <th className="px-4 py-2">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-300">
                                {paginatedOrders?.length > 0 ? (
                                    paginatedOrders.map((order) => (
                                        <tr key={order._id} className="hover:bg-gray-50 text-black">
                                            <td className="px-4 py-2">{order._id}</td>
                                            <td className="px-4 py-2 min-w-[200px]">{new Date(order.createAt).toLocaleString()}</td>
                                            <td className="px-4 py-2">
                                                <span
                                                    className={`font-semibold ${order.orderStatus === 'Delivered' ? 'text-green-700' : order.orderStatus === 'Processing' ? 'text-red-200' : 'text-yellow-400'}`}
                                                >
                                                    {order.orderStatus}
                                                </span>
                                            </td>
                                            <td className="px-4 py-2">${order.totalPrice.toFixed(2)}</td>
                                            <td className="px-4 py-2">{order.orderItems.length}</td>
                                            <td className="px-4 py-2">
                                                <button className="rounded-lg border border-blue-500 px-3 py-2 text-center text-sm font-medium text-blue-500 hover:bg-blue-700 hover:text-white">
                                                 <Link to={`/orders/${order._id}`}><FaEye className="text-lg" /></Link>   
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center text-gray-500 py-4">
                                            No orders found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="mt-6 flex justify-center gap-2">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentPage(index + 1)}
                                className={`rounded-lg px-4 py-2 text-sm ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
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

export default MeOrder;
