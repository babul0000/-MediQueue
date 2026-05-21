import Link from "next/link";
import TutorCard from "./TutorCard";

async function getTutors() {
  try {
    const res = await fetch("http://localhost:5000/tutor-home", {
      cache: "no-store", // always fresh data
    });
    if (!res.ok) throw new Error("Failed to fetch tutors");
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function HomeTutors() {
  const tutors = await getTutors();

  return (
    <section className="py-16">
      {/* Header */}
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="text-indigo-600 text-sm font-semibold tracking-widest uppercase mb-2">
            Hand-Picked Experts
          </p>
          <h2
            className="text-3xl font-black text-gray-900"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            Meet Our Top Tutors
          </h2>
        </div>
        <Link
          href="/tutors"
          className="text-sm font-semibold text-indigo-600 border border-indigo-200 px-5 py-2 rounded-xl hover:bg-indigo-50 transition-colors"
        >
          View All →
        </Link>
      </div>

      {/* Grid */}
      {tutors.length === 0 ? (
        <p className="text-center text-gray-400 py-16">No tutors found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutors.map((tutor) => (
            <TutorCard key={tutor._id} tutor={tutor} />
          ))}
        </div>
      )}
    </section>
  );
}