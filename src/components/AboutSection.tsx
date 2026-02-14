import { Plane, Globe, Users } from "lucide-react";

const features = [
  {
    icon: Plane,
    title: "MSFS & X-Plane",
    description: "Fly on your platform of choice. We support both major sims.",
  },
  {
    icon: Globe,
    title: "VATSIM & IVAO",
    description: "Online flying encouraged. Fly on the networks you love.",
  },
  {
    icon: Users,
    title: "Active Community",
    description: "Real pilots, regular flights, no drama. Just aviation.",
  },
];

const AboutSection = () => {
  return (
    <section className="border-t border-border bg-card py-20" id="about">
      <div className="container mx-auto max-w-4xl px-6">
        <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
          About Us
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          My VA Pop is a virtual airline for flight sim pilots who want
          structure without bureaucracy. Casual or serious — fly at your own
          pace with a crew that gets it.
        </p>
        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="rounded-lg border border-border bg-secondary/50 p-6">
              <f.icon className="h-8 w-8 text-primary" />
              <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
                {f.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
