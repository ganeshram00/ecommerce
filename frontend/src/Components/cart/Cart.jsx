import React, { useState, useEffect } from "react";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import { MdRemoveShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { addtocart, clearallcart, removeFromCart } from "../../redux/slice/cartSlice";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    calculateTotal();
  }, [cartItems]);

  const calculateTotal = () => {
    const newTotal = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotal(newTotal.toFixed(2));
  };

  const incrementQuantity = (item) => {
    const newQuantity = item.quantity + 1;
    if (newQuantity <= item.stock) {
      console.log(item);

      dispatch(addtocart({ products: item, quantity: newQuantity }));
    } else {
      toast.error("Cannot exceed available stock!");
    }
  };

  const decrementQuantity = (item) => {
    const newQuantity = item.quantity - 1;
    if (newQuantity >= 1) {
      dispatch(addtocart({ products: item, quantity: newQuantity }));
    } else {
      toast.error("Quantity cannot be less than 1!");
    }
  };

  const chakeOutHandler = () => {
    navigate("/Register?redirect=shipping");
  };

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="bg-gray-100 h-screen flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
            <MdRemoveShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 capitalize">
              No products in your cart
            </h2>
            <p className="text-gray-600 mb-6 text-sm sm:text-base">
              It looks like you haven’t added anything to your cart yet. Start
              shopping now!
            </p>
            <Link
              to={"/products"}
              className="bg-blue-500 text-white py-2 px-6 rounded-lg text-sm sm:text-lg hover:bg-blue-600 transition duration-300"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-lg p-6">
          {cartItems.map((item) => (
            <div
              key={item.productId}
              className="flex items-center mb-4 p-4 hover:bg-gray-50 transition-colors duration-200 rounded-lg"
            >
              <img
                src={item.images[0].url}
                alt={item.name}
                className="w-20 h-auto object-cover rounded-md mr-4 hover:scale-105 transition-transform duration-200"
              />
              <div className="flex-grow">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
                <div className="flex items-center mt-2 space-x-2">
                  <button
                    onClick={() => decrementQuantity(item)}
                    className="bg-gray-200 text-gray-700 px-3 py-1 rounded-l hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors duration-200"
                    aria-label="Decrease quantity"
                  >
                    <FaMinus />
                  </button>
                  <span className="bg-gray-100 px-4 py-1 text-center w-12">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => incrementQuantity(item)}
                    className="bg-gray-200 text-gray-700 px-3 py-1 rounded-r hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors duration-200"
                    aria-label="Increase quantity"
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>
              <button
                onClick={() => dispatch(removeFromCart(item._id))}
                className="text-red-500 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 rounded-full p-2 transition-colors duration-200"
                aria-label="Remove item"
              >
                <FaTrash />
              </button>
            </div>
          ))}
          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-2xl font-bold">${total}</span>
            </div>

            <div className="flex items-center mb-4">
              <button
                className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 font-semibold transition-all"
                onClick={() => {
                  dispatch(clearallcart()); // Dispatch action to clear the cart
                  toast.success('All items removed from the cart!'); // Show success toast
                }}
              >
                Remove All
              </button>
            </div>

            <button
              className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
              onClick={chakeOutHandler}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
