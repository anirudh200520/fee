import NavBar from '@/components/NavBar'
import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub } from 'react-icons/fa'

export default function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            return toast.error('Please fill in all fields')
        }

        setLoading(true)
        
        // Simulate sending message
        setTimeout(() => {
            toast.success('Message sent successfully! We will get back to you soon.')
            setFormData({ name: '', email: '', subject: '', message: '' })
            setLoading(false)
        }, 1000)
    }

    return (
        <>
            <NavBar />
            <ToastContainer position="top-right" />
            
            <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Get In Touch
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Contact Form */}
                        <div className="bg-white rounded-lg shadow-lg p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-medium mb-2">Your Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 font-medium mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 font-medium mb-2">Subject</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        placeholder="How can we help?"
                                    />
                                </div>

                                <div className="mb-6">
                                    <label className="block text-gray-700 font-medium mb-2">Message</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows="5"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        placeholder="Your message..."
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {loading ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        </div>

                        {/* Contact Information */}
                        <div>
                            <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
                                
                                <div className="space-y-6">
                                    <div className="flex items-start">
                                        <FaEnvelope className="text-indigo-600 text-2xl mt-1 mr-4" />
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                                            <a href="mailto:contact@quevo.com" className="text-gray-600 hover:text-indigo-600">
                                                contact@quevo.com
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <FaPhone className="text-indigo-600 text-2xl mt-1 mr-4" />
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                                            <a href="tel:+1234567890" className="text-gray-600 hover:text-indigo-600">
                                                +1 (234) 567-890
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <FaMapMarkerAlt className="text-indigo-600 text-2xl mt-1 mr-4" />
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-1">Address</h3>
                                            <p className="text-gray-600">
                                                123 Business Street<br />
                                                Suite 100<br />
                                                City, State 12345
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Social Links */}
                            <div className="bg-indigo-600 rounded-lg shadow-lg p-8 text-white">
                                <h2 className="text-2xl font-bold mb-4">Follow Us</h2>
                                <p className="mb-6">Connect with us on social media for updates and opportunities</p>
                                <div className="flex space-x-4">
                                    <a 
                                        href="https://github.com/anirudh200520" 
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-white text-indigo-600 p-3 rounded-full hover:bg-gray-100 transition-colors"
                                    >
                                        <FaGithub className="text-2xl" />
                                    </a>
                                    <a 
                                        href="https://linkedin.com" 
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-white text-indigo-600 p-3 rounded-full hover:bg-gray-100 transition-colors"
                                    >
                                        <FaLinkedin className="text-2xl" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
