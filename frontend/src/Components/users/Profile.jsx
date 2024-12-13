import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from 'react-redux'

import { Link, useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import toast from "react-hot-toast";

const Profile = () => {
    const navigate = useNavigate();
    const { users, isAuthenticated, error, status } = useSelector((state) => state.user);
    const [user, setUser] = useState(users.user)

 
    // console.log(user);

    useEffect(() => {
        if (isAuthenticated === false) {
            navigate('/login')
        }
    }, [isAuthenticated, navigate])

    if (status === 'loading') {
        return <Loader />;
    }

    if (status === 'failed') {
        toast.error(error || 'error');
        console.log(error);
    }

    return (
        <Fragment>

            <Fragment>
                <div className="grid grid-cols-1 sm:py-5 md:grid-cols-2 gap-5 bg-white">
                    <div className="flex flex-col py-5 justify-center items-center">
                        <h1 className="text-[rgba(0,0,0,0.555)] m-2 text-center  w-full  ">My Profile</h1>
                        <img className="w-[15vmax] cursor-pointer h-[15vmax] rounded-full duration-300 hover:scale-105" src={user?.avatar?.url} alt={user.name} />
                        <Link className="bg-[tomato] font-[Roboto] p-[0.5vmax] md:w-[25%] m-[4vmax] hover:bg-[rgb(204,78,56)] text-center duration-300" to={'/update'}>Edit Profile</Link>
                    </div>
                    <div className="flex flex-col items-center text-center md:text-start md:items-start justify-evenly ">
                        <div>
                            <h1 className="text-black font-[Roboto]">Full Name</h1>
                            <p className="text-[rgba(0,0,0,0.418)] font-[cursive] m-[0.2vmax]">{user.name}</p>
                        </div>
                        <div>
                            <h1 className="text-black font-[Roboto]">Email</h1>
                            <p className="text-[rgba(0,0,0,0.418)] font-[cursive] m-[0.2vmax]">{user.email}</p>
                        </div>
                        <div>
                            <h1 className="text-black font-[Roboto]">Joined On</h1>
                            <p className="text-[rgba(0,0,0,0.418)] font-[cursive] m-[0.2vmax]">{user.createdAt.substring(0, 10)}</p>
                        </div>
                        <div className="flex flex-col w-[60%]">
                            <Link to={'/orders'} className="bg-[rgb(68,68,68)] text-white font-[Roboto] my-[1vmax] p-[0.5vmax] text-center duration-300 hover:bg-[rgb(31,31,31)]">My Order</Link>
                            <Link to={'/password'} className="bg-[rgb(68,68,68)] text-white font-[Roboto] my-[1vmax] p-[0.5vmax] text-center duration-300 hover:bg-[rgb(31,31,31)]">Change Password</Link>
                        </div>
                    </div>
                </div>
            </Fragment>
        </Fragment>
    );
};

export default Profile;