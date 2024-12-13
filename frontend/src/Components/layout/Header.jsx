import React, { useState } from "react";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { ImCross } from "react-icons/im";
import { FaBars, FaSearch, FaRegIdBadge } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";


const Header = () => {

    const { isAuthenticated } = useSelector((state) => state.user);
    const cartItems = useSelector((state) => state.cart.cart);

    const nav = [
        { name: "Home", link: "/" },
        { name: "About", link: "/about" },
        { name: "Products", link: "/products" },
        { name: "Contact", link: "/contact" },
        { name: <FaSearch />, link: "/search" },
        { name: '', link: "/" }
    ];

    const [toggle, setToggle] = useState(false);

    const changeIcon = () => {
        setToggle(!toggle);
    };

    return (
        <header style={{position:"sticky"}} className="w-full flex items-center justify-between  top-0 py-4 px-4 bg-slate-300 z-10 ">
            <div className="flex items-center gap-4">
                {/* Hamburger / Cross Icon */}
                {toggle ? (
                    <ImCross
                        onClick={changeIcon}
                        className="text-[22px] cursor-pointer md:hidden"
                        style={{ zIndex: "50000002" }}
                    />
                ) : (
                    <FaBars
                        onClick={changeIcon}
                        className="text-[22px] cursor-pointer md:hidden"
                    />
                )}
                {/* Logo */}
                <Link to="/">
                    <h1 className="font-bold text-[25px] titles">Ecommerce</h1>
                </Link>
            </div>

            {/* Desktop Navigation */}
            <ul className={`md:flex ${isAuthenticated == true ? "w-[62%]" : 'w-[48%]'} justify-around items-center text-[16px] hidden`}>
                {nav.map((d, i) => (
                    <li key={i}>
                        <Link to={d.link} className="hover:text-blue-600">
                            {d.name}
                        </Link>
                    </li>
                ))}
                {/* <NavLink to="/search" className="text-[20px] text-[#000000a5]">
                    <FaSearch />
                
                </NavLink> */}


                {isAuthenticated == true ? "" :
                    <>

                        <NavLink to="/Register" className="text-[22px] text-[#000000a5]">
                            <FaRegIdBadge />
                        </NavLink>
                        <NavLink to="/cart" className="relative">
                            <MdOutlineLocalGroceryStore className="text-[30px] text-[#000000a5]" />
                            <span className="cart absolute top-[-13px] right-[-2px]">{cartItems.length}</span>
                        </NavLink>
                    </>
                }
            </ul>

            {/* Mobile Cart and Login Icons */}
            {isAuthenticated == true ? "" :
                <div className="md:hidden flex items-center gap-4">
                    <NavLink to="/Register" className="text-[22px] text-[#000000a5]">
                        <FaRegIdBadge />
                    </NavLink>
                    <NavLink to="/cart" className="relative text-[30px]">
                        <MdOutlineLocalGroceryStore className="text-[#000000a5]" />
                        <span className="cart absolute top-[-11px] text-[14px] right-[0px] ">{cartItems.length}</span>
                    </NavLink>

                </div>
            }

            {/* Mobile Navigation */}
            <ul
                style={{ zIndex: "50000000" }}
                className={`md:hidden justify-around items-center top-0 text-[16px] h-screen font-bold absolute pt-[50px] duration-500 gap-2 pb-[100px] bg-white w-full flex flex-col ${toggle ? "left-0" : "left-[-100%]"
                    }`}
            >
                {nav.map((d, i) => (
                    <li key={i}>
                        <Link
                            to={d.link}
                            onClick={() => setToggle(false)}
                            className="hover:text-blue-600"
                        >
                            {d.name}
                        </Link>
                    </li>
                ))}
                {/* <NavLink to="/search" className="text-[20px] text-[#000000a5]">
                    <FaSearch />
                </NavLink> */}

            </ul>
        </header>
    );
};

export default Header;

