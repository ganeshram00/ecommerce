import React, { useState } from 'react';
import { CiLock, CiUnlock } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import { reset, resetPassword, updatePassword } from '../../redux/slice/userSlicer';
import Loader from '../Loader/Loader';
import toast from 'react-hot-toast';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { MdVpnKey } from 'react-icons/md';

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const { status, error } = useSelector((state) => state.user)

    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { token } = useParams()
    console.log('token', token);

    const updateProfileSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("password", password);
        myForm.set("confirmpassword", confirmpassword);
        console.log(myForm);
        dispatch(resetPassword({ token, myForm }))

       

    };

    if (status === 'succeeded') {
        toast.success("Password succefully Updated..")
        dispatch(reset())
        navigate('/Register')

    }
    if (status === 'loading') {
        return <Loader />;
    }

    if (status === 'failed') {
        toast.error(error.password || error);
        console.log(error);
        dispatch(reset())

    }


    return (
        <div className="fixed top-[69px] left-0 right-0 bottom-0 flex justify-center items-center bg-[rgb(231,231,231)]">

            <div className="bg-white w-full sm:w-[80vw] md:w-[40vw] py-3 h-[80vh] box-border overflow-hidden">

                <div className="flex justify-center my-2 text-[rgba(0,0,0,0.678)] font-[Roboto] w-full cursor-pointer">
                    <p className=" text-center sm:text-[14px] md:text-[16px] hover:text-[tomato] underline">RESET  PASSWORD</p>
                </div>
                <form className="flex flex-col items-center m-auto p-[2vmax] justify-evenly h-[70%]" onSubmit={updateProfileSubmit}>

                    {/* New Password */}
                    <div className="flex w-full py-3 items-center">
                        <CiUnlock className="absolute translate-x-[1vmax] text-[1.6vmax] text-[rgba(0,0,0,0.623)]" />
                        <input
                            className="px-[4vmax] py-[1vmax] pr-[1vmax] w-full box-border border border-[rgba(0,0,0,0.267)] font-[cursive] text-[15px] outline-none"
                            type="password"
                            placeholder=" Password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {/* Confirm New Password */}
                    <div className="flex w-full py-3 items-center">
                        <CiLock className="absolute translate-x-[1vmax] text-[1.6vmax] text-[rgba(0,0,0,0.623)]" />
                        <input
                            className="px-[4vmax] py-[1vmax] pr-[1vmax] w-full box-border border border-[rgba(0,0,0,0.267)] font-[cursive] text-[15px] outline-none"
                            type="password"
                            placeholder="Confirm New Password"
                            name="confirmPassword"
                            value={confirmpassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="w-full py-3">
                        <input
                            className="border-none bg-[tomato] text-white w-full font-[Roboto] p-[0.8vmax] cursor-pointer duration-300 rounded-lg outline-none shadow-[0_0_5px_rgba(0,0,0,0.226)] hover:bg-[rgb(179,66,46)]"
                            type="submit"
                            value={"Reset Password"}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
