"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const NotFoundPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-black px-6">
            <div className="text-center">
                {/* 404 Animation */}
                <motion.h1
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-[150px] md:text-[200px] font-black text-transparent bg-clip-text bg-gradient-to-b from-indigo-500 to-black select-none"
                >
                    404
                </motion.h1>

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">
                        Page Not Found
                    </h2>
                    <p className="text-neutral-400 max-w-sm mx-auto mb-10 font-light">
                        Sorry, the page you are looking for does not exist or has been moved.
                    </p>

                    {/* Button */}
                    <Link
                        href="/"
                        className="px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-neutral-200 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                    >
                        Back to Home
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default NotFoundPage;