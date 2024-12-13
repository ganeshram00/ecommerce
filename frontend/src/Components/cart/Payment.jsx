import React, { Fragment, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { FaCreditCard, FaCalendarAlt, FaKey } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { createOrder, reset } from "../../redux/slice/orderSlice";
import CheckoutSteps from "../cart/ChackOutStaps";
import Loader from "../Loader/Loader";
import { clearallcart } from "../../redux/slice/cartSlice";


const Payment = () => {
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

    const dispatch = useDispatch();
    const stripe = useStripe();
    const elements = useElements();
    const payBtn = useRef(null);

    const navigate = useNavigate(); // Initialize useNavigate


    //   const { error } = useSelector((state) => state.newOrder);
    const error = null;

    const cartItems = useSelector((state) => state.cart.cart);
    const shippingInfo = useSelector((state) => state.shipping);
    const users = useSelector((state) => state.user.users);
    const { orderData, status } = useSelector((state) => state.newOrder);

    const user = users?.user;
    // console.log(orderInfo);

    console.log(shippingInfo);

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100),
    };
    // console.log(paymentData);
    console.log(cartItems);

    useEffect(() => {
        dispatch(reset())
        if (error) {
            toast.error(error);
            //   dispatch(clearErrors());
        }
    }, [dispatch, error]);

    console.log(status);

    if (status === "loading") {
        return <Loader />
    }



    const submitHandler = async (e) => {
        e.preventDefault();

        payBtn.current.disabled = true;

        // Add missing paymentInfo fields
        const order = {
            shippingInfo: {
                phoneNo: shippingInfo.phoneNo,  // Make sure phoneNo exists
                pinCode: shippingInfo.pinCode,  // Ensure pinCode exists
                country: shippingInfo.country,  // Ensure country exists
                state: shippingInfo.state,      // Ensure state exists
                city: shippingInfo.city,        // Ensure city exists
                address: shippingInfo.address,  // Ensure address exists
            },



            orderItems: cartItems.map(item => ({
                product: item._id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                image: item.images[0].url
            })),
            itemsPrice: orderInfo.subtotal,
            taxPrice: orderInfo.tax,
            shippingPrice: orderInfo.shippingCharges,
            totalPrice: orderInfo.totalPrice,
            paymentInfo: {} // Make sure paymentInfo is set correctly
        };
        console.log(order);
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            };
            const { data } = await axios.post(
                "http://localhost:4000/payment/payment/process",
                paymentData,
                config
            );

            const client_secret = data.client_secret;

            if (!stripe || !elements) return;

            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email,
                        address: {
                            line1: shippingInfo.address,
                            city: shippingInfo.city,
                            state: shippingInfo.state,
                            postal_code: shippingInfo.pinCode,
                            country: shippingInfo.country,
                        },
                    },
                },
            });

            if (result.error) {
                payBtn.current.disabled = false;
                toast.error(result.error.message);
            } else {
                if (result.paymentIntent.status === "succeeded") {
                    // Add the paymentInfo data after successful payment
                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status,
                    };
                    dispatch(clearallcart())
                    dispatch(createOrder(order));

                    toast.success("Payment Successful!");
                    navigate("/success");
                } else {
                    toast.error("There's some issue while processing payment");
                }
            }
        } catch (error) {
            payBtn.current.disabled = false;
            toast.error(error.response.data.message);
        }
    };





    return (
        <Fragment>
            <CheckoutSteps activeDetails={3} />

            <div className="payment-container bg-gray-100 py-10 min-h-screen flex items-center justify-center">
                <form
                    className="payment-form bg-white shadow-lg rounded-lg p-8 w-full max-w-md"
                    onSubmit={submitHandler}
                >
                    <h1 className="text-2xl font-bold mb-6 text-center text-gray-700 ">Card Info</h1>
                    <div className="mb-6 flex items-center border-b border-gray-300 pb-2">
                        <FaCreditCard className="text-gray-500 mr-3" />
                        <CardNumberElement className="w-full focus:outline-none text-lg py-2" />
                    </div>
                    <div className="mb-6 flex items-center border-b border-gray-300 pb-2">
                        <FaCalendarAlt className="text-gray-500 mr-3" />
                        <CardExpiryElement className="w-full focus:outline-none text-lg py-2" />
                    </div>
                    <div className="mb-6 flex items-center border-b border-gray-300 pb-2">
                        <FaKey className="text-gray-500 mr-3" />
                        <CardCvcElement className="w-full focus:outline-none text-lg py-2" />
                    </div>

                    <button
                        type="submit"
                        ref={payBtn}
                        className="payment-button w-full py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300 text-lg"
                    >
                        Pay - ₹{orderInfo && orderInfo.totalPrice}
                    </button>
                </form>
            </div>

        </Fragment>
    );
};

export default Payment;
