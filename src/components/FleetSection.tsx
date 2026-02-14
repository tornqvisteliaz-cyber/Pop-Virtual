const fleet = [
  { type: "Boeing 737-800", role: "Short-haul workhorse" },
  { type: "Airbus A320neo", role: "European routes" },
  { type: "Boeing 777-300ER", role: "Long-haul flagship" },
  { type: "Cessna 172", role: "Training & VFR" },
];

const FleetSection = () => {
  return (
    <section className="border-t border-border py-20" id="fleet">
      <div className="container mx-auto max-w-4xl px-6">
        <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
          Fleet
        </h2>
        <p className="mt-4 text-muted-foreground">
          We keep it simple. Fly what you have — these are our focus aircraft.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {fleet.map((a) => (
            <div
              key={a.type}
              className="flex items-center justify-between rounded-lg border border-border bg-card p-5"
            >
              <span className="font-display font-semibold text-foreground">
                {a.type}
              </span>
              <span className="text-sm text-muted-foreground">{a.role}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FleetSection;
