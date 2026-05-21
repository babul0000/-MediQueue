const steps = [
  {
    num: "01",
    title: "Browse Tutors",
    desc: "Explore our verified tutors filtered by subject, price, rating, and language.",
    color: "from-indigo-500 to-violet-600",
    shadow: "shadow-indigo-200",
  },
  {
    num: "02",
    title: "Book a Session",
    desc: "Pick a time that works for you and book your 1-on-1 live session instantly.",
    color: "from-violet-500 to-fuchsia-600",
    shadow: "shadow-violet-200",
  },
  {
    num: "03",
    title: "Start Learning",
    desc: "Join the video call, share resources, and learn at your own pace with expert guidance.",
    color: "from-fuchsia-500 to-pink-600",
    shadow: "shadow-fuchsia-200",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <p className="text-indigo-600 text-sm font-semibold tracking-widest uppercase mb-2">
          Simple &amp; Fast
        </p>
        <h2
          className="text-3xl font-black text-gray-900"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          How It Works
        </h2>
        <p className="text-gray-500 mt-3 max-w-lg mx-auto text-sm">
          Get started in minutes. No complicated setup — just learning.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step) => (
          <div key={step.num} className="flex flex-col items-center text-center px-4">
            <div
              className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg ${step.shadow} mb-6 rotate-3`}
            >
              <span className="text-white font-black text-2xl">{step.num}</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}