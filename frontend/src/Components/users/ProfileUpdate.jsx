import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MeProfile, profileUpdate, reset } from '../../redux/slice/userSlicer';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { MdOutlineEmail, MdOutlineSentimentSatisfied } from "react-icons/md";
import Loader from '../Loader/Loader';

const ProfileUpdate = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { users, error, status } = useSelector((state) => state.user);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("/images/Profile.png");

    const updateProfileSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);
        formData.append('avatar', avatar); // Make sure `avatarFile` is a File object
        
        dispatch(profileUpdate(formData));
    };

    const updateProfileDataChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatar(file); // Store File object for FormData

            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result); // Preview the avatar
                }
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        if (users) {
            setName(users.user.name);
            setEmail(users.user.email);
            setAvatarPreview(users.user.avatar?.url || "/images/Profile.png");
        }

        if (error) {
            toast.error(error);
            dispatch(reset());
        }

        if (status === 'succeeded') {
            toast.success("Profile updated successfully!");
            dispatch(MeProfile());
            navigate('/account');
        }
    }, [users, error, status, dispatch, navigate]);

    if (status === 'loading') {
        return <Loader />;
    }

    return (
        <div className="fixed top-[69px] left-0 right-0 bottom-0 flex justify-center items-center bg-[rgb(231,231,231)]">
            <div className="bg-white w-full sm:w-[80vw] md:w-[40vw] py-3 h-[80vh] box-border overflow-hidden">
                <div>
                    <div className="flex justify-between text-[rgba(0,0,0,0.678)] font-[Roboto] cursor-pointer">
                        <p className="grid place-items-center w-[48%] text-center sm:text-[14px] md:text-[16px] hover:text-[tomato]">UPDATE PROFILE</p>
                    </div>
                </div>

                <form
                    className="flex flex-col items-center m-auto p-[2vmax] justify-evenly h-[70%]"
                    onSubmit={updateProfileSubmit}
                  enctype="multipart/form-data"
                >
                    {/* Name Input */}
                    <div className="flex w-full py-3 items-center">
                        <MdOutlineSentimentSatisfied className="absolute translate-x-[1vmax] text-[1.6vmax] text-[rgba(0,0,0,0.623)]" />
                        <input
                            className="px-[4vmax] py-[1vmax] pr-[1vmax] w-full box-border border border-[rgba(0,0,0,0.267)] font-[cursive] text-[15px] outline-none"
                            type="text"
                            placeholder="Name"
                            required
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    {/* Email Input */}
                    <div className="flex w-full py-3 items-center">
                        <MdOutlineEmail className="absolute translate-x-[1vmax] text-[1.6vmax] text-[rgba(0,0,0,0.623)]" />
                        <input
                            className="px-[4vmax] py-[1vmax] pr-[1vmax] w-full box-border border border-[rgba(0,0,0,0.267)] font-[cursive] text-[15px] outline-none"
                            type="email"
                            placeholder="Email"
                            required
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {/* Avatar Upload */}
                    <div id="registerImage" className="flex w-full py-3 items-center gap-2 justify-center">
                        <img
                            className="w-[3vmax] rounded-[100%]"
                            src={avatarPreview}
                            alt="Avatar"
                        />
                        <label htmlFor="avatar" className="file-label">
                            <input
                                type="file"
                                id="avatar"
                                name="avatar"
                                accept="image/*"
                                onChange={updateProfileDataChange}
                                className="hidden"
                            />
                            <span className="file-button text-[14px] sm:text-[16px] border block px-4 py-2">Choose Avatar</span>
                        </label>
                    </div>

                    {/* Submit Button */}
                    <div className="w-full py-3">
                        <input
                            className="border-none bg-[tomato] text-white w-full font-[Roboto] p-[0.8vmax] cursor-pointer duration-300 rounded-lg outline-none shadow-[0_0_5px_rgba(0,0,0,0.226)] hover:bg-[rgb(179,66,46)]"
                            type="submit"
                            value="Update"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfileUpdate;