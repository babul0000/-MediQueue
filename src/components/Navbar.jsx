"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();


    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Tutors', href: '/tutor' },
        { name: 'Add Tutors', href: '/add-tutor' },
        { name: 'My Tutors', href: '/my-tutors' },
        { name: 'My Booked Session', href: '/booked-session' },
        { name: 'Register', href: '/register' },
        { name: 'Login', href: '/login' },
    ];

    return (
        <nav className='bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100 transition-all'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex justify-between items-center h-20'>
                    

                    <div className='flex-shrink-0'>
                        <Link href='/' className="text-[#0D9488] font-bold text-xl tracking-wide cursor-pointer">
                            Tutors-Finder
                        </Link>
                    </div>


                    <div className='hidden md:flex items-center space-x-8 h-full'>
                        {navLinks.map((link) => {

                            const isActive = pathname === link.href;

                            return (
                                <Link 
                                    key={link.href} 
                                    href={link.href}
                                    className={`h-full flex items-center text-sm font-semibold transition-all duration-200 border-b-2 pb-1 pt-1
                                        ${isActive 
                                            ? 'text-[#0D9488] border-[#0D9488]'
                                            : 'text-gray-600 border-transparent hover:text-[#0D9488]'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
                    </div>


                    <div className='hidden md:flex items-center'>
                        <button className="bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold py-2 px-4 rounded border border-slate-200 transition-all shadow-sm">
                            Logout
                        </button>
                    </div>


                    <div className='md:hidden flex items-center'>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className='text-gray-700 hover:text-[#0D9488] p-2 focus:outline-none transition-colors'
                        >
                            {isOpen ? <FiX size={26} /> : <FiMenu size={26} />}
                        </button>
                    </div>

                </div>
            </div>


            <div className={`md:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-100 shadow-lg transform transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible pointer-events-none'}`}>
                <div className='px-4 pt-4 pb-6 space-y-3 bg-gray-50/50'>
                    
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className={`block px-3 py-2.5 rounded-xl font-semibold text-base transition-all
                                    ${isActive 
                                        ? 'text-[#0D9488] bg-teal-50/50 pl-4 border-l-4 border-[#0D9488]' 
                                        : 'text-gray-700 hover:text-[#0D9488] hover:bg-gray-100/50'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                    
                    <hr className="border-gray-200 my-2" />

                    <div className="px-3 pt-2">
                        <button className="w-full bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold py-2.5 px-4 rounded-xl border border-slate-200 text-center text-sm shadow-sm transition-all">
                            Logout
                        </button>
                    </div>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;