import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserRole, reset, singleUser, GetAllUser } from '../../redux/slice/userSlicer';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { MdOutlineEmail, MdOutlineSentimentSatisfied } from "react-icons/md";
import Loader from '../Loader/Loader';
import { Sidebardashboard } from './Sidebardashboard';

const UpdateUserRoles = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const { error, status } = useSelector((state) => state.user);
    const user = useSelector((state) => state.user.singleUsers?.users);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');

    // Form submission handler
    const updateRoleSubmit = (e) => {
        e.preventDefault();
        const formData = { name, email, role }; // Include `id` for the correct user update
        dispatch(updateUserRole({ id, formData }));
        if (status === 'succeeded') {
            toast.success('Role updated successfully!');
            navigate('/admin/users');
            dispatch(GetAllUser())
        }
    };

    // Fetch single user details on component load
    useEffect(() => {
        dispatch(singleUser(id));
    }, [dispatch, id]);

    // Populate form fields once user data is available
    useEffect(() => {
        if (user) {
            setName(user.name || '');
            setEmail(user.email || '');
            setRole(user.role || '');
        }

        if (error) {
            toast.error(error);
            dispatch(reset());
        }
    }, [user, error, dispatch]);

    // // Handle loading and success states
    // useEffect(() => {
    //     if (status === 'succeeded') {
    //         toast.success('Role updated successfully!');
    //         navigate('/admin/users');
    //         dispatch(reset());
    //     }
    // }, [status, navigate, dispatch]);

    if (status === 'loading') {
        return <Loader />;
    }

    return (
        <section className="bg-white py-8 md:py-16">
            <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
                <Sidebardashboard />

                <div className="flex justify-center w-full items-center">
                    <div className="bg-white w-full sm:w-[80vw] md:w-[40vw] py-3 h-[80vh] box-border overflow-hidden">
                        <div>
                            <p className="text-center text-[rgba(0,0,0,0.678)] font-[Roboto] text-lg">
                                UPDATE USER ROLE
                            </p>
                        </div>

                        {/* Update Role Form */}
                        <form
                            className="flex flex-col items-center m-auto p-[2vmax] justify-evenly h-[70%]"
                            onSubmit={updateRoleSubmit}
                        >
                            <div className="flex w-full py-3 items-center">
                                <MdOutlineSentimentSatisfied className="absolute translate-x-[1vmax] text-[1.6vmax] text-[rgba(0,0,0,0.623)]" />
                                <input
                                    className="px-[4vmax] py-[1vmax] pr-[1vmax] w-full box-border border border-[rgba(0,0,0,0.267)] font-[cursive] text-[15px] outline-none"
                                    type="text"
                                    placeholder="Name"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="flex w-full py-3 items-center">
                                <MdOutlineEmail className="absolute translate-x-[1vmax] text-[1.6vmax] text-[rgba(0,0,0,0.623)]" />
                                <input
                                    className="px-[4vmax] py-[1vmax] pr-[1vmax] w-full box-border border border-[rgba(0,0,0,0.267)] font-[cursive] text-[15px] outline-none"
                                    type="email"
                                    placeholder="Email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="flex w-full py-3 items-center">
                                <select
                                    className="px-[4vmax] py-[1vmax] pr-[1vmax] w-full box-border border border-[rgba(0,0,0,0.267)] font-[cursive] text-[15px] outline-none"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    required
                                >
                                    <option value="" disabled>
                                        Select Role
                                    </option>
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>

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
            </div>
        </section>
    );
};

export default UpdateUserRoles;
