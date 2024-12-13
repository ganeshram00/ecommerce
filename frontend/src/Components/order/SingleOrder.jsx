import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleOrder } from '../../redux/slice/orderSlice';
import { useParams } from 'react-router-dom';

const SingleOrder = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const order = useSelector((state) => state.newOrder.singleOrder?.order);

    useEffect(() => {
        dispatch(getSingleOrder(id));
    }, [dispatch, id]);

    if (!order) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin border-t-4 border-blue-600 rounded-full w-16 h-16 border-b-4 border-transparent"></div>
            </div>
        ); // Show a spinner while data is being fetched
    }

    return (
        <div className="p-6 max-w-full sm:max-w-5xl mx-auto space-y-8 my-4">
            <div className="p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-3xl text-center font-semibold">Order Details</h2>
                <h3 className="text-xl text-center  mt-2">Order Id : <span className='text-red-600'> #{order._id}</span></h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-gray-800">Shipping Info</h4>
                        <p className="text-gray-600">{order.shippingInfo.address}, {order.shippingInfo.city}, {order.shippingInfo.state}, {order.shippingInfo.country}</p>
                        <p className="text-gray-600">Phone: {order.shippingInfo.phoneNo}</p>
                        <p className="text-gray-600">Pin Code: {order.shippingInfo.pinCode}</p>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-gray-800">Payment Info</h4>
                        <p className="text-gray-600">Status: <span className='text-green-400'>{order.paymentInfo.status}</span></p>
                        <p className="text-gray-600">Payment ID: {order.paymentInfo.id}</p>
                        <p className="text-gray-600">Total Price: ₹{(order.totalPrice).toFixed(2)}</p>
                    </div>
                </div>

                <hr className="my-6 border-gray-300" />

                <div className="space-y-6">
                    <h4 className="text-lg font-semibold text-gray-800">Order Items</h4>
                    <div className="space-y-4">
                        {order.orderItems.map((item) => (
                            <div key={item._id} className="flex items-center space-x-4 p-4 rounded-lg shadow-md transition duration-200 bg-gray-50">
                                <img src={item.image} alt={item.name} className="w-16 h-auto object-cover rounded" />
                                <div className="flex-1">
                                    <h5 className="text-xl font-semibold">{item.name}</h5>
                                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                                    <p className="text-gray-600">Price: ₹{(item.price).toFixed(2)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <hr className="my-6 border-gray-300" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div className="flex justify-between text-lg text-gray-700 font-medium">
                            <span>Items Price:</span>
                            <span>₹{(order.itemsPrice).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-lg text-gray-700 font-medium">
                            <span>Shipping Price:</span>
                            <span>₹{(order.shippingPrice).toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between text-lg text-gray-700 font-medium">
                            <span>Tax Price:</span>
                            <span>₹{(order.taxPrice).toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                <hr className="my-6 border-gray-300" />

                <div className="flex justify-between text-xl font-semibold text-gray-900 mt-6">
                    <span>Total Price:</span>
                    <span>₹{(order.totalPrice).toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
};

export default SingleOrder;
