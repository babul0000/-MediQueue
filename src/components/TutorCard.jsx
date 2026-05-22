import Image from 'next/image';
import Link from 'next/link';

const TutorCard = ({ tutor }) => {
    const { _id, tutorName, photoUrl, subjectCategory, subject, hourlyFee, availableDaysAndTime, sessionStartDate } = tutor || {};

    const displaySubject = subjectCategory || subject || "General";
    const initials = tutorName?.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase() || 'TU';

    return (
        <div className="group flex flex-col bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.05)] overflow-hidden transition-all duration-500 ease-out hover:shadow-2xl hover:-translate-y-2">


            <div className="relative w-full h-[220px] overflow-hidden">
                {photoUrl ? (
                    <Image
                        src={photoUrl}
                        alt={tutorName}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-300 to-purple-500">
                        <span className="text-4xl font-bold text-white tracking-widest">{initials}</span>
                    </div>
                )}

                {/* Floating Badges */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1 rounded-full text-[11px] font-bold text-indigo-700 uppercase tracking-wider shadow-sm">
                    {displaySubject}
                </div>
                <div className="absolute top-4 right-4 bg-indigo-600 px-4 py-1 rounded-full text-[11px] font-bold text-white shadow-lg shadow-indigo-600/30">
                    ৳{hourlyFee || 0}/hr
                </div>
            </div>

            {/* Card Content */}
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-black text-gray-900 mb-1">{tutorName}</h3>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mb-5">Subject Tutor</p>

                <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                        <span className="text-lg">📅</span>
                        <span className="truncate">{availableDaysAndTime || "Not scheduled"}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                        <span className="text-lg">🗓</span>
                        <span>Starts: <span className="font-semibold text-gray-800">{sessionStartDate || "N/A"}</span></span>
                    </div>
                </div>

                <Link href={`/tutor/${_id}`} className="mt-auto">
                    <button className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold transition-all duration-300 hover:bg-indigo-600 active:scale-95">
                        Book Session →
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default TutorCard;