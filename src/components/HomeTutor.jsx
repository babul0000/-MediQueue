"use client"; 
import Link from "next/link";
import TutorCard from "./TutorCard";
import { motion } from "framer-motion";


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function HomeTutors({ tutors }) { 
  return (
    <section className="py-16 w-11/12 mx-auto">
      
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="text-indigo-600 text-sm font-semibold tracking-widest uppercase mb-2">
            Hand-Picked Experts
          </p>
          <h2 className="text-3xl font-black text-gray-900" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
            Meet Our Top Tutors
          </h2>
        </div>
        <Link href="/tutor" className="text-sm font-semibold text-indigo-600 border border-indigo-200 px-5 py-2 rounded-xl hover:bg-indigo-50 transition-colors">
          View All →
        </Link>
      </div>

      
      {tutors.length === 0 ? (
        <p className="text-center text-gray-400 py-16">No tutors found.</p>
      ) : (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
        >
          {tutors.map((tutor) => (
            <motion.div key={tutor._id} variants={cardVariants}>
              <TutorCard tutor={tutor} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
}