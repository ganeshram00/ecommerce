import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, reset } from '../../redux/slice/productSlicer';
import Loader from '../Loader/Loader';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import ProductCard from '../Home/ProductCard';
import { FaStar } from "react-icons/fa";
import Slider from '@mui/material/Slider';
import { Autocomplete, TextField } from '@mui/material';  // Importing Autocomplete

const Products = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.items.data);
    const status = useSelector((state) => state.products.status);
    const error = useSelector((state) => state.products.error);
    const { keyword } = useParams();

    const [SelectedCategories, setSelectedCategories] = useState([]);
    const [ratings, setRatings] = useState(0);
    const [priceRange, setPriceRange] = useState([0, 500000]);  // Initial price range
    const navigate = useNavigate();


    // console.log(SelectedCategories);
    
    const category = [
        "3D Printers",
        "Action Cameras",
        "Antiques",
        "Archery Equipment",
        "Art And Collectibles",
        "Automotive",
        "Baby Products",
        "Bedding And Linens",
        "Beauty And Personal Care",
        "Bicycles",
        "Board Games",
        "Board Sports Equipment",
        "Books",
        "Camping And Hiking",
        "Camping Gear",
        "Car Accessories",
        "Card Games",
        "Cameras",
        "Clothing",
        "Collectibles",
        "Cooking Appliances",
        "Craft Kits",
        "Craft Supplies",
        "Cycling Accessories",
        "DIY And Home Improvement",
        "DIY Tools",
        "Drones",
        "E-Readers",
        "Eco-Friendly Products",
        "Educational Toys",
        "Electric Vehicles",
        "Electronics",
        "Energy-Efficient Devices",
        "Fitness Apparel",
        "Fitness Equipment",
        "Fitness Trackers",
        "Floor Coverings",
        "Food And Beverages",
        "Fragrances",
        "Furniture",
        "Gaming Accessories",
        "Gaming Consoles",
        "Gardening",
        "Handmade Products",
        "Headphones",
        "Health And Wellness",
        "Health Supplements",
        "Hiking Gear",
        "Home Appliances",
        "Home Decor",
        "Home Security Systems",
        "Hunting Equipment",
        "Jewelry",
        "Kitchen Appliances",
        "Kitchenware",
        "Large Appliances",
        "Laptops And Computers",
        "Lighting",
        "Luxury Goods",
        "Luxury Handbags",
        "Mobile Phones",
        "Motorcycle Gear",
        "Musical Accessories",
        "Musical Instruments",
        "Office Supplies",
        "Outdoor Furniture",
        "Party Supplies",
        "Pet Supplies",
        "Photography Equipment",
        "Photography Lenses",
        "Power Tools",
        "Puzzle Games",
        "Recycling Bins",
        "Robotic Vacuums",
        "Running Gear",
        "Scuba Diving Gear",
        "Shoes",
        "Skincare",
        "Small Appliances",
        "Smart Devices",
        "Smart Home Systems",
        "Smart Watches",
        "Solar Panels",
        "Sound Systems",
        "Speakers",
        "Sports And Outdoors",
        "Stationery",
        "Streaming Devices",
        "Studio Equipment",
        "Sunglasses",
        "Tableware",
        "Toys And Games",
        "Travel Accessories",
        "Travel Luggage",
        "Vinyl Records",
        "Video Games",
        "Wall Art",
        "Water Sports Equipment",
        "Wearable Tech",
        "Watches",
        "Watches And Accessories",
        "Winter Sports Gear",
        "Yoga Accessories",
        "Adult Products",
        "Appliances Parts",
        "Automotive Tools",
        "Baby Gear",
        "Batteries And Chargers",
        "Bedding",
        "Books And Magazines",
        "Camping Equipment",
        "Car Care",
        "Cell Phones And Accessories",
        "Clothing And Apparel",
        "Construction Materials",
        "Crafting Supplies",
        "DIY Projects",
        "Electronics Accessories",
        "Ethical Fashion",
        "Exotic Foods",
        "Fitness Nutrition",
        "Gardening Tools",
        "Gifts",
        "Glasses And Contact Lenses",
        "Hair Care",
        "Home And Kitchen",
        "Household Products",
        "Industrial Equipment",
        "Lingerie",
        "Luxury Jewelry",
        "Makeup",
        "Mobile Accessories",
        "Office Furniture",
        "Outdoor Gear",
        "Painting Supplies",
        "Portable Power",
        "Printers And Ink",
        "Replacement Parts",
        "School Supplies",
        "Security Systems",
        "Smart Home Gadgets",
        "Storage Solutions",
        "Tech Gadgets",
        "Televisions",
        "Toys",
        "Vitamins And Supplements",
        "Weddings And Events",
        "Winter Wear"
      ];
      
      

   

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = useSelector((state) => state.products.items.resultparpage);
    const filterproductscount = useSelector((state) => state.products.items.filterproductscount);

    useEffect(() => {
        dispatch(fetchProducts({
            keyword: keyword || '',
            currentPage,
            priceRange,
            categories: SelectedCategories.length ? SelectedCategories : '',
            ratings
        }));
        window.scrollTo({ top: 0, behavior: 'smooth' }); 
    }, [dispatch, keyword, currentPage, priceRange, SelectedCategories, ratings]);

    const totalPages = Math.ceil((filterproductscount || 0) / pageSize);

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' }); 
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
        window.scrollTo({ top: 0, behavior: 'smooth' }); 
    };


    
    const handlePriceSliderChange = (event, newValue) => {
        setPriceRange(newValue);
    };

    const clearFilters = () => {
        setSelectedCategories([]);
        setRatings(0);
        setPriceRange([0, 500000]);
        dispatch(reset());
        navigate("/products");
    };

    if (status === 'loading') {
        return <Loader />;
    }

    if (status === 'failed') {
        toast.error(error || "Internal Server error");
    }

    return (
        <div className="flex flex-col items-center py-6 space-y-6 bg-gray-100 min-h-screen ">
            {/* Sidebar with filters */}
            <div className='flex flex-wrap w-full'>
                <div className='md:w-[15%] px-4 w-[90%] md:m-0 m-auto'>
                    {/* Price range filter */}
                    <div className="min-w-2/3 text-center flex flex-col items-center gap-3">
                        <h1 className='font-semibold text-[19px] underline'>Price Range:</h1>
                        <Slider value={priceRange} onChange={handlePriceSliderChange} valueLabelDisplay="auto" min={0} max={500000} step={10} />
                        <p className="text-gray-700 mt-2 flex flex-col gap-2">
                            <span>${priceRange[0]} - ${priceRange[1]}</span>
                        </p>
                    </div>

                    {/* Category filter */}
                    <div className="">
                        <h4 className="text-lg font-semibold mb-2 underline pt-4 pl-4">Categories</h4>
                        <Autocomplete
                            multiple
                            id="category-filter"
                            options={category}
                            value={SelectedCategories}
                            onChange={(event, newValue) => setSelectedCategories(newValue)}
                            renderInput={(params) => <TextField {...params} label="Select Categories " />}
                            disableCloseOnSelect
                        />
                    </div>

                    {/* Ratings filter */}
                    <div className='p-4'>
                        <h4 className="text-lg font-semibold mb-2 underline">Minimum Rating</h4>
                        <div className="space-y-2">
                            {[1, 2, 3, 4, 5].map((star, i) => (
                                <div key={i}>
                                    <input
                                        type="checkbox"
                                        id={`star-${star}`}
                                        className="mr-2"
                                        checked={ratings === star}
                                        onChange={() => setRatings(ratings === star ? 0 : star)}
                                    />
                                    <label htmlFor={`star-${star}`} className="text-sm">
                                        {star}  <FaStar className='inline' /> {star >= 1 && '& above'}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Clear Filters button */}
                    <div className="p-4">
                        <button onClick={clearFilters} className="w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-500 transition">Clear Filters</button>
                    </div>
                </div>

                {status === 'failed' ? (
                    <div className='text-red-500 font-bold p-10 md:w-[75%] w-auto flex justify-center items-center text-center min-h-[50vh]'>
                        <p>Failed to load product details. Please try again later.</p>
                    </div>
                ) : (
                    <ProductCard product={products} />
                )}
            </div>

            {/* Pagination controls */}
            {status !== 'failed' ? pageSize < filterproductscount && (
                <div className="pagination-controls flex items-center space-x-4 mt-6">
                    <button onClick={handlePreviousPage} disabled={currentPage === 1} className="px-4 py-2 bg-[#ee755f] text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-[#ff593c] transition">
                        Previous
                    </button>
                    <span className="text-gray-700">Page {currentPage} of {totalPages}</span>
                    <button onClick={handleNextPage} disabled={currentPage === totalPages} className="px-4 py-2 bg-[#ee755f] text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-[#ff593c] transition">
                        Next
                    </button>
                </div>
            ) : "" }
        </div>
    );
};

export default Products;
