import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { BiLogOut } from 'react-icons/bi'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { GiHamburgerMenu } from 'react-icons/gi'
import { setUserData } from '@/Utils/UserSlice'
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai'

export default function NavBar() {
    const dispatch = useDispatch()
    const router = useRouter()
    const user = useSelector(state => state.User.userData)
    
    const [openJobs, setOpenJobs] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, isScrolled] = useState(false)

    useEffect(() => {
        const userData = localStorage.getItem('user')
        dispatch(setUserData(userData ? JSON.parse(userData) : null))
    }, [dispatch])


    const useOutsideClick = (callback) => {
        const ref = React.useRef()

        React.useEffect(() => {
            const handleClick = (event) => {
                if (ref.current && !ref.current.contains(event.target)) {
                    callback()
                }
            }

            document.addEventListener('click', handleClick, true)
            return () => document.removeEventListener('click', handleClick, true)
        }, [ref])

        return ref
    }

    useEffect(() => {
        const handleScroll = () => {
            isScrolled(window.scrollY > 20)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleLogout = async () => {
        Cookies.remove('token')
        localStorage.removeItem('user')
        router.reload()
    }

    const handleClickOutside = () => setIsOpen(false)
    const ref = useOutsideClick(handleClickOutside)

    return (
        <>
            <div className={`w-full ${scrolled ? "bg-indigo-600/95 backdrop-blur-md shadow-lg" : "bg-indigo-600"} px-6 h-20 text-white flex items-center justify-between fixed top-0 left-0 z-50 transition-all duration-300`}>
                <Link href={'/'} className='px-2 h-full flex items-center justify-center cursor-pointer group'>
                    <p className='uppercase font-bold tracking-[0.3em] text-2xl transition-all duration-300 group-hover:scale-110 group-hover:text-indigo-200'>QUEVO</p>
                </Link>
                <div className='px-2 h-full hidden items-center justify-center lg:flex gap-2'>
                    <Link href={'/'} className="relative px-4 py-2 mx-2 text-sm font-semibold uppercase tracking-wider transition-all duration-300 hover:text-indigo-200 group">
                        Home
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                    <Link href={'/frontend/postAJob'} className="relative px-4 py-2 mx-2 text-sm font-semibold uppercase tracking-wider transition-all duration-300 hover:text-indigo-200 group">
                        Post Profile
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                    <Link href={'/frontend/displayJobs'} className="relative px-4 py-2 mx-2 text-sm font-semibold uppercase tracking-wider transition-all duration-300 hover:text-indigo-200 group">
                        View Talent
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                    <Link href={'/frontend/postedJob'} className="relative px-4 py-2 mx-2 text-sm font-semibold uppercase tracking-wider transition-all duration-300 hover:text-indigo-200 group">
                        My Profile
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                    <Link href={'/frontend/dashboard'} className="relative px-4 py-2 mx-2 text-sm font-semibold uppercase tracking-wider transition-all duration-300 hover:text-indigo-200 group">
                        Dashboard
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                </div>
                <div className='px-2 h-full hidden items-center justify-center lg:flex gap-3' >
                    {
                        user !== null ? (
                            <>
                                <BiLogOut onClick={handleLogout} className='cursor-pointer text-3xl hover:text-red-400 hover:scale-110 transition-all duration-300' />
                                <div className='flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg backdrop-blur-sm'>
                                    <div className='w-8 h-8 rounded-full bg-indigo-400 flex items-center justify-center text-sm font-bold'>
                                        {user?.name?.charAt(0).toUpperCase()}
                                    </div>
                                    <p className='text-base font-semibold'>{user?.name}</p>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link href={'/auth/login'} className='px-5 py-2.5 border-2 border-white rounded-lg uppercase tracking-wider text-sm font-semibold transition-all duration-300 hover:bg-white hover:text-indigo-600 hover:shadow-lg hover:scale-105'>
                                    Login
                                </Link>
                                <Link href={'/auth/register'} className='px-5 py-2.5 border-2 border-white rounded-lg uppercase tracking-wider text-sm font-semibold text-indigo-600 bg-white transition-all duration-300 hover:bg-transparent hover:text-white hover:shadow-lg hover:scale-105'>
                                    Register
                                </Link>
                            </>
                        )
                    }

                </div>

                <div className='flex lg:hidden  px-2 py-2 '>
                    <GiHamburgerMenu className='text-4xl' onClick={() => setIsOpen(state => !state)} />
                </div>

                {
                    isOpen && (
                        <div ref={ref} className='flex w-full py-2 animate-fade-in-down  bg-indigo-600 transition-all fade duration-1000 absolute top-20 left-0  items-center justify-center flex-col '>
                            <div className='px-2 h-full flex items-center justify-center flex-col py-2 '>
                                <Link href={'/'} onClick={() => setIsOpen(false)} className="px-3  m-4 text-base font-medium transition-all duration-700 hover:translate-y-2 uppercase" >Home</Link>
                                <button  onClick={() => setOpenJobs(state => !state)} className="px-3  m-4 text-base font-medium transition-all duration-700 hover:translate-y-2 uppercase flex items-center justify-center" >Jobs {openJobs ? <AiFillCaretUp/>  : <AiFillCaretDown />} </button>

                                {
                                    openJobs &&
                                    <>
                                        <Link href={'/frontend/displayJobs'} onClick={() => setIsOpen(false)} className="px-3 m-4 text-base font-medium transition-all duration-700 hover:translate-y-2 uppercase" >View Jobs</Link>
                                        <Link href={'/frontend/postAJob'} onClick={() => setIsOpen(false)} className="px-3 m-4 text-base font-medium transition-all duration-700 hover:translate-y-2 uppercase" >Post Jobs</Link>
                                        <Link href={'/frontend/postedJob'} onClick={() => setIsOpen(false)} className="px-3 m-4 text-base font-medium transition-all duration-700 hover:translate-y-2 uppercase" >Posted Jobs</Link>
                                    </>
                                }
                                <Link href={'/frontend/dashboard'} onClick={() => setIsOpen(false)} className="px-3 m-4 text-base font-medium transition-all duration-700 hover:translate-y-2 uppercase" >Dashboard</Link>
                                <Link href={'/'} onClick={() => setIsOpen(false)} className="px-3 m-4 text-base font-medium transition-all duration-700 hover:translate-y-2 uppercase" >Contact</Link>
                            </div>
                            <div className='px-2 h-full  items-center justify-center flex' >
                                {
                                    user !== null ? (
                                        <>

                                            <BiLogOut onClick={handleLogout} className=' cursor-pointer text-3xl hover:text-red-500 transition-all duration-700' />
                                            <p className='text-lg px-4 font-semibold'>{user?.name}</p>
                                        </>
                                    ) : (
                                        <>
                                            <Link href={'/auth/login'} className='px-4 py-2 border border-white rounded uppercase tracking-widest mx-4   transition-all duration-700 hover:bg-white font-semibold text-base hover:text-indigo-600'>Login</Link>
                                            <Link href={'/auth/register'} className='px-4 py-2 border border-white rounded uppercase tracking-widest mx-4   text-indigo-600 bg-white transition-all duration-700 hover:bg-transparent font-semibold text-base hover:text-white'>REGISTER</Link>
                                        </>
                                    )
                                }

                            </div>
                        </div>
                    )
                }

            </div>
        </>
    )
}
