import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleOrder, OrderStatusUpdate, reset } from '../../redux/slice/orderSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { Sidebardashboard } from './Sidebardashboard';
import { toast } from 'react-hot-toast';
import Loader from '../Loader/Loader';

const Process = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const order = useSelector((state) => state.newOrder.singleOrder?.order);
    const statuss = useSelector((state) => state.newOrder.status);
    console.log(statuss);

    const [status, setstatus] = useState('')
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(getSingleOrder(id));
        dispatch(reset())
    }, [dispatch, id]);




    if (!order) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin border-t-4 border-blue-600 rounded-full w-16 h-16 border-b-4 border-transparent"></div>
            </div>
        ); // Show a spinner while data is being fetched
    }
    const handleStatusChange = async () => {
        dispatch(OrderStatusUpdate({ id, status }))
        dispatch(reset())
        toast.success(`Status Update `)
        dispatch(getSingleOrder(id));

        if (statuss === 'succeeded') {
            dispatch(getSingleOrder(id));
        }


    };





    // if (statuss === 'loading') {
    //     return <Loader />;
    // }


    return (
        <section className="bg-white ">
            <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100 ">
                <Sidebardashboard />

                <div className="">
                    <div className="flex-1 px-4 lg:px-8  py-8 md:py-16">
                        <h2 className="text-3xl text-center font-semibold">Order Details</h2>
                        <h3 className="text-xl text-center  mt-2">Order Id : <span className='text-red-400'> #{order._id}</span></h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                            <div className="space-y-4">
                                <h4 className="text-lg font-semibold text-gray-800">Shipping Info</h4>
                                <p className="text-gray-600">Name: {order.user.name}</p>

                                <p className="text-gray-600">Address: {order.shippingInfo.address}, {order.shippingInfo.city}, {order.shippingInfo.state}, {order.shippingInfo.country}</p>
                                <p className="text-gray-600">Phone: {order.shippingInfo.phoneNo}</p>
                                <p className="text-gray-600">Pin Code: {order.shippingInfo.pinCode}</p>
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-lg font-semibold text-gray-800">Payment </h4>
                                <p className="text-gray-600">Status: <span className='text-green-400'>{order.paymentInfo.status}</span></p>

                                <p className=" text-gray-600"><span className='font-semibold'>Total Price:</span> ₹{(order.totalPrice).toFixed(2)}</p>
                            </div>
                        </div>


                        <hr className="my-6 border-gray-300" />

                        <div className="flex flex-col justify-evenly font-semibold text-gray-900 mt-6">
                            <span className="text-xl">Order Status</span>
                            <span
                                className={`my-2 ${order.orderStatus === 'Delivered'
                                    ? 'text-green-500'
                                    : order.orderStatus === 'Shipped'
                                        ? 'text-blue-500'
                                        : 'text-yellow-500'
                                    }`}
                            >
                                {order.orderStatus}
                            </span>


                            {
                                order.orderStatus === "Delivered"
                                    ?
                                    ''
                                    :
                                    <div className="mt-4">
                                        <label htmlFor="status" className="block font-semibold text-gray-700">
                                            Change Order Status:
                                        </label>
                                        <select
                                            id="status"
                                            className="mt-2 block md:w-[50%] p-2 border rounded-lg"
                                            value={status}
                                            onChange={(e) => setstatus(e.target.value)}
                                        >
                                            <option value="">Select Status</option>
                                            {order.orderStatus === 'Processing' && <option value="Shipped">Shipped</option>}
                                            {order.orderStatus === 'Shipped' && <option value="Delivered">Delivered</option>}
                                        </select>


                                        <button disabled={status === "" ? true : false}
                                            onClick={(handleStatusChange)}
                                            className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
                                        >
                                            Update Status
                                        </button>
                                    </div>
                            }

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






                    </div>
                </div>
            </div>
        </section>
    );
};

export default Process;
