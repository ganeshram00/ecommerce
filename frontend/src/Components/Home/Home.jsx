import React, { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { CgMouse } from "react-icons/cg";
import ProductCard from "./ProductCard";
import { fetchProducts } from "../../redux/slice/productSlicer";
import { useDispatch } from "react-redux";


const Home = () => {
    const productSectionRef = useRef(null);
    const dispatch = useDispatch()

    const scrollToProducts = () => {
        productSectionRef.current.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    return (
        <div className="border-none outline-none ">
            <div style={{backgroundImage:"URL(/images/cover.png)" ,backgroundRepeat:"no-repeat" ,backgroundSize:"cover"}} className="home relative   h-[88vmin] text-center flex items-center justify-center flex-col text-white">
                <h1 className="py-2 font-[Roboto]">Welcome to Ecommerce</h1>
                <p className="md:text-[26px] font-[Lucida Sans] py-6">FIND AMAZING PRODUCTS BELOW</p>
                <button onClick={scrollToProducts} className="flex items-center justify-center border border-black p-2 px-5 bg-white hover:bg-[rgba(255,255,255,0)] duration-500 hover:text-white hover:border-white text-black">
                    <span className="text-[13px]">Scroll</span> <CgMouse />
                </button>
            </div>
            <h2 ref={productSectionRef} className="text-center mx-auto my-[5vmax] text-[rgb(0,0,0,0.7)] w-[auto] py-2 text-[22px] font-[Roboto] ">
                Featured Products
                <hr className='w-[200px] m-auto border-2' />
            </h2>


            <div className="py-5">
                <ProductCard />
            </div>
        </div>
    );
};

export default Home;
