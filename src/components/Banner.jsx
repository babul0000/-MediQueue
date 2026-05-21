"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const slides = [
  {
    id: 1,
    tag: "Find Your Perfect Tutor",
    headline: "Learn Anything,\nAnywhere, Anytime",
    sub: "Connect with expert tutors across 50+ subjects and unlock your full potential from the comfort of home.",
    cta: "Browse Tutors",
    bg: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4c1d95 100%)",
    accent: "#a78bfa",
    pattern: "circles",
  },
  {
    id: 2,
    tag: "1-on-1 Live Sessions",
    headline: "Personalized\nLearning Plans",
    sub: "Every student is unique. Our tutors craft custom roadmaps tailored to your pace, goals, and learning style.",
    cta: "Get Started",
    bg: "linear-gradient(135deg, #022c22 0%, #134e4a 50%, #083344 100%)",
    accent: "#34d399",
    pattern: "dots",
  },
  {
    id: 3,
    tag: "Certified Educators",
    headline: "Top-Rated\nTutors, Verified",
    sub: "All tutors are background-checked, degree-verified, and rated by real students — quality you can trust.",
    cta: "Meet Our Tutors",
    bg: "linear-gradient(135deg, #4a044e 0%, #831843 50%, #500724 100%)",
    accent: "#f472b6",
    pattern: "lines",
  },
];

const PatternBg = ({ type, accent }) => {
  if (type === "circles")
    return (
      <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        {[...Array(6)].map((_, i) => (
          <circle key={i} cx={`${10 + i * 17}%`} cy={`${20 + (i % 3) * 30}%`} r={80 + i * 20} fill="none" stroke={accent} strokeWidth="1" />
        ))}
      </svg>
    );
  if (type === "dots")
    return (
      <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        {[...Array(8)].map((_, row) =>
          [...Array(16)].map((_, col) => (
            <circle key={`${row}-${col}`} cx={col * 70 + 20} cy={row * 70 + 20} r="2" fill={accent} />
          ))
        )}
      </svg>
    );
  return (
    <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
      {[...Array(12)].map((_, i) => (
        <line key={i} x1={`${i * 9}%`} y1="0%" x2={`${i * 9 - 10}%`} y2="100%" stroke={accent} strokeWidth="1" />
      ))}
    </svg>
  );
};

export default function Banner() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  const goTo = (idx) => {
    if (fading || idx === current) return;
    setFading(true);
    setTimeout(() => {
      setCurrent(idx);
      setFading(false);
    }, 350);
  };

  useEffect(() => {
    const t = setInterval(() => goTo((current + 1) % slides.length), 5500);
    return () => clearInterval(t);
  }, [current]);

  const slide = slides[current];

  return (
    <div
      className="relative overflow-hidden rounded-2xl"
      style={{ minHeight: 480, background: slide.bg, transition: "background 0.8s ease" }}
    >
      <PatternBg type={slide.pattern} accent={slide.accent} />

      {/* Content */}
      <div
        className="relative z-10 px-8 md:px-16 py-16 max-w-2xl"
        style={{
          opacity: fading ? 0 : 1,
          transform: fading ? "translateY(12px)" : "translateY(0)",
          transition: "opacity 0.35s ease, transform 0.35s ease",
        }}
      >
        <span
          className="inline-block text-xs font-semibold tracking-widest uppercase mb-4 px-3 py-1 rounded-full"
          style={{ backgroundColor: slide.accent + "25", color: slide.accent, border: `1px solid ${slide.accent}45` }}
        >
          {slide.tag}
        </span>

        <h1
          className="text-4xl md:text-5xl font-black text-white leading-tight mb-5"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif", whiteSpace: "pre-line" }}
        >
          {slide.headline}
        </h1>

        <p className="text-white/70 text-base md:text-lg leading-relaxed mb-8 max-w-lg">
          {slide.sub}
        </p>

        <button
          onClick={() => router.push("/tutors")}
          className="px-8 py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
          style={{ backgroundColor: slide.accent, color: "#0a0a0a", boxShadow: `0 0 28px ${slide.accent}40` }}
        >
          {slide.cta} →
        </button>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-6 left-8 md:left-16 flex gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="rounded-full transition-all duration-300 cursor-pointer"
            style={{
              width: i === current ? 28 : 8,
              height: 8,
              backgroundColor: i === current ? slide.accent : "rgba(255,255,255,0.3)",
            }}
          />
        ))}
      </div>

      {/* Arrow buttons */}
      <button
        onClick={() => goTo((current - 1 + slides.length) % slides.length)}
        className="absolute right-16 bottom-4 z-10 w-10 h-10 rounded-full flex items-center justify-center text-white text-xl transition-all hover:scale-110 cursor-pointer"
        style={{ backgroundColor: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}
      >
        ‹
      </button>
      <button
        onClick={() => goTo((current + 1) % slides.length)}
        className="absolute right-4 bottom-4 z-10 w-10 h-10 rounded-full flex items-center justify-center text-white text-xl transition-all hover:scale-110 cursor-pointer"
        style={{ backgroundColor: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}
      >
        ›
      </button>
    </div>
  );
}