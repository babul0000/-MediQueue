import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-white text-gray-800 border-t border-gray-100 pt-16 pb-8 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">


                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center pb-12 border-b border-gray-100 gap-6">
                    <div className="max-w-md">
                        <h3 className="text-2xl font-bold text-gray-900 tracking-tight mb-2">
                            Get the latest news!
                        </h3>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse non cupiditate quae nam molestias.
                        </p>
                    </div>


                    <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-0 items-stretch max-w-xl lg:min-w-[500px]">
                        <input
                            type="email"
                            placeholder="john@rhcp.com"
                            className="w-full px-4 py-3 bg-gray-50 text-gray-800 text-sm border border-gray-200 focus:outline-none focus:border-teal-500 transition-colors"
                        />
                        <button className="bg-[#00BFA5] hover:bg-[#00A68F] text-white font-bold text-xs uppercase tracking-wider px-8 py-3 transition-colors whitespace-nowrap">
                            Sign Up
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 py-12 text-sm">

                    {/* Services */}
                    <div>
                        <h4 className="font-bold text-gray-900 mb-4 tracking-wide">Services</h4>
                        <ul className="space-y-3 text-gray-600">
                            <li><a href="#" className="hover:text-[#00BFA5] transition-colors">1on1 Coaching</a></li>
                            <li><a href="#" className="hover:text-[#00BFA5] transition-colors">Company Review</a></li>
                            <li><a href="#" className="hover:text-[#00BFA5] transition-colors">Accounts Review</a></li>
                            <li><a href="#" className="hover:text-[#00BFA5] transition-colors">HR Consulting</a></li>
                            <li><a href="#" className="hover:text-[#00BFA5] transition-colors">SEO Optimisation</a></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="font-bold text-gray-900 mb-4 tracking-wide">Company</h4>
                        <ul className="space-y-3 text-gray-600">
                            <li><a href="#" className="hover:text-[#00BFA5] transition-colors">About</a></li>
                            <li><a href="#" className="hover:text-[#00BFA5] transition-colors">Meet the Team</a></li>
                            <li><a href="#" className="hover:text-[#00BFA5] transition-colors">Accounts Review</a></li>
                        </ul>
                    </div>

                    {/* Helpful Links */}
                    <div>
                        <h4 className="font-bold text-gray-900 mb-4 tracking-wide">Helpful Links</h4>
                        <ul className="space-y-3 text-gray-600">
                            <li><a href="#" className="hover:text-[#00BFA5] transition-colors">Contact</a></li>
                            <li><a href="#" className="hover:text-[#00BFA5] transition-colors">FAQs</a></li>
                            <li><a href="#" className="hover:text-[#00BFA5] transition-colors">Live Chat</a></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="font-bold text-gray-900 mb-4 tracking-wide">Legal</h4>
                        <ul className="space-y-3 text-gray-600">
                            <li><a href="#" className="hover:text-[#00BFA5] transition-colors">Accessibility</a></li>
                            <li><a href="#" className="hover:text-[#00BFA5] transition-colors">Returns Policy</a></li>
                            <li><a href="#" className="hover:text-[#00BFA5] transition-colors">Refund Policy</a></li>
                            <li><a href="#" className="hover:text-[#00BFA5] transition-colors">Hiring-3 Statistics</a></li>
                        </ul>
                    </div>

                    {/* Downloads */}
                    <div>
                        <h4 className="font-bold text-gray-900 mb-4 tracking-wide">Downloads</h4>
                        <ul className="space-y-3 text-gray-600">
                            <li><a href="#" className="hover:text-[#00BFA5] transition-colors">Marketing Calendar</a></li>
                            <li><a href="#" className="hover:text-[#00BFA5] transition-colors">SEO Infographics</a></li>
                        </ul>
                    </div>

                </div>


                <div className="pt-8 border-t border-gray-100 text-center text-sm text-gray-500">
                    <p>© 2026. Tutors Finder. All rights reserved.</p>
                </div>

            </div>
        </footer>
    );
};

export default Footer;