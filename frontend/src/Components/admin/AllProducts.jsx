import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { adminProducts, deleteProducts } from "../../redux/slice/productSlicer";
import { Sidebardashboard } from "./Sidebardashboard";
import toast from "react-hot-toast";
import Loader from "../Loader/Loader";

const AllProducts = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.adminProducts?.data);
    const status = useSelector((state) => state.products.status);

    const [searchId, setSearchId] = useState("");
    const [searchName, setSearchName] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [minStock, setMinStock] = useState("");
    const [maxStock, setMaxStock] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        dispatch(adminProducts());
    }, [dispatch]);

    const filteredProducts = products
        ?.filter((product) => (searchId ? product._id.includes(searchId) : true))
        ?.filter((product) => (searchName ? product.name.toLowerCase().includes(searchName.toLowerCase()) : true))
        ?.filter((product) => (minPrice ? product.price >= parseFloat(minPrice) : true))
        ?.filter((product) => (maxPrice ? product.price <= parseFloat(maxPrice) : true))
        ?.filter((product) => (minStock ? product.stock >= parseInt(minStock) : true))
        ?.filter((product) => (maxStock ? product.stock <= parseInt(maxStock) : true));

    const totalPages = Math.ceil(filteredProducts?.length / itemsPerPage);
    const paginatedProducts = filteredProducts?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const clearFilters = () => {
        setSearchId("");
        setSearchName("");
        setMinPrice("");
        setMaxPrice("");
        setMinStock("");
        setMaxStock("");
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
                    <h2 className="text-lg font-semibold text-black sm:text-xl md:text-2xl text-center">All Products</h2>

                    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        <input
                            type="text"
                            placeholder="Search by Product ID"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                            value={searchId}
                            onChange={(e) => setSearchId(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Search by Product Name"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                            value={searchName}
                            onChange={(e) => setSearchName(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Min Price"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Max Price"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Min Stock"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                            value={minStock}
                            onChange={(e) => setMinStock(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Max Stock"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                            value={maxStock}
                            onChange={(e) => setMaxStock(e.target.value)}
                        />
                        <button
                            onClick={clearFilters}
                            className="w-full lg:w-auto rounded-lg border border-red-500 px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-500 hover:text-white"
                        >
                            Clear Filters
                        </button>
                    </div>

                    <div className="mt-6 overflow-x-auto">
                        <table className=" table-auto text-left text-sm">
                            <thead className="border-b bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2">ID</th>
                                    <th className="px-4 py-2">Name</th>
                                    <th className="px-4 py-2">Stock</th>
                                    <th className="px-4 py-2">Price</th>
                                    <th className="px-4 py-2">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-300">
                                {paginatedProducts?.length > 0 ? (
                                    paginatedProducts.map((product) => (
                                        <tr key={product._id} className="hover:bg-gray-50 text-black">
                                            <td className="px-4 py-2">{product._id}</td>
                                            <td className="px-4 py-2  min-w-[300px]">{product.name}</td>
                                            <td className="px-4 py-2">{product.stock}</td>
                                            <td className="px-4 py-2">${product.price.toFixed(2)}</td>
                                            <td className="px-4 py-2 flex gap-2">
                                                <Link
                                                    to={`/admin/products/edit/${product._id}`}
                                                    className="flex items-center gap-1 rounded-lg border border-green-500 px-3 py-2 text-sm font-medium text-green-500 hover:bg-green-700 hover:text-white"
                                                >
                                                    <FaEdit /> Edit
                                                </Link>
                                                <button
                                                    onClick={() => {
                                                        dispatch(deleteProducts(product._id))
                                                            .unwrap()
                                                            .then(() => {
                                                                toast.success("Product deleted successfully!");
                                                                dispatch(adminProducts());
                                                            })
                                                            .catch((error) => {
                                                                toast.error("Failed to delete product.");
                                                                console.error(error);
                                                            });
                                                    }}
                                                    className="flex items-center gap-1 rounded-lg border border-red-500 px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-700 hover:text-white"
                                                >
                                                    <FaTrashAlt /> Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="py-4 text-center text-gray-500">
                                            No products found.
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

export default AllProducts;
