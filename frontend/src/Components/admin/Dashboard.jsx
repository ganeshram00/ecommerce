import React, { useEffect } from 'react';
import { Sidebardashboard } from './Sidebardashboard';
import { Bar, Line, Pie } from 'react-chartjs-2'; // Importing Pie chart
import 'chart.js/auto';
import { adminProducts } from '../../redux/slice/productSlicer';
import { useDispatch, useSelector } from 'react-redux';
import { AllOrderAdmins } from '../../redux/slice/orderSlice';
import { GetAllUser } from '../../redux/slice/userSlicer';
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';

const Dashboard = () => {

    const dispatch = useDispatch()
    const products = useSelector((state) => state.products.adminProducts?.data)
    const orders = useSelector((state) => state.newOrder.getAllOrder?.orders);
    const user = useSelector((state) => state.user.allUser);
    const status = useSelector((state) => state.products.status);



    // console.log(orders);

    let outOfStock = 0;
    products && products.forEach((item) => {
        if (item.stock === 0) {
            outOfStock += 1
        }
    })



    let totalAmount = 0;  // Change this to let
    orders && orders.forEach((item) => {
        // console.log(item);

        // Ensure totalPrice is available and is a number
        if (item.totalPrice) {
            totalAmount += item?.totalPrice;
        }
    });


    useEffect(() => {
        dispatch(adminProducts())
        dispatch(AllOrderAdmins())
        dispatch(GetAllUser())

    }, [dispatch])


    // Data for the line chart (example)
    const chartData = {
        labels: ['Revenue'],
        datasets: [
            {
                label: 'Revenue',
                data: [totalAmount],  // Wrap totalAmount in an array
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                borderRadius: 5,
            },
        ],
    };


    // Data for the Pie chart (In Stock vs Out of Stock)
    const pieChartData = {
        labels: ['In Stock', 'Out of Stock'],
        datasets: [
            {
                data: [products && products?.length - outOfStock, outOfStock], // Example data, replace with actual values
                backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
                borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
                borderWidth: 1,
            },
        ],
    };

    // Options for the Pie chart
    const pieChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
    };

    if (status === 'loading') {
        return <Loader />;
    }


    const data = [
        { title: 'Total Revenue', value: `₹${(totalAmount)?.toFixed(2)}`, color: 'bg-green-500', link: null },
        { title: 'Products', value: products && products.length, color: 'bg-blue-500', link: '/admin/products' },
        { title: 'Orders', value: orders && orders.length, color: 'bg-yellow-500', link: '/admin/orders' },
        { title: 'Users', value: user && user?.totalUser, color: 'bg-red-500', link: '/admin/users' },
    ]

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebardashboard />

            {/* Main content */}
            <div className="flex-1 p-6">
                {/* Dashboard header */}
                <h1 className="text-2xl font-bold mb-6 text-center w-full uppercase py-2 ">Dashboard</h1>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 justify-center">
                    {data.map((stat, index) => (
                        <div className="flex justify-center items-center">
                            <Link to={stat.link} className="">

                                <div
                                    key={index}
                                    className={`p-4 shadow-md  text-center text-white ${stat.color} w-[200px] h-[200px] rounded-full flex justify-center flex-col items-center`}
                                >
                                    <h2 className="text-lg font-semibold">{stat.title}</h2>
                                    <p className="text-3xl font-bold">{stat.value}</p>
                                </div>
                            </Link>

                        </div>
                    ))}

                </div>

                {/* Revenue Overview Chart */}
                <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold mb-4 text-center">Revenue Overview</h2>
                    <div className="h-96 flex justify-center items-center">
                        <Bar data={chartData} />
                    </div>
                </div>

                {/* In Stock vs Out of Stock Pie Chart */}
                <div className="mt-8 p-6 bg-white rounded-lg shadow-md ">
                    <h2 className="text-lg font-semibold mb-4 text-center">Stock Overview</h2>
                    <div className="h-96 flex justify-center items-center">
                        <Pie data={pieChartData} options={pieChartOptions} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
