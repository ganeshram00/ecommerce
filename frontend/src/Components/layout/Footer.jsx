import React from "react";
import { NavLink } from "react-router-dom";
import { FaInstagramSquare } from "react-icons/fa";


const Footer = () => {
    return (
        <div className="grid grid-cols-1 mt-[5px] text-white p-[2vmax] bg-[rgb(34,33,33)] md:grid-cols-3 gap-5">
            <div className="flex flex-col items-center">
                <h4 className="font-[Roboto] ">DOWNLOAD OUR APP</h4>
                <p style={{ fontFamily: '"Lucida Sans", "Lucida Sans Regular", "Lucida Grande", "Lucida Sans Unicode", Geneva, Verdana, sans-serif' }} className="  text-center text-[21px] py-2 ">Download App for Android and IOS mobile phone</p>
                <img src="/images/playstore.png" alt="" className="w-[10vmax] cursor-pointer  m-[1vmax]" />
                <img src="/images/Appstore.png" alt="" className="w-[10vmax] cursor-pointer m-[1vmax]" />
            </div>
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-[50px] text-[#eb4034] py-2 titles" >Ecommerce</h1>
                <p className="font-[Roboto]  py-3">High Quality is our first priority</p>
                <p className="font-[Roboto]  ">
                Copyrights 2021 &copy; <span className="titles">Ecommerce</span> 
                </p>
            </div>
            <div className="flex flex-col justify-center items-center">
                <h4 className="text-[25px] font-[Roboto] underline py-4">Follow Us</h4>
                <NavLink>
                    Instagram
                </NavLink>
                <NavLink>
                    Facebook
                </NavLink>
                <NavLink>
                    Whatsapp
                </NavLink>
            </div>
        </div>
    );
};

export default Footer;
