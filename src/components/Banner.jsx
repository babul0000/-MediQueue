import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const BannerPage = () => {
    return (
        <section className="relative bg-gradient-to-r from-[#075E54] to-[#0D9488] text-white overflow-hidden py-16 md:py-24 px-6 md:px-12 lg:px-24">

            {/* ব্যাকগ্রাউন্ডে হালকা জিওমেট্রিক বা গ্রিড ইফেক্টের জন্য শ্যাডো (ঐচ্ছিক) */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">

                {/* বাম পাশের টেক্সট কন্টেন্ট (Left Side Text) */}
                <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                        FIND YOUR <br className="hidden md:inline" />
                        <span className="text-teal-200">PERFECT TUTOR</span>
                    </h1>

                    <p className="text-base md:text-lg text-gray-100 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
                        Connect with expert educators for personalized learning in Mathematics, Physics, Chemistry, and more.
                    </p>

                    {/* কল-টু-অ্যাকশন বাটনসমূহ (CTA Buttons) */}
                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                        <Link href="/tutors">
                            <button className="w-full sm:w-auto bg-white hover:bg-gray-100 text-[#075E54] font-bold px-8 py-3.5 rounded-full shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 tracking-wide text-sm uppercase">
                                Explore Tutors
                            </button>
                        </Link>

                        <Link href="/add-tutor">
                            <button className="w-full sm:w-auto bg-transparent hover:bg-white/10 text-white font-bold px-8 py-3.5 rounded-full border-2 border-white transition-all transform hover:-translate-y-0.5 active:translate-y-0 tracking-wide text-sm uppercase">
                                Become a Tutor
                            </button>
                        </Link>
                    </div>
                </div>


                <div className="lg:col-span-5 relative flex justify-center items-center">


                    <div className="absolute w-72 h-72 bg-teal-300/20 rounded-full blur-3xl -z-10"></div>


                    <div className="grid grid-cols-3 gap-4 transform rotate-3 hover:rotate-0 transition-transform duration-500 max-w-[420px]">


                        <div className="rounded-2xl overflow-hidden shadow-xl border-2 border-white/20 transform -translate-y-4">
                            <Image
                            width={200}
                            height={200}
                                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop"
                                alt="Tutor 1"
                                className="w-full h-32 md:h-40 object-cover"
                            />
                        </div>


                        <div className="rounded-2xl overflow-hidden shadow-xl border-2 border-white/20">
                            <Image
                            width={200}
                            height={200}
                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop"
                                alt="Tutor 2"
                                className="w-full h-32 md:h-40 object-cover"
                            />
                        </div>


                        <div className="rounded-2xl overflow-hidden shadow-xl border-2 border-white/20 transform translate-y-4">
                            <Image
                            width={200}
                            height={200}
                                src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=300&auto=format&fit=crop"
                                alt="Tutor 3"
                                className="w-full h-32 md:h-40 object-cover"
                            />
                        </div>


                        <div className="rounded-2xl overflow-hidden shadow-xl border-2 border-white/20 transform -translate-y-2">
                            <Image
                            width={200}
                            height={200}
                                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop"
                                alt="Tutor 4"
                                className="w-full h-32 md:h-40 object-cover"
                            />
                        </div>

                        
                        <div className="rounded-2xl overflow-hidden shadow-xl border-2 border-white/20">
                            <Image
                            width={200}
                            height={200}
                                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop"
                                alt="Tutor 5"
                                className="w-full h-32 md:h-40 object-cover"
                            />
                        </div>

                        
                        <div className="rounded-2xl overflow-hidden shadow-xl border-2 border-white/20 transform translate-y-2">
                            <Image
                            width={200}
                            height={200}
                                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop"
                                alt="Tutor 6"
                                className="w-full h-32 md:h-40 object-cover"
                            />
                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
};

export default BannerPage;