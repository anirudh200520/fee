import NavBar from '@/components/NavBar'
import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            return toast.error('Please fill all fields')
        }

        // Here you would typically send the data to an API
        toast.success('Message sent successfully! We will get back to you soon.')
        
        // Reset form
        setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
        })
    }

    return (
        <>
            <NavBar />
            <ToastContainer position="top-right" />
            
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 pt-24 pb-12 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
                            Get In <span className="text-indigo-600">Touch</span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Contact Info Cards */}
                        <div className="lg:col-span-1 space-y-6">
                            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                                <div className="flex items-center space-x-4">
                                    <div className="bg-indigo-100 p-4 rounded-full">
                                        <FaEnvelope className="text-indigo-600 text-2xl" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Email</h3>
                                        <p className="text-gray-600">contact@quevo.com</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                                <div className="flex items-center space-x-4">
                                    <div className="bg-green-100 p-4 rounded-full">
                                        <FaPhone className="text-green-600 text-2xl" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Phone</h3>
                                        <p className="text-gray-600">+1 (555) 123-4567</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                                <div className="flex items-center space-x-4">
                                    <div className="bg-purple-100 p-4 rounded-full">
                                        <FaMapMarkerAlt className="text-purple-600 text-2xl" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Location</h3>
                                        <p className="text-gray-600">San Francisco, CA</p>
                                    </div>
                                </div>
                            </div>

                            {/* Social Links */}
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <h3 className="font-semibold text-gray-900 mb-4">Follow Us</h3>
                                <div className="flex space-x-4">
                                    <a href="https://github.com/anirudh200520" target="_blank" rel="noopener noreferrer" 
                                       className="bg-gray-100 p-3 rounded-full hover:bg-indigo-600 hover:text-white transition-colors">
                                        <FaGithub className="text-xl" />
                                    </a>
                                    <a href="#" className="bg-gray-100 p-3 rounded-full hover:bg-indigo-600 hover:text-white transition-colors">
                                        <FaLinkedin className="text-xl" />
                                    </a>
                                    <a href="#" className="bg-gray-100 p-3 rounded-full hover:bg-indigo-600 hover:text-white transition-colors">
                                        <FaTwitter className="text-xl" />
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-2xl shadow-xl p-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Your Name
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Subject
                                        </label>
                                        <input
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                                            placeholder="How can we help you?"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Message
                                        </label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows="6"
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition resize-none"
                                            placeholder="Tell us about your inquiry..."
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-indigo-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-indigo-700 transform hover:scale-[1.02] transition-all shadow-lg hover:shadow-xl"
                                    >
                                        Send Message
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* Additional Info Section */}
                    <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
                        <div className="grid md:grid-cols-3 gap-8 text-center">
                            <div>
                                <div className="text-4xl font-bold text-indigo-600 mb-2">24/7</div>
                                <p className="text-gray-600">Customer Support</p>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-indigo-600 mb-2">2400+</div>
                                <p className="text-gray-600">Daily Active Users</p>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-indigo-600 mb-2">100+</div>
                                <p className="text-gray-600">Companies Hiring</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
