const JoinSection = () => {
  return (
    <section className="border-t border-border bg-card py-20" id="join">
      <div className="container mx-auto max-w-2xl px-6 text-center">
        <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
          Ready to Fly?
        </h2>
        <p className="mt-4 text-muted-foreground">
          Joining takes under a minute. No interview. No check ride. Just sign
          up and start flying.
        </p>
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="https://discord.gg/your-invite"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-md bg-primary px-8 py-3 font-display text-sm font-semibold uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary/80"
          >
            Join via Discord
          </a>
          <a
            href="https://forms.google.com/your-form"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-md border border-border px-8 py-3 font-display text-sm font-semibold uppercase tracking-widest text-foreground transition-colors hover:bg-secondary"
          >
            Apply via Form
          </a>
        </div>
      </div>
    </section>
  );
};

export default JoinSection;
