import React, { useContext, useState } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Avatar,
    AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { LuUser } from "react-icons/lu";
import { CgLogOut } from "react-icons/cg";
import { FaHome } from "react-icons/fa";
import { BsBrowserEdge } from "react-icons/bs";
import { MdOutlineWork } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import context from '@/context/AppContext';
import toast from 'react-hot-toast';
import axios from 'axios';
import { API_END_POINT } from '@/utils/constant';

const Navbar = () => {
    const { user, setUser } = useContext(context);
    const navigate = useNavigate();
    const [active, setActive] = useState('/');

    const handleLogout = async () => {
        try {
            const res = await axios.get(`${API_END_POINT}/user/logout`, { withCredentials: true });
            if (res.data.success) {
                setUser(null);
                toast.success(res.data.message);
                navigate('/');
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    };

    const menuItems = user && user.role === 'recruiter'
        ? [
            { name: 'Companies', path: '/admin/company', icon: <MdOutlineWork size={22} /> },
            { name: 'Jobs', path: '/admin/job', icon: <BsBrowserEdge size={22} /> }
        ]
        : [
            { name: 'Home', path: '/', icon: <FaHome size={22} /> },
            { name: 'Jobs', path: '/jobs', icon: <MdOutlineWork size={22} /> },
            { name: 'Browse', path: '/browse', icon: <BsBrowserEdge size={22} /> }
        ];

    return (
        <div className='bg-white sticky top-0 z-50'>
            <nav className='flex justify-between items-center max-w-7xl mx-auto h-16 px-5 md:px-10 lg:px-0'>
                <div>
                    <h1 className='text-3xl font-bold'>
                        Job<span className='text-orange-500'>Portal</span>
                    </h1>
                </div>
                <div className='flex items-center gap-5 md:gap-10'>
                    {/* Desktop Menu */}
                    <ul className='hidden md:flex font-medium items-center gap-5'>
                        {menuItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`font-bold hover:underline underline-offset-2 transition-all ${active === item.path ? 'text-orange-500' : 'text-gray-800 hover:text-orange-500'}`}
                                onClick={() => setActive(item.path)}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </ul>

                    {/* Auth Buttons or Profile */}
                    {!user ? (
                        <div className='space-x-3'>
                            <Link to={'/login'}>
                                <Button className='cursor-pointer' variant="outline">Log In</Button>
                            </Link>
                            <Link to={'/signup'}>
                                <Button className='cursor-pointer bg-orange-400 hover:bg-orange-500'>Sign Up</Button>
                            </Link>
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className='cursor-pointer'>
                                    <AvatarImage src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"} alt="@user" />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className='w-72'>
                                <div className='flex gap-5 space-y-2'>
                                    <Avatar className='cursor-pointer w-12 h-12'>
                                        <AvatarImage src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"} alt="@user" />
                                    </Avatar>
                                    <div>
                                        <h2 className='text-xl'>{user.fullName}</h2>
                                        <p className='text-sm text-muted-foreground'>{user?.email}</p>
                                    </div>
                                </div>
                                <div className='flex items-center mt-2'>
                                    <LuUser size={23} />
                                    <Link to={'/profile'}>
                                        <Button variant="link">View Profile</Button>
                                    </Link>
                                </div>
                                <div className='flex items-center ml-1'>
                                    <CgLogOut size={23} />
                                    <Button onClick={handleLogout} variant="link">Log Out</Button>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>
            </nav>

            {/* ✅ Mobile Menu */}
            <div className="fixed bottom-0 w-full border-t shadow-md bg-white md:hidden">
                <ul className="flex items-center justify-around py-2">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex flex-col items-center gap-1 ${active === item.path ? 'text-orange-500' : 'text-gray-600 hover:text-orange-500'} transition`}
                            onClick={() => setActive(item.path)}
                        >
                            {item.icon}
                            <span className="text-xs">{item.name}</span>
                        </Link>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
