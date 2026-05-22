import Link from "next/link";
import TutorCard from "./TutorCard";

async function getTutors() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/tutor-home`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error("Failed to fetch tutors");
    return res.json();
  } catch (error) {
    console.error("Error fetching tutors:", error);
    return [];
  }
}

export default async function HomeTutors() {
  const tutors = await getTutors();

  return (
  
    <section className="py-16 w-11/12 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
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
          href="/tutor"
          className="text-sm font-semibold text-indigo-600 border border-indigo-200 px-5 py-2 rounded-xl hover:bg-indigo-50 transition-colors"
        >
          View All →
        </Link>
      </div>

      {/* Grid */}
      {tutors.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-2xl">
          <p className="text-gray-400">Currently no tutors available.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tutors.map((tutor) => (
            <TutorCard key={tutor._id} tutor={tutor} />
          ))}
        </div>
      )}
    </section>
  );
}