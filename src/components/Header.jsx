import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaUser } from "react-icons/fa";

import { CiMenuBurger } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { useAuth } from '../context/AuthContext';


const Header = () => {


    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const { isLoggedIn, profile, logout} = useAuth()
    // console.log("user profile", profile)

    const avatar_url = null;
    // "https://images.unsplash.com/photo-1631094237046-01a50d3d9a98?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

    return (
        <header className='bg-white shadow'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                {/* left and right hamburger*/}
                <div className='flex justify-between h-16'>
                    {/* left */}

                    <div className='flex'>
                        {/* logo */}
                        <div className='flex-shrink-0 flex items-center'>
                            <Link to='/' className='text-2xl font-bold text-orange-600'>Blogify</Link>
                        </div>

                        {/* nav */}

                        <nav className='hidden sm:ml-6 sm:flex sm:space-x-8'>
                            <Link to='/' className='inline-flex items-center px-1 pt-1 border-b-2 border-orange-500 text-sm font-medium text-gray-900'>Home</Link>

                            <Link to='/articles' className='inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-900'>Articles</Link>

                            {isLoggedIn && (

                                <>
                                    <Link to='/editor' className='inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-900'>Write</Link>

                                    <Link to='/articles' className='inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-900'>Articles</Link>

                                    <Link to='/manage-articles' className='inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-900'>My Articles</Link>
                                </>
                            )
                            }
                        </nav>
                    </div>

                    {/* right */}

                    <div className='flex items-center space-x-4'>
                        {/* profile */}

                        {isLoggedIn ? (
                            <>
                                <div className='text-sm text-gray-700'>
                                    <span>Hello , {profile?.username}</span>
                                </div>

                                <div className='relative'>
                                    <button className='flex items-center justify-center h-8 w-8 rounded-full bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500'
                                        onMouseEnter={() => setIsDropdownOpen(true)}
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    >
                                        {
                                            avatar_url ? <img className='w-8 h-8 rounded-full' src={avatar_url} /> : <FaUser className='text-gray-600' />
                                        }
                                    </button>

                                    {/* dropdown menu */}
                                    {isDropdownOpen && (
                                        <div
                                            className='absolute right-0 w-48 bg-white mt-1 rounded-md shadow-lg z-50'
                                            onMouseLeave={() => setIsDropdownOpen(false)}
                                        >
                                            <div className='absolute h-3 w-full top-[12px] '></div>
                                            <Link to="/profile" className='block px-4 py-2 text-sm text-gray700 hover:bg-gray-100'>Your Profile</Link>
                                            <Link to="/manage-articles" className='block px-4 py-2 text-sm text-gray700 hover:bg-gray-100'>Manage Articles</Link>

                                            <button
                                                onClick={() => logout()}
                                                className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>Signout</button>

                                        </div>
                                    )}
                                </div>
                            </>
                        ) :
                            /* buttons */
                            (
                                <div className='flex items-center space-x-4'>
                                    <Link to="/signin" className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                                        Sign In
                                    </Link>
                                    <Link to="/signup" className="hidden sm:inline-flex items-center justify-center px-4 py-2 border text-sm font-medium rounded-md text-orange-600 bg-white border-orange-600 hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                                        Sign Up
                                    </Link>
                                </div>
                            )}
                    </div>

                    {/* Hamburger */}

                    <div className='-mr-2 flex items-center sm:hidden'>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className='inline-flex items-center justify-center p-2 rounded-md text-gray-400'

                        >
                            {isMenuOpen ? <IoMdClose className='block w-6 h-6' /> : <CiMenuBurger className='block w-6 h-6' />}

                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}

            {isMenuOpen && (<div className='sm:hidden py-4'>
                <div className='pt-2 pb-3 space-y-1'>
                    <Link to="/" className="block pl-3 pr-4 py-2 border-l-4 border-orange-500 text-base font-medium text-orange-700 bg-orange-50">
                        Home
                    </Link>
                    <Link to="/articles" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800">
                        Articles
                    </Link>
                </div>


                {/* if is logged in */}

                {isLoggedIn && (
                    <>
                        <Link to="/editor" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800">
                            Write
                        </Link>
                        <Link to="/manage-articles" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800">
                            My Articles
                        </Link>
                        <Link to="/profile" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800">
                            Profile
                        </Link>
                        <button
                            onClick={() => logout() }
                            

                            className="block w-full text-left pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                        >
                            Sign Out
                        </button>
                    </>
                )}


                {/* if is not logged in */}

                {!isLoggedIn && (
                    <>
                        <Link to="/signin" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800">
                            Sign In
                        </Link>
                        <Link to="/signup" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800">
                            Sign Up
                        </Link>
                    </>
                )}

            </div>
            )}
        </header>
    )
}

export default Header