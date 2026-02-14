const CommunitySection = () => {
  return (
    <section className="border-t border-border py-20" id="community">
      <div className="container mx-auto max-w-2xl px-6 text-center">
        <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
          Community
        </h2>
        <p className="mt-4 text-muted-foreground">
          Our Discord is where everything happens — flight announcements,
          route planning, and just hanging out between flights.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          No activity minimums. Fly when you can. We are here when you are.
        </p>
        <a
          href="https://discord.gg/your-invite"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block rounded-md border border-primary px-8 py-3 font-display text-sm font-semibold uppercase tracking-widest text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          Join Our Discord
        </a>
      </div>
    </section>
  );
};

export default CommunitySection;
