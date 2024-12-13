import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Country, State } from "country-state-city";
import { useNavigate } from "react-router-dom"; // Assuming react-router v6
import { FaHome, FaPhone } from "react-icons/fa";
import { MdLocationCity, MdPinDrop, MdPublic, MdOutlineTransferWithinAStation } from "react-icons/md";
import { MdOutlinePhoneIphone } from "react-icons/md";
import { updateShippingDetails } from "../../redux/slice/shippingSlice";
import toast from "react-hot-toast"; // Importing toast
import ChackOutStaps from "./ChackOutStaps";

const Shipping = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Accessing the savedDetails from the cart state and providing a fallback in case it's undefined
    const savedDetails = useSelector((state) => state.shipping);
    console.log(savedDetails);


    // Using useEffect to initialize the state only after savedDetails is loaded
    const [shippingDetails, setShippingDetails] = useState({
        address: "",
        city: "",
        state: "",
        country: "",
        pinCode: "",
        phoneNo: "",
    });

    useEffect(() => {
        if (savedDetails) {
            setShippingDetails({
                address: savedDetails.address || "",
                city: savedDetails.city || "",
                state: savedDetails.state || "",
                country: savedDetails.country || "",
                pinCode: savedDetails.pinCode || "",
                phoneNo: savedDetails.phoneNo || "",
            });
        }
    }, [savedDetails]); // Re-run when savedDetails changes

    const handleChange = (e) => {
        const { name, value } = e.target;
        setShippingDetails((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const shippingSubmit = (e) => {
        e.preventDefault();

        if (!/^\d{10}$/.test(shippingDetails.phoneNo)) {
            toast.error("Phone Number should be 10 digits long and numeric");
            return;
        }
        console.log(shippingDetails);

        dispatch(updateShippingDetails(shippingDetails));
        navigate("/order/confirm");
    };

    return (
        <Fragment>
            <ChackOutStaps activeDetails={1} />
            <div className="min-h-screen bg-gray-100 py-8">
                <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                        Shipping Details
                    </h2>

                    <form className="space-y-6" onSubmit={shippingSubmit}>
                        <div className="flex items-center space-x-3">
                            <FaHome />
                            <input
                                type="text"
                                name="address"
                                placeholder="Address"
                                required
                                value={shippingDetails.address}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-lg focus:ring focus:ring-indigo-300"
                            />
                        </div>

                        <div className="flex items-center space-x-3">
                            <MdLocationCity />
                            <input
                                type="text"
                                name="city"
                                placeholder="City"
                                required
                                value={shippingDetails.city}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-lg focus:ring focus:ring-indigo-300"
                            />
                        </div>

                        <div className="flex items-center space-x-3">
                            <MdPinDrop />
                            <input
                                type="number"
                                name="pinCode"
                                placeholder="Pin Code"
                                required
                                value={shippingDetails.pinCode}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-lg focus:ring focus:ring-indigo-300"
                            />
                        </div>

                        <div className="flex items-center space-x-3">
                            <MdOutlinePhoneIphone />
                            <input
                                type="number"
                                name="phoneNo"
                                placeholder="Phone Number"
                                required
                                value={shippingDetails.phoneNo}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-lg focus:ring focus:ring-indigo-300"
                            />
                        </div>

                        <div className="flex items-center space-x-3">
                            <MdPublic />
                            <select
                                name="country"
                                required
                                value={shippingDetails.country}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-lg focus:ring focus:ring-indigo-300"
                            >
                                <option value="">Select Country</option>
                                {Country.getAllCountries().map((item) => (
                                    <option key={item.isoCode} value={item.isoCode}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {shippingDetails.country && (
                            <div className="flex items-center space-x-3">
                                <MdOutlineTransferWithinAStation />
                                <select
                                    name="state"
                                    required
                                    value={shippingDetails.state}
                                    onChange={handleChange}
                                    className="w-full p-3 border rounded-lg focus:ring focus:ring-indigo-300"
                                >
                                    <option value="">Select State</option>
                                    {State.getStatesOfCountry(shippingDetails.country).map((item) => (
                                        <option key={item.isoCode} value={item.isoCode}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <button
                            type="submit"
                            className={`w-full py-3 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition ${!shippingDetails.state && "cursor-not-allowed opacity-50"
                                }`}
                            disabled={!shippingDetails.state}
                        >
                            Continue
                        </button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default Shipping;
