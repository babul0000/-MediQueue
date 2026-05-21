"use client";
import { useRouter } from "next/navigation";

const subjectColors = {
  Mathematics: { bg: "#eff6ff", text: "#1d4ed8", border: "#bfdbfe" },
  Physics:     { bg: "#fdf4ff", text: "#7e22ce", border: "#e9d5ff" },
  Chemistry:   { bg: "#fff7ed", text: "#c2410c", border: "#fed7aa" },
  Biology:     { bg: "#f0fdf4", text: "#15803d", border: "#bbf7d0" },
  English:     { bg: "#fef2f2", text: "#b91c1c", border: "#fecaca" },
  History:     { bg: "#fffbeb", text: "#b45309", border: "#fde68a" },
};

const getSubjectStyle = (subject) =>
  subjectColors[subject] || { bg: "#f8fafc", text: "#475569", border: "#e2e8f0" };

const StarRating = ({ rating = 4 }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <svg key={s} className="w-3.5 h-3.5" fill={s <= Math.round(rating) ? "#f59e0b" : "#e5e7eb"} viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

export default function TutorCard({ tutor }) {
  const router = useRouter();
  const subStyle = getSubjectStyle(tutor.subject);

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-indigo-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-50 flex flex-col">
      {/* Image */}
      <div className="relative h-44 bg-gradient-to-br from-indigo-50 to-violet-50 overflow-hidden">
        <img
          src={tutor.image || `https://api.dicebear.com/7.x/personas/svg?seed=${encodeURIComponent(tutor.name)}`}
          alt={tutor.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="absolute top-3 right-3">
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{ backgroundColor: subStyle.bg, color: subStyle.text, border: `1px solid ${subStyle.border}` }}
          >
            {tutor.subject}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-1">
          <h3 className="font-bold text-gray-900 text-base">{tutor.name}</h3>
          <span className="text-indigo-600 font-bold text-sm">
            ${tutor.price}
            <span className="text-gray-400 font-normal text-xs">/hr</span>
          </span>
        </div>

        <p className="text-xs text-gray-500 mb-3">
          {tutor.language} · {tutor.review ?? 0} reviews
        </p>

        <div className="flex items-center gap-2 mb-4">
          <StarRating rating={tutor.rating} />
          <span className="text-xs text-gray-500">{tutor.rating || "4.0"}</span>
        </div>

        <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 mb-4 flex-1">
          {tutor.description || "Expert tutor with years of teaching experience."}
        </p>

        <button
          onClick={() => router.push(`/tutors/${tutor._id}`)}
          className="w-full py-2.5 rounded-xl text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95 transition-all duration-150 cursor-pointer"
        >
          Book Session →
        </button>
      </div>
    </div>
  );
}