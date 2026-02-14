import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      id="hero"
    >
      <img
        src={heroBg}
        alt="Aircraft silhouette against dark sky"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-background/60" />
      <div className="relative z-10 px-6 text-center">
        <h1 className="font-display text-5xl font-bold tracking-tight text-foreground sm:text-7xl">
          My VA Pop
        </h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-muted-foreground sm:text-xl">
          Fly together. No nonsense. Just sim flying done right.
        </p>
        <a
          href="#join"
          className="mt-8 inline-block rounded-md bg-primary px-8 py-3 font-display text-sm font-semibold uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary/80"
        >
          Join Now
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
