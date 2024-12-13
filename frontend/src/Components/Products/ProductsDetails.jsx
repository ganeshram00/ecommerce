import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createReviews, getSingleProducts } from '../../redux/slice/productSlicer';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import toast from 'react-hot-toast';
import ReactStars from "react-rating-stars-component";
import ReviewCard from './ReviewCard';
import { addtocart } from '../../redux/slice/cartSlice';

const ProductsDetails = () => {
    const [mainImage, setMainImage] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [showReviewPopup, setShowReviewPopup] = useState(false); // State for review popup


    const options = {
        edit: false, // For displaying product rating (read-only)
        color: "rgba(20,20,20,0.1)", // Empty star color
        activeColor: "tomato", // Filled star color
        size: window.innerWidth < 600 ? 20 : 25, // Dynamic size based on screen width
        isHalf: true, // Allow half-star rating
    };

    const dispatch = useDispatch();
    const { id } = useParams();
    const products = useSelector((state) => state.products.selectedProduct.data);
    const status = useSelector((state) => state.products.status);
    const error = useSelector((state) => state.products.error);
    const { isAuthenticated } = useSelector((state) => state.user);
    const navigate = useNavigate()

    const [review, setReview] = useState({ rating: 0, comment: '', productId: id }); // State for review data (rating and comment)
    // console.log(review);


    useEffect(() => {
        dispatch(getSingleProducts(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (products && products.images.length > 0) {
            setMainImage(products.images[0].url);
        }
    }, [products]);

    const increment = () => {
        if (products.stock <= quantity) return;
        setQuantity(quantity + 1);
    };

    const decrement = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    if (status === 'loading') return <Loader />;
    if (status === 'failed') {
        toast.error(error || 'Failed to load product details.');
        return <p>Failed to load product details.</p>;
    }
    if (!products) return <p>No product details found.</p>;

    const handleAddToCart = () => {
        dispatch(addtocart({ products, quantity }));
    };

    // Handle rating change in the review popup
    const handleRatingChange = (newRating) => {
        setReview((prevReview) => ({
            ...prevReview,
            rating: newRating
        }));
    };

    // Handle comment change in the review popup
    const handleCommentChange = (e) => {
        setReview((prevReview) => ({
            ...prevReview,
            comment: e.target.value
        }));
    };

    // Handle review submission
    const handleSubmitReview = () => {
        if (review.rating === 0 || review.comment.trim() === '') {
            toast.error('Please provide a rating and comment.');
            return;
        }
        if (!isAuthenticated) {
            setShowReviewPopup(false);
            navigate('/Register')
            return;
        }

        dispatch(createReviews(review))  // Dispatch the action to post the review
            .then(() => {
                // After review is successfully submitted, fetch the updated product details
                dispatch(getSingleProducts(id));
                // Close the popup
                setShowReviewPopup(false);
                toast.success("Review Submitted Successfully");
            })
            .catch(error => {
                toast.error(error.message || "Failed to submit review");
            });



    };

    return (
        <div className="bg-gray-50 min-h-screen py-10">
            <div className="container mx-auto md:px-6 lg:px-8 md:py-8 bg-white rounded-lg border-gray-800">
                <div className="flex flex-wrap mx-4">
                    <div className="w-full lg:w-1/2 px-4 mb-8 flex lg:sticky top-0">
                        <div className="flex flex-col w-[20%] m-1 gap-4 sm:px-4 overflow-y-auto snap-y max-h-[calc(100vh-60vh)] sm:max-h-[calc(100vh-50vh)] md:max-h-[calc(100vh-50vh)]">
                            {products.images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image.url}
                                    alt={`Thumbnail ${index + 1}`}
                                    className="w-full p-1 h-auto border snap-center object-cover rounded-md cursor-pointer opacity-70 hover:opacity-100 transition duration-300"
                                    onClick={() => setMainImage(image.url)}
                                />
                            ))}
                        </div>

                        <div className='w-[80%]'>
                            <img
                                src={mainImage}
                                alt="Product"
                                className="w-[100%] h-auto rounded-lg mb-4"
                                id="mainImage"
                            />
                        </div>
                    </div>

                    <div className="w-full lg:w-1/2 px-4 md:overflow-y-auto md:h-screen hide-scrollbar">
                        <h2 className="md:text-4xl text-3xl font-semibold mb-2 font-[rotobo] text-gray-800 capitalize">{products.name}</h2>
                        <p className="text-gray-500 mb-2 font-[cursive] text-sm">Product #{products._id}</p>
                        <div className="mb-4 flex items-center">
                            <span className="text-2xl font-bold text-[tomato] mr-2">${products.price}</span>
                        </div>
                        <div className="flex items-center mb-4">
                            <ReactStars {...{ ...options, value: products.ratings }} />
                            <span className="ml-2 text-gray-700">( {products.numOfReviews} Reviews )</span>
                        </div>

                        <div className="my-6">
                            <label htmlFor="quantity" className="block text-sm my-4 font-semibold text-[18px] text-gray-600">Quantity:</label>
                            <div className="flex items-center">
                                <button onClick={decrement} className="px-3 py-1 border rounded-md">-</button>
                                <input readOnly value={quantity} className="w-12 text-center mx-2" />
                                <button onClick={increment} className="px-3 py-1 border rounded-md">+</button>
                            </div>
                        </div>

                        <button
                            disabled={products.stock < 1 ? true : false}
                            onClick={handleAddToCart}
                            className="bg-[#e85c43fa] text-white px-6 py-3 rounded-md hover:bg-[#fc6044] transition w-full mb-6">
                            Add to Cart
                        </button>

                        <p className="text-gray-600 mb-4">
                            <span className='font-semibold text-[18px]'>Status </span>:{" "}
                            <b className={products.stock < 1 ? "text-red-500" : "text-green-500"}>
                                {products.stock < 1 ? "Out of Stock" : "In Stock"}
                            </b>
                        </p>
                        <p className="text-gray-700 mb-6 leading-relaxed">
                            <span className='font-semibold font-sans text-[19px]'>Description:</span> {products.description}
                        </p>
                        <button
                            onClick={() => setShowReviewPopup(true)} // Open the review popup
                            className="bg-[#e85c43fa] hover:scale-110 px-4 py-2 rounded-md text-white duration-700 transition">
                            Submit Review
                        </button>
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <div className='w-full my-5'>
                <h3 className='text-center w-full text-[22px] my-3'>Reviews</h3>
                <hr className='w-[200px] m-auto border-2' />
                {products.reviews && products.reviews[0] ? (
                    <div className="w-full overflow-x-auto flex justify-center">
                        <div className="w-max flex justify-center m-2 items-center gap-7">
                            {products.reviews.map((d, i) => (
                                <ReviewCard key={i} reviews={d} />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className='flex justify-center items-center w-full min-h-52'>
                        <p className="text-[22px] text-gray-600 font-sans">No reviews available</p>
                    </div>
                )}
            </div>

            {/* Review Popup Modal */}
            {showReviewPopup && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-md w-[75%] sm:w-[35%]">
                        <h3 className="text-xl font-semibold mb-4">Submit Your Review</h3>
                        <ReactStars
                            {...{ ...options, edit: true, value: review.rating, onChange: handleRatingChange }}
                        />
                        <textarea
                            className="w-full p-2 mt-4 border rounded-md"
                            placeholder="Write your comment here"
                            value={review.comment}
                            onChange={handleCommentChange}
                        />
                        <div className="flex justify-between items-center mt-4">
                            <button
                                onClick={handleSubmitReview}
                                className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition">
                                Submit
                            </button>
                            <button
                                onClick={() => setShowReviewPopup(false)}
                                className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400 transition">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductsDetails;
