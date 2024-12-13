import React, { Fragment } from "react";
import CheckoutSteps from "../cart/ChackOutStaps";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import toast from "react-hot-toast";

const ConfirmOrder = () => {
  const cartItems = useSelector((state) => state.cart.cart);
  const savedDetails = useSelector((state) => state.shipping);
  const users = useSelector((state) => state.user.users);

  const user = users?.user;
  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 1000 ? 0 : 200;
  const tax = subtotal * 0.18;
  const totalPrice = subtotal + tax + shippingCharges;

  const address = `${savedDetails.address}, ${savedDetails.city}, ${savedDetails.state}, ${savedDetails.pinCode}, ${savedDetails.country}`;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/process/payment");
    toast.success("Order Confirmed Successfully!");
  };

  if (!user) {
    return <Loader />;
  }

  return (
    <Fragment>
      <CheckoutSteps activeDetails={2} />

      <div className="flex flex-col lg:flex-row justify-between px-4 py-6 lg:px-16 lg:py-10 gap-6">
        {/* Shipping Info */}
        <div className="lg:w-2/3 w-full bg-gray-50 p-4 rounded-md shadow-md">
          <div className="mb-6">
            <h1 className="text-lg font-semibold mb-2">Shipping Info</h1>
            <div className="bg-white p-4 rounded-md shadow-sm">
              <div className="mb-2">
                <p className="font-medium text-sm lg:text-base">Name:</p>
                <span className="text-sm lg:text-base">{user.name}</span>
              </div>
              <div className="mb-2">
                <p className="font-medium text-sm lg:text-base">Phone:</p>
                <span className="text-sm lg:text-base">{savedDetails.phoneNo}</span>
              </div>
              <div>
                <p className="font-medium text-sm lg:text-base">Address:</p>
                <span className="text-sm lg:text-base">{address}</span>
              </div>
            </div>
          </div>

          {/* Cart Items */}
          <div>
            <h1 className="text-lg font-semibold mb-2">Your Cart Items:</h1>
            <div className="bg-white p-4 rounded-md shadow-sm">
              {cartItems &&
                cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex flex-col sm:flex-row items-start sm:items-center mb-4"
                  >
                    <img
                      src={item.images[0].url}
                      alt="Product"
                      className="w-16 h-16 rounded-md mr-4 mb-2 sm:mb-0"
                    />
                    <Link
                      to={`/product/${item.product}`}
                      className="text-blue-500 hover:underline text-sm lg:text-base"
                    >
                      {item.name}
                    </Link>
                    <span className="ml-auto text-sm lg:text-base">
                      {item.quantity} X ₹{item.price} ={" "}
                      <b>₹{item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3 w-full bg-gray-50 p-4 rounded-md shadow-md">
          <h1 className="text-lg font-semibold mb-4">Order Summary</h1>
          <div className="bg-white p-4 rounded-md shadow-sm">
            <div className="flex justify-between mb-4 text-sm lg:text-base">
              <p>Subtotal:</p>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between mb-4 text-sm lg:text-base">
              <p>Shipping Charges:</p>
              <span>₹{shippingCharges}</span>
            </div>
            <div className="flex justify-between mb-4 text-sm lg:text-base">
              <p>GST:</p>
              <span>₹{tax}</span>
            </div>
            <div className="flex justify-between font-semibold text-base lg:text-lg">
              <p>Total:</p>
              <span>₹{totalPrice}</span>
            </div>
          </div>
          <button
            onClick={proceedToPayment}
            className="w-full mt-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200 text-sm lg:text-base"
          >
            Proceed To Payment
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
