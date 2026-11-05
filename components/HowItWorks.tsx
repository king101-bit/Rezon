const steps = [
  { title: "Search", text: "Find any movie or show by title." },
  { title: "Request", text: "Ask for the movie or the seasons you want." },
  { title: "Track", text: "Watch the status change until it’s ready." },
];

export default function HowItWorks() {
  return (
    <section className="container mx-auto mb-20 px-4">
      <h2 className="mb-10 text-center text-3xl font-bold">How it works</h2>
      <ol className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
        {steps.map((s, i) => (
          <li key={s.title} className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#2C8C99] text-lg font-bold text-white">
              {i + 1}
            </div>
            <h3 className="mb-1 text-xl font-semibold">{s.title}</h3>
            <p className="text-muted-foreground">{s.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
