const stats = [
  { value: "2,400+", label: "Active Students", icon: "👨‍🎓" },
  { value: "350+",   label: "Expert Tutors",   icon: "🎓"  },
  { value: "50+",    label: "Subjects Covered", icon: "📚" },
  { value: "4.9★",   label: "Average Rating",   icon: "⭐" },
];

export default function StatsSection() {
  return (
    <section className="py-14 px-8 md:px-16 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col items-center gap-2">
            <span className="text-3xl">{s.icon}</span>
            <p className="text-3xl font-black">{s.value}</p>
            <p className="text-white/70 text-sm font-medium">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}