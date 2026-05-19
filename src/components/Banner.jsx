import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const tutorImages = [
    {
        src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
        name: 'Sarah K.',
        subject: 'Mathematics',
        rating: '4.9',
    },
    {
        src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop',
        name: 'James R.',
        subject: 'Physics',
        rating: '4.8',
    },
    {
        src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop',
        name: 'Priya M.',
        subject: 'Chemistry',
        rating: '5.0',
    },
    {
        src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop',
        name: 'David L.',
        subject: 'Biology',
        rating: '4.7',
    },
];

const stats = [
    { value: '2,400+', label: 'Expert Tutors' },
    { value: '18K+', label: 'Students Helped' },
    { value: '4.9★', label: 'Average Rating' },
];

const BannerPage = () => {
    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

                .banner-root { font-family: 'DM Sans', sans-serif; }
                .banner-root h1 { font-family: 'Playfair Display', serif; }

                @keyframes floatA {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                @keyframes floatB {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(10px); }
                }
                @keyframes floatC {
                    0%, 100% { transform: translateY(-6px); }
                    50% { transform: translateY(6px); }
                }
                @keyframes fadeSlideUp {
                    from { opacity: 0; transform: translateY(24px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes scalePop {
                    from { opacity: 0; transform: scale(0.88); }
                    to   { opacity: 1; transform: scale(1); }
                }
                @keyframes spinSlow {
                    from { transform: rotate(0deg); }
                    to   { transform: rotate(360deg); }
                }

                .anim-float-a { animation: floatA 5s ease-in-out infinite; }
                .anim-float-b { animation: floatB 6s ease-in-out infinite; }
                .anim-float-c { animation: floatC 4.5s ease-in-out infinite; }
                .anim-float-d { animation: floatA 7s ease-in-out infinite; }

                .anim-fade-1 { animation: fadeSlideUp 0.7s ease both; }
                .anim-fade-2 { animation: fadeSlideUp 0.7s 0.15s ease both; }
                .anim-fade-3 { animation: fadeSlideUp 0.7s 0.3s ease both; }
                .anim-fade-4 { animation: fadeSlideUp 0.7s 0.45s ease both; }
                .anim-fade-5 { animation: fadeSlideUp 0.7s 0.6s ease both; }

                .anim-pop-1 { animation: scalePop 0.6s 0.2s ease both; }
                .anim-pop-2 { animation: scalePop 0.6s 0.35s ease both; }
                .anim-pop-3 { animation: scalePop 0.6s 0.5s ease both; }
                .anim-pop-4 { animation: scalePop 0.6s 0.65s ease both; }

                .anim-spin { animation: spinSlow 18s linear infinite; }

                .banner-btn-primary {
                    transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
                }
                .banner-btn-primary:hover {
                    background: #3C3489 !important;
                    transform: translateY(-2px);
                    box-shadow: 0 10px 32px rgba(83,74,183,0.35) !important;
                }
                .banner-btn-primary:active { transform: scale(0.98); }

                .banner-btn-secondary {
                    transition: background 0.2s, transform 0.15s;
                }
                .banner-btn-secondary:hover {
                    background: rgba(255,255,255,0.12) !important;
                    transform: translateY(-2px);
                }
                .banner-btn-secondary:active { transform: scale(0.98); }

                .tutor-chip {
                    transition: transform 0.2s, box-shadow 0.2s;
                }
                .tutor-chip:hover {
                    transform: scale(1.04);
                    box-shadow: 0 12px 32px rgba(0,0,0,0.22) !important;
                }
            `}</style>

            <section
                className="banner-root relative overflow-hidden"
                style={{
                    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
                    minHeight: '620px',
                }}
            >
                {/* ── Decorative rings ── */}
                <div
                    className="anim-spin absolute pointer-events-none"
                    style={{
                        width: '600px', height: '600px',
                        border: '1px solid rgba(255,255,255,0.04)',
                        borderRadius: '50%',
                        top: '-200px', right: '-100px',
                    }}
                />
                <div
                    className="absolute pointer-events-none"
                    style={{
                        width: '400px', height: '400px',
                        border: '1px solid rgba(83,74,183,0.12)',
                        borderRadius: '50%',
                        top: '-80px', right: '50px',
                    }}
                />

                {/* ── Purple glow blobs ── */}
                <div
                    className="absolute pointer-events-none"
                    style={{
                        width: '500px', height: '500px',
                        background: 'radial-gradient(circle, rgba(83,74,183,0.18) 0%, transparent 70%)',
                        top: '-100px', left: '-100px',
                    }}
                />
                <div
                    className="absolute pointer-events-none"
                    style={{
                        width: '400px', height: '400px',
                        background: 'radial-gradient(circle, rgba(29,158,117,0.12) 0%, transparent 70%)',
                        bottom: '-80px', right: '200px',
                    }}
                />

                {/* ── Dot grid ── */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-[0.06]"
                    style={{
                        backgroundImage: 'radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)',
                        backgroundSize: '24px 24px',
                    }}
                />

                {/* ── Main grid ── */}
                <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-20 md:py-28 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* ══ LEFT: Text ══ */}
                    <div className="flex flex-col items-start gap-6">

                        {/* Eyebrow pill */}
                        <div
                            className="anim-fade-1 inline-flex items-center gap-2 px-4 py-[6px] rounded-full text-[12px] font-medium tracking-[0.06em] uppercase"
                            style={{
                                background: 'rgba(83,74,183,0.18)',
                                color: '#AFA9EC',
                                border: '0.5px solid rgba(83,74,183,0.35)',
                            }}
                        >
                            <span
                                className="w-[6px] h-[6px] rounded-full"
                                style={{ background: '#7F77DD' }}
                            />
                            Bangladesh's #1 Tutor Platform
                        </div>

                        {/* Headline */}
                        <h1
                            className="anim-fade-2 text-[42px] md:text-[56px] lg:text-[62px] font-bold leading-[1.1] text-white"
                        >
                            Find Your
                            <br />
                            <span
                                style={{
                                    background: 'linear-gradient(90deg, #AFA9EC 0%, #7F77DD 50%, #5DCAA5 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                }}
                            >
                                Perfect Tutor
                            </span>
                        </h1>

                        {/* Subtext */}
                        <p
                            className="anim-fade-3 text-[15px] md:text-[16px] leading-relaxed max-w-[460px]"
                            style={{ color: 'rgba(255,255,255,0.55)' }}
                        >
                            Connect with expert educators for personalized learning
                            in Mathematics, Physics, Chemistry, and more —
                            right from your home.
                        </p>

                        {/* CTA buttons */}
                        <div className="anim-fade-4 flex flex-wrap items-center gap-3 pt-2">
                            <Link href="/tutors">
                                <button
                                    className="banner-btn-primary text-white text-[14px] font-medium px-7 py-[13px] rounded-[14px]"
                                    style={{
                                        background: '#534AB7',
                                        boxShadow: '0 6px 24px rgba(83,74,183,0.3)',
                                    }}
                                >
                                    Explore Tutors →
                                </button>
                            </Link>
                            <Link href="/add-tutor">
                                <button
                                    className="banner-btn-secondary text-white text-[14px] font-medium px-7 py-[12px] rounded-[14px]"
                                    style={{
                                        background: 'rgba(255,255,255,0.07)',
                                        border: '0.5px solid rgba(255,255,255,0.18)',
                                    }}
                                >
                                    Become a Tutor
                                </button>
                            </Link>
                        </div>

                        {/* Stats */}
                        <div
                            className="anim-fade-5 flex items-center gap-6 pt-4"
                            style={{ borderTop: '0.5px solid rgba(255,255,255,0.08)', width: '100%', paddingTop: '24px', marginTop: '8px' }}
                        >
                            {stats.map(({ value, label }, i) => (
                                <div key={i} className="flex flex-col gap-[2px]">
                                    <span
                                        className="text-[22px] font-bold"
                                        style={{
                                            fontFamily: "'Playfair Display', serif",
                                            color: '#AFA9EC',
                                        }}
                                    >
                                        {value}
                                    </span>
                                    <span className="text-[11px] uppercase tracking-[0.07em]" style={{ color: 'rgba(255,255,255,0.38)' }}>
                                        {label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ══ RIGHT: Floating tutor cards ══ */}
                    <div className="relative flex justify-center items-center" style={{ minHeight: '420px' }}>

                        {/* Glow center */}
                        <div
                            className="absolute pointer-events-none"
                            style={{
                                width: '260px', height: '260px',
                                background: 'radial-gradient(circle, rgba(83,74,183,0.22) 0%, transparent 70%)',
                                top: '50%', left: '50%',
                                transform: 'translate(-50%, -50%)',
                            }}
                        />

                        {/* Card 1 — top left */}
                        <div
                            className={`tutor-chip anim-float-a anim-pop-1 absolute`}
                            style={{ top: '0px', left: '0px' }}
                        >
                            <TutorChip tutor={tutorImages[0]} />
                        </div>

                        {/* Card 2 — top right */}
                        <div
                            className={`tutor-chip anim-float-b anim-pop-2 absolute`}
                            style={{ top: '20px', right: '0px' }}
                        >
                            <TutorChip tutor={tutorImages[1]} />
                        </div>

                        {/* Card 3 — bottom left */}
                        <div
                            className={`tutor-chip anim-float-c anim-pop-3 absolute`}
                            style={{ bottom: '10px', left: '20px' }}
                        >
                            <TutorChip tutor={tutorImages[2]} />
                        </div>

                        {/* Card 4 — bottom right */}
                        <div
                            className={`tutor-chip anim-float-d anim-pop-4 absolute`}
                            style={{ bottom: '0px', right: '10px' }}
                        >
                            <TutorChip tutor={tutorImages[3]} />
                        </div>

                        {/* Center badge */}
                        <div
                            className="absolute z-20 flex flex-col items-center justify-center rounded-full text-center"
                            style={{
                                width: '110px', height: '110px',
                                background: 'linear-gradient(145deg, #534AB7, #7F77DD)',
                                boxShadow: '0 8px 32px rgba(83,74,183,0.45)',
                                top: '50%', left: '50%',
                                transform: 'translate(-50%, -50%)',
                            }}
                        >
                            <span className="text-[28px] font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                                4.9
                            </span>
                            <span className="text-[10px] uppercase tracking-[0.07em] text-white/70">
                                Avg Rating
                            </span>
                            <span className="text-[13px]">⭐⭐⭐⭐⭐</span>
                        </div>

                    </div>
                </div>

                {/* ── Bottom wave divider ── */}
                <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
                    <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: '60px' }}>
                        <path d="M0 60V30C240 0 480 60 720 40C960 20 1200 50 1440 30V60H0Z" fill="white" fillOpacity="0.03" />
                    </svg>
                </div>
            </section>
        </>
    );
};

/* ── Tutor floating chip card ── */
function TutorChip({ tutor }) {
    return (
        <div
            className="flex items-center gap-3 px-4 py-3 rounded-[18px]"
            style={{
                background: 'rgba(255,255,255,0.07)',
                border: '0.5px solid rgba(255,255,255,0.12)',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                minWidth: '160px',
            }}
        >
            {/* Avatar */}
            <div
                className="relative shrink-0 rounded-full overflow-hidden"
                style={{ width: '44px', height: '44px', border: '2px solid rgba(83,74,183,0.5)' }}
            >
                <Image
                    src={tutor.src}
                    alt={tutor.name}
                    fill
                    className="object-cover"
                    sizes="44px"
                />
            </div>

            {/* Info */}
            <div className="flex flex-col gap-[2px]">
                <span
                    className="text-[13px] font-medium text-white"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                    {tutor.name}
                </span>
                <span className="text-[11px]" style={{ color: '#AFA9EC' }}>
                    {tutor.subject}
                </span>
                <span className="text-[11px]" style={{ color: '#5DCAA5' }}>
                    ★ {tutor.rating}
                </span>
            </div>
        </div>
    );
}

export default BannerPage;