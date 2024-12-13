import React, { Fragment } from "react";
import { SpeedDial, Backdrop, SpeedDialAction } from '@mui/material';
import { MdShoppingCart } from "react-icons/md";

import { useState } from "react";
import { MdDashboard } from "react-icons/md";
import { CiViewList } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { IoMdExit } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from "../../redux/slice/userSlicer";
// import { logoutUser } from '../redux/UserSlicer'

const UserOptions = ({ users }) => {
    const cartItems = useSelector((state) => state.cart.cart);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // console.log(users);


    const options = [
        { icon: <CiViewList />, name: "Orders", func: orders },
        { icon: <CgProfile />, name: "Profile", func: account },
        { icon: <MdShoppingCart style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}  />, name: `Cart ${cartItems.length}`, func: cart },
        { icon: <IoMdExit />, name: "LogOut", func: logoutuser }
    ];

    function dashboard() {
        navigate("/admin/dashboard")
    };
    function orders() {
        navigate("/orders")
    };
    function cart() {
        navigate("/cart")
    };
    function account() {
        navigate("/account")
    };
    function logoutuser() {
        dispatch(logOut())
        toast.success("Logout Successfully")

    };

    if (users?.user?.role && users.user.role === "admin") {
        options.unshift({ icon: <MdDashboard />, name: "Dashboard", func: dashboard })
    }
    // console.log(users);

    const [open, setOpen] = useState(false);
    return (
        <Fragment>
            <Backdrop open={open} style={{ zIndex: "1" }} />
            <SpeedDial
                ariaLabel="SpeedDial tooltip example"
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                direction="down"
                className="fixed top-[5px] right-[5px]"
                icon={
                    <img className="w-[50px] h-[50px] rounded-full" src={users?.user?.avatar?.url ? users.user.avatar.url : "/images/Profile.png"} alt="" />
                }
            >
                {options.map((item) => (
                    <SpeedDialAction icon={item.icon} key={item.name} tooltipTitle={item.name} tooltipOpen={window.innerWidth <= 600 ? true : false} onClick={item.func} />
                ))}
            </SpeedDial>
        </Fragment >
    );
};

export default UserOptions;