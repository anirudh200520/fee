import NavBar from '@/components/NavBar'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { GoLocation } from 'react-icons/go'
import { MdCategory, MdEmail } from 'react-icons/md'
import { BsBriefcaseFill, BsFillBookmarkCheckFill } from 'react-icons/bs'
import { AiOutlineArrowRight, AiOutlineDollarCircle } from 'react-icons/ai'
import { RiUserSearchFill } from 'react-icons/ri'
import { BsFillCalendar2DateFill } from 'react-icons/bs'
import { HiOutlineStar } from 'react-icons/hi'
import { FaUserAstronaut } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { setMatchingJobDat } from '@/Utils/JobSlice'
import { get_specified_job } from '@/Services/job'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { InfinitySpin } from 'react-loader-spinner'
import useSWR from 'swr'
import { book_mark_job } from '@/Services/job/bookmark'



export default function JobDetails() {
    const router = useRouter()
    const dispatch = useDispatch();
    const { id } = router.query
    const JobData = useSelector(state => state?.Job?.JobData)
    const machingData = useSelector(state => state?.Job?.matchingData)
    const user = useSelector(state => state?.User?.userData)
    const [JobDetails, setJobDetails] = useState(null);


    const { data, error , isLoading } = useSWR(`/get-specified-job`, () => get_specified_job(id));


    useEffect(() => {
        if(data) setJobDetails(data?.data)
    }, [data])


    if(error) toast.error(error)


    useEffect(() => {
        if (JobDetails) {
            const filteredJobData = JobData?.filter((job) => job.job_category === JobDetails?.job_category)
            const filteredJobData2 = filteredJobData?.filter((job) => job._id !== JobDetails?._id)
            dispatch(setMatchingJobDat(filteredJobData2))
        }
    }, [JobDetails, JobData, dispatch])


    const handleApply = () => {
        if (!user) return toast.error('Please Login First');
        router.push(`/frontend/applyJob/${id}`)
    }


    const handleBookMark = async () =>  {

        if (!user) return toast.error('Please Login First');

        const data = {user : user?.id , job : JobDetails?.id}
        const res = await book_mark_job(data);
        if(res.success) {
           return toast.success(res.message)
        }
        else {
            return toast.error(res.message)
        }

    }

    return (
        <>
            {
                isLoading ? (
                    <div className='bg-gray w-full h-screen flex items-center flex-col justify-center'>
                        <InfinitySpin width='200' color="#4f46e5" />
                        <p className='text-xs uppercase'>Loading Resources Hold Tight...</p>
                    </div>
                ) : (
                    <>
                        <ToastContainer />
                        <NavBar />
                        <div className='w-full py-20 flex items-center justify-center bg-gray-50'>
                            <div className='max-w-7xl w-full px-4 md:px-8'>
                                {/* Header Section */}
                                <div className='w-full bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-lg p-8 mb-8'>
                                    <div className='flex items-center justify-between flex-wrap'>
                                        <div className='flex items-center mb-4 md:mb-0'>
                                            <Image src={"https://xsgames.co/randomusers/avatar.php?g=male"} alt="company-logo" className='rounded-lg border-4 border-white shadow-lg' width={100} height={100} />
                                            <div className='ml-6'>
                                                <h1 className='text-3xl font-bold text-white mb-2'>{JobDetails?.title}</h1>
                                                <p className='text-xl text-indigo-100'>{JobDetails?.company}</p>
                                            </div>
                                        </div>
                                        {
                                            JobDetails?.user?.email === user?.email ? (
                                                <p className='text-sm bg-red-100 text-red-600 px-4 py-2 rounded-lg'>Your Posted Job</p>
                                            ) : (
                                                <div className='flex items-center gap-3'>
                                                    <button onClick={handleBookMark} className='px-4 py-3 bg-white text-indigo-600 rounded-lg hover:bg-indigo-50 transition-all duration-300 flex items-center gap-2 shadow-lg'>
                                                        <BsFillBookmarkCheckFill className='text-xl'/>
                                                        <span className='font-semibold'>Save</span>
                                                    </button>
                                                    <button onClick={handleApply} className='px-6 py-3 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-500 transition-all duration-300 font-bold shadow-lg'>
                                                        Apply Now
                                                    </button>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>

                                {/* Main Content Grid */}
                                <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8'>
                                    {/* Left Column - Job Details */}
                                    <div className='lg:col-span-2 space-y-6'>
                                        {/* Job Description */}
                                        <div className='bg-white rounded-lg shadow-md p-6'>
                                            <h2 className='text-2xl font-bold text-gray-800 mb-4 border-b-2 border-indigo-600 pb-2'>Job Description</h2>
                                            <p className='text-gray-700 leading-relaxed whitespace-pre-line'>{JobDetails?.description}</p>
                                        </div>

                                        {/* Job Information Grid */}
                                        <div className='bg-white rounded-lg shadow-md p-6'>
                                            <h2 className='text-2xl font-bold text-gray-800 mb-4'>Job Information</h2>
                                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                                <div className='flex items-center p-3 bg-indigo-50 rounded-lg'>
                                                    <MdCategory className='text-2xl text-indigo-600 mr-3' />
                                                    <div>
                                                        <p className='text-xs text-gray-500 uppercase'>Category</p>
                                                        <p className='font-semibold text-gray-800'>{JobDetails?.job_category}</p>
                                                    </div>
                                                </div>
                                                <div className='flex items-center p-3 bg-indigo-50 rounded-lg'>
                                                    <BsBriefcaseFill className='text-2xl text-indigo-600 mr-3' />
                                                    <div>
                                                        <p className='text-xs text-gray-500 uppercase'>Job Type</p>
                                                        <p className='font-semibold text-gray-800'>{JobDetails?.job_type}</p>
                                                    </div>
                                                </div>
                                                <div className='flex items-center p-3 bg-green-50 rounded-lg'>
                                                    <AiOutlineDollarCircle className='text-2xl text-green-600 mr-3' />
                                                    <div>
                                                        <p className='text-xs text-gray-500 uppercase'>Salary</p>
                                                        <p className='font-semibold text-gray-800'>${JobDetails?.salary.toLocaleString()} / month</p>
                                                    </div>
                                                </div>
                                                <div className='flex items-center p-3 bg-indigo-50 rounded-lg'>
                                                    <HiOutlineStar className='text-2xl text-indigo-600 mr-3' />
                                                    <div>
                                                        <p className='text-xs text-gray-500 uppercase'>Experience</p>
                                                        <p className='font-semibold text-gray-800'>{JobDetails?.job_experience}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Column - Sidebar */}
                                    <div className='space-y-6'>
                                        {/* Job Summary Card */}
                                        <div className='bg-white rounded-lg shadow-md p-6 sticky top-24'>
                                            <h2 className='text-xl font-bold text-gray-800 mb-4'>Job Summary</h2>
                                            <div className='space-y-4'>
                                                <div className='border-l-4 border-indigo-600 pl-4'>
                                                    <div className='flex items-center mb-2'>
                                                        <RiUserSearchFill className='text-lg text-indigo-600 mr-2' />
                                                        <p className='text-sm text-gray-500'>Vacancies</p>
                                                    </div>
                                                    <p className='font-bold text-xl text-gray-800'>{JobDetails?.job_vacancy} Positions</p>
                                                </div>
                                                <div className='border-l-4 border-red-600 pl-4'>
                                                    <div className='flex items-center mb-2'>
                                                        <BsFillCalendar2DateFill className='text-lg text-red-600 mr-2' />
                                                        <p className='text-sm text-gray-500'>Deadline</p>
                                                    </div>
                                                    <p className='font-bold text-xl text-gray-800'>{new Date(`${JobDetails?.job_deadline}`).toLocaleDateString('en-GB')}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Posted By Card */}
                                        <div className='bg-white rounded-lg shadow-md p-6'>
                                            <h2 className='text-xl font-bold text-gray-800 mb-4'>Posted By</h2>
                                            <div className='space-y-3'>
                                                <div className='flex items-center'>
                                                    <FaUserAstronaut className='text-indigo-600 mr-3' />
                                                    <div>
                                                        <p className='text-xs text-gray-500'>Name</p>
                                                        <p className='font-semibold text-gray-800'>{JobDetails?.user?.name}</p>
                                                    </div>
                                                </div>
                                                <div className='flex items-center'>
                                                    <MdEmail className='text-indigo-600 mr-3' />
                                                    <div>
                                                        <p className='text-xs text-gray-500'>Email</p>
                                                        <p className='font-semibold text-gray-800 text-sm'>{JobDetails?.user?.email}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Related Jobs Section */}
                                <div className='bg-white rounded-lg shadow-md p-6'>
                                    <h2 className='text-2xl font-bold text-gray-800 mb-6'>Similar Jobs</h2>
                                    {
                                        machingData?.length === 0 ? (
                                            <div className='text-center py-12 bg-gray-50 rounded-lg'>
                                                <p className='text-gray-500'>No similar jobs available at the moment</p>
                                            </div>
                                        ) : (
                                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                                                {machingData?.map((item) => (
                                                    <div key={item?.id} className='bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-indigo-400'>
                                                        <div className='flex items-center mb-4'>
                                                            <Image width={60} height={60} className="rounded-lg" src={"https://xsgames.co/randomusers/avatar.php?g=male"} alt="company" />
                                                            <div className='ml-4 flex-1'>
                                                                <h3 className='font-bold text-lg text-gray-800 line-clamp-1'>{item?.title}</h3>
                                                                <p className='text-sm text-gray-600'>{item?.company}</p>
                                                            </div>
                                                        </div>
                                                        <div className='space-y-2 mb-4'>
                                                            <div className='flex items-center text-sm'>
                                                                <BsBriefcaseFill className='text-indigo-600 mr-2' />
                                                                <span className='text-gray-600'>{item?.job_type}</span>
                                                            </div>
                                                            <div className='flex items-center text-sm'>
                                                                <AiOutlineDollarCircle className='text-green-600 mr-2' />
                                                                <span className='text-gray-600 font-semibold'>${item?.salary.toLocaleString()}</span>
                                                            </div>
                                                            <div className='flex items-center text-sm'>
                                                                <BsFillCalendar2DateFill className='text-red-600 mr-2' />
                                                                <span className='text-gray-600'>{new Date(`${item?.job_deadline}`).toLocaleDateString('en-GB')}</span>
                                                            </div>
                                                        </div>
                                                        <button onClick={() => router.push(`/frontend/jobDetails/${item?.id}`)} className='w-full py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 font-semibold flex items-center justify-center gap-2'>
                                                            View Details
                                                            <AiOutlineArrowRight className='text-lg' />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </>
                )
            }

        </>
    )
}
