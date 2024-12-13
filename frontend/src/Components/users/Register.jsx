import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser, reset } from '../../redux/slice/userSlicer';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast  from 'react-hot-toast';
import { MdOutlineEmail } from "react-icons/md";
import { CiUnlock } from "react-icons/ci";
import { MdOutlineSentimentSatisfied } from "react-icons/md";
import Loader from '../Loader/Loader'

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [isLogin, setIsLogin] = useState(true);
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    });
    const { name, email, password } = user;
    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState("/images/Profile.png");

    const { isAuthenticated, error, status } = useSelector((state) => state.user);
    // console.log(users);
    // console.log(error);

    const redirect = new URLSearchParams(location.search).get("redirect") || "/account";


    const loginSubmit = (e) => {
        e.preventDefault();
        console.log(loginEmail, loginPassword + 'kdsjks');

        dispatch(loginUser({ email: loginEmail, password: loginPassword }));

        // console.log(users);

    };

    const registerSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);
        myForm.set("avatar", avatar);

        // Dispatch register action
        dispatch(registerUser(myForm))
            .then(() => {
                dispatch(loginUser({ email, password }));
            })
            .catch((error) => {
                // Handle errors if needed
                toast.error(error?.message || "Registration failed");
            });
    };


    const registerDataChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        } else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    };

    useEffect(() => {
        if (error) {
            // Check if error is an object, and access the message property
            if (error) {
                toast.error(error?.message || error || "An error occurred");
                // console.log(error);

            }
            dispatch(reset());

        }

        if (isAuthenticated) {
            // toast.success("Registration Successful!");
            navigate(redirect); // Redirect user to dashboard or home
        }
        dispatch(reset());
    }, [dispatch, isAuthenticated, navigate,error,redirect]);


    if (status === 'loading') {
        return <Loader />;
    }



    return (
        <div>
            <div className="fixed top-[69px] left-0 right-0 bottom-0 flex justify-center items-center bg-[rgb(231,231,231)]">
                <div className="bg-white w-full sm:w-[80vw] md:w-[40vw] py-3 h-[80vh] box-border overflow-hidden">
                    <div>
                        <div className="flex justify-between text-[rgba(0,0,0,0.678)] font-[Roboto] cursor-pointer">
                            <p
                                className="grid place-items-center w-[48%] text-center sm:text-[14px] md:text-[16px] hover:text-[tomato]"
                                onClick={() => setIsLogin(true)}
                            >
                                LOGIN
                            </p>
                            <p
                                className="grid place-items-center w-[48%] text-center sm:text-[14px] md:text-[16px] hover:text-[tomato]"
                                onClick={() => setIsLogin(false)}
                            >
                                REGISTER
                            </p>
                        </div>
                        <button
                            className="bg-[tomato] h-[3px] w-1/2 border-none"
                            style={{
                                transform: isLogin ? "translateX(0)" : "translateX(100%)",
                                transition: "transform 0.3s ease",
                            }}
                        ></button>
                    </div>

                    {/* Login Form */}
                    {isLogin && (
                        <form
                            className="flex flex-col items-center m-auto p-[2vmax] justify-evenly h-[70%]"
                            onSubmit={loginSubmit}
                        >
                            <div className="flex w-full md:py-4 p-0 items-center">
                                <MdOutlineEmail className="absolute translate-x-[1vmax] text-[1.6vmax] text-[rgba(0,0,0,0.623)]" />
                                <input
                                    className="px-[4vmax] py-[1vmax] pr-[1vmax] w-full box-border border border-[rgba(0,0,0,0.267)] font-[cursive] text-[15px] outline-none"
                                    type="email"
                                    placeholder="Email"
                                    required
                                    value={loginEmail}
                                    onChange={(e) => setLoginEmail(e.target.value)}
                                    autoComplete="email"

                                />
                            </div>
                            <div className='text-red-500'>{error?.message}</div>

                            <div className="flex w-full md:py-4 p-0 items-center">
                                <CiUnlock className="absolute translate-x-[1vmax] text-[1.6vmax] text-[rgba(0,0,0,0.623)]" />
                                <input
                                    className="px-[4vmax] py-[1vmax] pr-[1vmax] w-full box-border border border-[rgba(0,0,0,0.267)] font-[cursive] text-[15px] outline-none"
                                    type="password"
                                    placeholder="Password"
                                    value={loginPassword}
                                    required
                                    onChange={(e) => setLoginPassword(e.target.value)}
                                    autoComplete="current-password"
                                />
                            </div>
                            <div className='text-red-500'>{error?.message}</div>

                            <Link
                                className="text-[rgba(0,0,0,0.651)] self-end font-[Gill Sans] hover:text-[black] duration-300 p-0 md:py-3"
                                to={"/password/forgot"}
                            >
                                Forget Password ?
                            </Link>
                            <div className="w-full p-0 md:py-4">
                                <input
                                    className="border-none bg-[tomato] text-white w-full font-[Roboto] p-[0.8vmax] cursor-pointer duration-300 rounded-lg outline-none shadow-[0_0_5px_rgba(0,0,0,0.226)] hover:bg-[rgb(179,66,46)]"
                                    type="submit"
                                    value={"Login"}
                                />
                            </div>
                        </form>
                    )}

                    {/* Register Form */}
                    {!isLogin && (
                        <form
                            className="flex flex-col items-center m-auto p-[2vmax] justify-evenly h-[70%]"
                            encType="multipart/form-data"
                            onSubmit={registerSubmit}
                        >
                            <div className="flex w-full py-3 items-center">
                                <MdOutlineSentimentSatisfied className="absolute translate-x-[1vmax] text-[1.6vmax] text-[rgba(0,0,0,0.623)]" />
                                <input
                                    className="px-[4vmax] py-[1vmax] pr-[1vmax] w-full box-border border border-[rgba(0,0,0,0.267)] font-[cursive] text-[15px] outline-none"
                                    type="text"
                                    placeholder="Name"
                                    required
                                    name="name"
                                    value={name}
                                    onChange={registerDataChange}
                                />
                            </div>
                            <div className='text-red-500'>{error?.errors?.name}</div>
                            <div className="flex w-full py-3 items-center">
                                <MdOutlineEmail className="absolute translate-x-[1vmax] text-[1.6vmax] text-[rgba(0,0,0,0.623)]" />
                                <input
                                    className="px-[4vmax] py-[1vmax] pr-[1vmax] w-full box-border border border-[rgba(0,0,0,0.267)] font-[cursive] text-[15px] outline-none"
                                    type="email"
                                    placeholder="Email"
                                    required
                                    name="email"
                                    value={email}
                                    onChange={registerDataChange}
                                />
                            </div>
                            <div className='text-red-500'>{error?.errors?.email}</div>

                            <div className="flex w-full py-3 items-center">
                                <CiUnlock className="absolute translate-x-[1vmax] text-[1.6vmax] text-[rgba(0,0,0,0.623)]" />
                                <input
                                    className="px-[4vmax] py-[1vmax] pr-[1vmax] w-full box-border border border-[rgba(0,0,0,0.267)] font-[cursive] text-[15px] outline-none"
                                    type="password"
                                    placeholder="Password"
                                    required
                                    name="password"
                                    value={password}
                                    onChange={registerDataChange}
                                />
                            </div>
                            <div className='text-red-500'>{error?.errors?.password}</div>

                            <div id="registerImage" className="flex w-full py-3 items-center gap-2 justify-center">
                                <img className="w-[3vmax] rounded-[100%]" src={avatarPreview} alt="Avatar" />
                                <label htmlFor="avatar" className="file-label">
                                    <input
                                        type="file"
                                        id="avatar"
                                        name="avatar"
                                        accept="image/*"
                                        onChange={registerDataChange}
                                        className="hidden "

                                    />
                                    <span className="file-button text-[14px] sm:text-[16px] border  block px-4 py-2">Choose Avatar</span>
                                </label>
                            </div>

                            <div className="w-full py-3">
                                <input
                                    className="border-none bg-[tomato] text-white w-full font-[Roboto] p-[0.8vmax] cursor-pointer duration-300 rounded-lg outline-none shadow-[0_0_5px_rgba(0,0,0,0.226)] hover:bg-[rgb(179,66,46)]"
                                    type="submit"
                                    value={"Register"}
                                />
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};



export default Register;
