import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllReviews, deleteReview } from "../../redux/slice/productSlicer";
import toast from "react-hot-toast";
import { Sidebardashboard } from "./Sidebardashboard";
import Loader from "../Loader/Loader";

const AllReviews = () => {
    const [id, setId] = useState(""); // Product ID
    const dispatch = useDispatch();
    const reviews = useSelector((state) => state.products.allReviewProduct?.reviews);
    const status = useSelector((state) => state.products.status); // Loading state
    const error = useSelector((state) => state.products.error); // Error state
    // console.log(reviews);

    useEffect(() => {
        if (id.length === 24) {
            dispatch(getAllReviews(id))
                .unwrap()
                .then(() => toast.success("Reviews fetched successfully!"))
                .catch(() => toast.error("Failed to fetch reviews."));
        }
    }, [dispatch, id]);

    const handleDelete = (reviewId) => {
        dispatch(deleteReview({ productId: id, reviewId }))
            .unwrap()
            .then(() => dispatch(getAllReviews(id)), toast.success("Review deleted successfully!"))
            .catch(() => toast.error("Failed to delete review."));
    };


    if (status === 'loading') {
        return <Loader />;
    }




    return (
        <section className="">
            <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
                <Sidebardashboard />

                <div className="flex-1 px-4 lg:px-8 py-8 md:py-16">
                    <h2 className="text-lg font-semibold text-black sm:text-xl text-center md:text-2xl">
                        Product Reviews
                    </h2>

                    <div className="mt-4 w-full flex justify-center">
                        <input
                            type="text"
                            placeholder="Enter Product ID"
                            className="w-1/2 sm:w-1/3 my-auto rounded-lg border border-gray-300 px-3 py-2 text-sm"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                        />
                    </div>


                    <div className="mt-6 overflow-x-auto">
                        {reviews?.length > 0 ? (
                            <table className="min-w-full  table-auto text-left text-sm">
                                <thead className="border-b bg-gray-100">
                                    <tr>
                                        <th className="px-4 py-2">Review ID</th>
                                        <th className="px-4 py-2">Name</th>
                                        <th className="px-4 py-2">Rating</th>
                                        <th className="px-4 py-2">Comment</th>
                                        {/* <th className="px-4 py-2">Date</th> */}
                                        <th className="px-4 py-2">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-300">
                                    {reviews.map((rev) => (
                                        <tr key={rev._id} className="hover:bg-gray-50">
                                            <td className="px-4 py-2">{rev._id}</td>
                                            <td className="px-4 py-2">{rev?.name}</td>
                                            <td className="px-4 py-2">{rev.rating}</td>
                                            <td className="px-4 py-2">{rev.comment}</td>
                                            {/* <td className="px-4 py-2">
                                                {rev.createdAt}
                                                {new Date(rev.createdAt).toLocaleDateString()}
                                            </td> */}
                                            <td className="px-4 py-2">
                                                <button
                                                    className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                                                    onClick={() => handleDelete(rev._id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className="text-center text-gray-500">No reviews found.</p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AllReviews;
