import NavBar from '@/components/NavBar'
import Select from 'react-select'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { post_job } from '@/Services/job';
import { useRouter } from 'next/router'


export default function PostAJob() {
    const user = useSelector(state => state.User.userData)
    const router = useRouter();

    const [formData, setFormData] = useState({ 
        user: "", 
        title: "", // Professional Title (e.g., "Senior React Developer")
        salary: 0, // Expected Salary
        email: "", 
        company: "", // Current/Last Company
        description: "", // Bio/About Me
        job_category: "", // Primary Skill Category
        job_type: "", // Availability (Full-time, Part-time, Contract, Freelance)
        job_experience: "", // Years of Experience
        job_vacancy: 0, // Portfolio/Projects Count
        job_deadline: "" // Available From Date
    });
    const [error, setError] = useState({ user: "", title: "", salary: "", email: "", company: "", description: "", job_category: "", job_type: "", job_experience: "", job_vacancy: "", job_deadline: "" });

    // Update formData when user data is loaded
    React.useEffect(() => {
        if (user?.id) {
            setFormData(prev => ({ ...prev, user: user.id }));
        }
    }, [user]);

    const handleSubmit = async (e) => {

        e.preventDefault();



        if (!formData.title) {
            setError({ ...error, title: "title Field is required" })
            return;
        }

        if (!formData.salary) {
            setError({ ...error, salary: "salary Field is required" })
            return;
        }

        if (!formData.email) {
            setError({ ...error, email: "Email Field is Required" })
            return;
        }


        if (!formData.company) {
            setError({ ...error, company: "company Field is required" })
            return;
        }
        if (!formData.description) {
            setError({ ...error, description: "description Field is required" })
            return;
        }
        if (!formData.job_category) {
            setError({ ...error, job_category: "job_category Field is required" })
            return;
        }
        if (!formData.job_type) {
            setError({ ...error, job_type: "job_type Field is required" })
            return;
        }
        if (!formData.job_experience) {
            setError({ ...error, job_experience: "job_experience Field is required" })
            return;
        }
        if (!formData.job_vacancy) {
            setError({ ...error, job_vacancy: "job_vacancy Field is required" })
            return;
        }
        if (!formData.job_deadline) {
            setError({ ...error, job_deadline: "job_deadline Field is required" })
            return;
        }

        if (!formData.user || formData.user === "") {
            return toast.error("Please Login First - User session not found");
        }

        console.log('Submitting job with user ID:', formData.user, typeof formData.user);

        const res = await post_job(formData);
        if (res.success) {
            toast.success(res.message);
            setTimeout(() => {
                router.push('/frontend/displayJobs')
            }, 1000)
        }
        else {
            toast.error(res.message);
        }
    }



    const options = [
        { value: 'fulltime', label: 'Full Time' },
        { value: 'parttime', label: 'Part Time' },
        { value: 'internship', label: 'Internship' },
        { value: 'contract', label: 'Contract' },
    ]






    return (
        <>
            <NavBar />
            <div className='w-full  py-20 flex items-center  justify-center flex-col'>
                <h1 className='text-xl mt-4 uppercase tracking-widest border-b-2 border-b-indigo-600 py-2 font-semibold mb-8 md:text-2xl lg:text-4xl'>Create Your Profile</h1>
                <form onSubmit={handleSubmit} className="sm:w-1/2 w-full px-4 mx-4  h-full" >
                    <div className='w-full mb-4  flex flex-col items-start justify-center'>
                        <label htmlFor="title" className='mb-1 text-base font-semibold'>Professional Title :</label>
                        <input onChange={(e) => setFormData({ ...formData, title: e.target.value })} type="text" id='title' className='w-full py-2 px-3 mb-2 border border-indigo-600 rounded' placeholder='e.g., Senior React Developer, Marketing Manager' />
                        {
                            error.title && <p className="text-sm text-red-500">{error.title}</p>
                        }
                    </div>
                    <div className='w-full mb-4  flex flex-col items-start justify-center'>
                        <label htmlFor="salary" className='mb-1 text-base font-semibold'>Expected Salary (per month) :</label>
                        <input onChange={(e) => setFormData({ ...formData, salary: e.target.value })} type="number" id='salary' className='w-full py-2 px-3 mb-2 border border-indigo-600 rounded' placeholder='Enter your expected salary' />
                        {
                            error.salary && <p className="text-sm text-red-500">{error.salary}</p>
                        }
                    </div>
                    <div className='w-full mb-4  flex flex-col items-start justify-center'>
                        <label htmlFor="email" className='mb-1 text-base font-semibold'>Contact Email :</label>
                        <input onChange={(e) => setFormData({ ...formData, email: e.target.value })} type="email" id='email' className='w-full py-2 px-3 mb-2 border border-indigo-600 rounded' placeholder='Your professional email address' />
                        {
                            error.email && <p className="text-sm text-red-500">{error.email}</p>
                        }
                    </div>
                    <div className='w-full mb-4  flex flex-col items-start justify-center'>
                        <label htmlFor="company" className='mb-1 text-base font-semibold'>Current/Last Company :</label>
                        <input onChange={(e) => setFormData({ ...formData, company: e.target.value })} type="text" id='company' className='w-full py-2 px-3 mb-2 border border-indigo-600 rounded' placeholder='Where you work or worked' />
                        {
                            error.company && <p className="text-sm text-red-500">{error.company}</p>
                        }
                    </div>
                    <div className='w-full mb-4  flex flex-col items-start justify-center'>
                        <label htmlFor="description" className='mb-1 text-base font-semibold'>About Me / Bio :</label>
                        <textarea onChange={(e) => setFormData({ ...formData, description: e.target.value })} onResize={"none"} type="text" id='description' className='w-full py-2 px-3 mb-2 border border-indigo-600 rounded' placeholder='Tell employers about yourself, your skills, and experience' />
                        {
                            error.description && <p className="text-sm text-red-500">{error.description}</p>
                        }
                    </div>
                    <div className='w-full mb-4  flex flex-col items-start justify-center'>
                        <label htmlFor="jobCategory" className='mb-1 text-base font-semibold'>Primary Skill / Expertise :</label>
                        <input onChange={(e) => setFormData({ ...formData, job_category: e.target.value })} type="text" id='jobCategory' className='w-full py-2 px-3 mb-2 border border-indigo-600 rounded' placeholder='e.g., React, Marketing, Graphic Design' />
                        {
                            error.job_category && <p className="text-sm text-red-500">{error.job_category}</p>
                        }
                    </div>
                    <Select onChange={(e) => setFormData({ ...formData, job_type: e.value })} placeholder="Select your availability" options={options} />
                    <div className='w-full mb-4  flex flex-col items-start justify-center'>
                        {
                            error.job_category && <p className="text-sm text-red-500">{error.job_category}</p>
                        }
                    </div>
                    <div className='w-full mb-4  flex flex-col items-start justify-center'>
                        <label htmlFor="jobExperience" className='mb-1 text-base font-semibold'>Years of Experience :</label>
                        <input onChange={(e) => setFormData({ ...formData, job_experience: e.target.value })} type="text" id='jobExperience' className='w-full py-2 px-3 mb-2 border border-indigo-600 rounded' placeholder='e.g., 3-5 years, Entry Level' />
                        {
                            error.job_experience && <p className="text-sm text-red-500">{error.job_experience}</p>
                        }
                    </div>
                    <div className='w-full mb-4  flex flex-col items-start justify-center'>
                        <label htmlFor="jobva" className='mb-1 text-base font-semibold'>Number of Projects/Portfolio Items :</label>
                        <input onChange={(e) => setFormData({ ...formData, job_vacancy: e.target.value })} type="number" id='jobva' className='w-full py-2 px-3 mb-2 border border-indigo-600 rounded' placeholder='How many projects in your portfolio?' />
                        {
                            error.job_vacancy && <p className="text-sm text-red-500">{error.job_vacancy}</p>
                        }
                    </div>
                    <div className='w-full mb-4  flex flex-col items-start justify-center'>
                        <label htmlFor="jobva" className='mb-1 text-base font-semibold'>Available From :</label>
                        <input onChange={(e) => setFormData({ ...formData, job_deadline: e.target.value })} type="date" id='jobva' className='w-full py-2 px-3 mb-2 border border-indigo-600 rounded' placeholder='When can you start?' />
                        {
                            error.job_deadline && <p className="text-sm text-red-500">{error.job_deadline}</p>
                        }
                    </div>
                    <button type="submit" className='w-full py-2 rounded bg-indigo-600 text-white font-semibold tracking-widest hover:bg-indigo-700 transition-all'>Create Profile</button>
                </form>
            </div>
            <ToastContainer />
        </>
    )
}
