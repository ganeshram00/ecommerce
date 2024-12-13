import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword, reset } from '../../redux/slice/userSlicer';
import Loader from '../Loader/Loader';
import toast from 'react-hot-toast';
import {  useNavigate } from 'react-router-dom';
import { MdEmail } from 'react-icons/md';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const { status, error,users } = useSelector((state) => state.user)

    const navigate = useNavigate();
    const dispatch = useDispatch()


    const updateProfileSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("email", email);
        console.log(myForm);
        dispatch(forgotPassword(myForm))

        if (status === 'succeeded') {
            toast.success(users?.user?.message)
            // dispatch(reset())
            // navigate('/account')

           }

    };
    if (status === 'loading') {
        return <Loader />;
    }

    if (status === 'failed') {
        toast.error(error.password || error);
        console.log(error);
        dispatch(reset())

    }
    console.log(users);
    
    if (status === 'succeeded') {
        toast.success(users?.message)
        dispatch(reset())
        // navigate('/account')

       }


    return (
        <div className="fixed top-[69px] left-0 right-0 bottom-0 flex justify-center items-center bg-[rgb(231,231,231)]">

            <div className="bg-white w-full sm:w-[80vw] md:w-[40vw] py-3 h-[80vh] box-border overflow-hidden">

                <div className="flex justify-center my-2 text-[rgba(0,0,0,0.678)] font-[Roboto] w-full cursor-pointer">
                    <p className=" text-center sm:text-[14px] md:text-[16px] hover:text-[tomato] underline">Forgot PASSWORD</p>
                </div>
                <form className="flex flex-col items-center m-auto p-[2vmax] justify-evenly h-[70%]" onSubmit={updateProfileSubmit}>
                    {/* Old Password */}
                    <div className="flex w-full py-3 items-center">
                        <MdEmail className="absolute translate-x-[1vmax] text-[1.6vmax] text-[rgba(0,0,0,0.623)]" />
                        <input
                            className="px-[4vmax] py-[1vmax] pr-[1vmax] w-full box-border border border-[rgba(0,0,0,0.267)] font-[cursive] text-[15px] outline-none"
                            type="email"
                            placeholder="Enter Your Email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div> 

                    {/* Submit Button */}
                    <div className="w-full py-3">
                        <input
                            className="border-none bg-[tomato] text-white w-full font-[Roboto] p-[0.8vmax] cursor-pointer duration-300 rounded-lg outline-none shadow-[0_0_5px_rgba(0,0,0,0.226)] hover:bg-[rgb(179,66,46)]"
                            type="submit"
                            value={"Forgot Password"}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
