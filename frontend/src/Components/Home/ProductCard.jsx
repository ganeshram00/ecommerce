// ProductList.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../redux/slice/productSlicer';
import ReactStars from "react-rating-stars-component";
import Loader from '../Loader/Loader';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';


const ProductCard = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.items.data);
    const status = useSelector((state) => state.products.status);
    const error = useSelector((state) => state.products.error);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProducts());
        }
    }, [status, dispatch]);

    

    if (status === 'loading') {
        return <Loader />;
    }

    if (status === 'failed') {
        toast.error(error || "Internal Server error")
        // console.log(error);
        
        return <p>{error}</p>
    }

    if (!products || products.length === 0) {
        return <p>No products found.</p>;
    }

    return (
        <div className="w-[80%] py-5 text-[rgb(48,48,48)] m-auto grid md:gap-5 gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
            {
                products.map((product) => {
                    // Extract the rating value from the product object
                    const ratingValue = product.ratings || 0; // Assuming 'rating' is the key in your API response

                    // Define options with the rating value
                    const options = {
                        edit: false,
                        color: "rgba(20,20,20,0.1)",
                        activeColor: "tomato",
                        size: window.innerWidth < 600 ? 20 : 25,
                        value: ratingValue, // Set the rating value here
                        isHalf: true,
                    };

                    return (
                        <Link
                            to={`/product/${product._id}`}
                            key={product._id}
                            className="pb-4 cursor-pointer hover:scale-95 duration-500 hover:shadow-lg shadow-md border  rounded-lg overflow-hidden bg-white transition-all"
                        >
                            <div className='w-full min-h-[250px] flex justify-center text-center'>
                                <img src={product.images&&product.images[0]?.url} alt={product.name} className="min-w-[200px] h-[200px] p-2  " />

                            </div>
                            <div className="p-4 flex justify-center flex-col items-center">
                                <p className="font-semibold text-lg mb-2"> {product.name.length > 75 ? `${product.name.slice(0, 75)}...` : product.name}</p>
                                <div className="flex items-center justify-center mb-2 flex-wrap">
                                    <ReactStars {...options} />
                                    <span className="text-sm text-gray-500 ml-2">({product.reviews.length === 0 ? 0 : product.reviews.length} Review)</span>
                                </div>
                                <span className="text-lg font-bold text-[tomato]">₹{product.price}</span>
                            </div>
                        </Link>
                    );
                })
            }
        </div>
    );
};

export default ProductCard;
