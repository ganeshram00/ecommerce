import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaTags, FaDollarSign, FaClipboard, FaLaptop, FaImage, FaRupeeSign } from "react-icons/fa"; // React Icons
import toast from "react-hot-toast";
import { Sidebardashboard } from "./Sidebardashboard";
import { useNavigate } from "react-router-dom"; // For navigation
import { MdDescription, MdSpellcheck, MdStorage } from "react-icons/md";
import { adminCreateProducts } from "../../redux/slice/productSlicer";
import Loader from "../Loader/Loader";

const AddProducts = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { error, products, status } = useSelector((state) => state.products);

    const [name, setName] = useState("");
    const [price, setPrice] = useState();
    const [description, setDescription] = useState("");
    const [category, setcategory] = useState("");
    const [stock, setstock] = useState();
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const categories = [
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
      
    const createProductImagesChange = (e) => {
        const files = Array.from(e.target.files);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((prev) => [...prev, reader.result]); // Add preview to state
                    setImages((prev) => [...prev, file]); // Add file to state for uploading
                }
            };

            reader.readAsDataURL(file);
        });
    };



    const createProductSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("category", category);
        myForm.set("stock", stock);
        images.forEach((images) => {
            // console.log(images);
            myForm.append("images", images); // Ensure images key is used correctly
        });

        dispatch(adminCreateProducts(myForm));  // Dispatch the action to create product
       
    };

    if (status === 'loading') {
        return <Loader />;
    }

    if (status === 'failed') {
        // console.log(error);

        toast.error(error);
    }


    return (
        <Fragment>
            <div className="flex">
                <Sidebardashboard />
                <div className="flex-1 p-6 space-y-6 bg-white rounded-lg shadow-md">
                    <form
                        className="space-y-6 w-[80%] m-auto"
                        encType="multipart/form-data"
                        onSubmit={createProductSubmitHandler}
                    >
                        <h1 className="text-2xl font-semibold text-gray-800 text-center uppercase">Create Product</h1>

                        {/* Product Name */}
                        <div className="flex items-center space-x-3">
                            <MdSpellcheck className="text-gray-600" />
                            <input
                                type="text"
                                placeholder="Product Name"
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        {/* Product Price */}
                        <div className="flex items-center space-x-3">
                            <FaRupeeSign className="text-gray-600" />
                            <input
                                type="number"
                                placeholder="Price"
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>

                        {/* Product Description */}
                        <div className="flex items-center space-x-3">
                            <MdDescription className="text-gray-600" />
                            <textarea
                                placeholder="Product Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                cols="30"
                                rows="4"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            ></textarea>
                        </div>

                        {/* category Selection */}
                        <div className="flex items-center space-x-3">
                            <FaTags className="text-gray-600" />
                            <select
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                value={category}
                                onChange={(e) => setcategory(e.target.value)}
                            >
                                <option value="">Choose category</option>
                                {categories.map((cate) => (
                                    <option key={cate} value={cate}>
                                        {cate}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* stock Input */}
                        <div className="flex items-center space-x-3">
                            <MdStorage className="text-gray-600" />
                            <input
                                type="number"
                                placeholder="stock"
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                value={stock}
                                onChange={(e) => setstock(e.target.value)}
                            />
                        </div>

                        {/* Image Upload */}
                        <div className="flex items-center space-x-3">
                            <FaImage className="text-gray-600" />
                            <input
                                type="file"
                                name="images"
                                accept="images/*"
                                onChange={createProductImagesChange}
                                multiple
                                className="w-full p-3 border border-gray-300 rounded-lg"
                            />
                        </div>

                        {/* Image Preview */}
                        <div className="flex space-x-2 mt-4">
                            {imagesPreview.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt="Product Preview"
                                    className="w-20 h-20 object-cover rounded-lg shadow-sm"
                                />
                            ))}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="w-full py-3 mt-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                        >
                            {status === 'loading' ? "Creating..." : "Create Product"}
                        </button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default AddProducts;
