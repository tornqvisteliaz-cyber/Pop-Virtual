import { Plane, Globe, Users } from "lucide-react";
import { motion } from "framer-motion";

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

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const AboutSection = () => {
  return (
    <section className="border-t border-border bg-card py-20" id="about">
      <div className="container mx-auto max-w-4xl px-6">
        <motion.h2
          className="font-display text-3xl font-bold text-foreground sm:text-4xl"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          About Us
        </motion.h2>
        <motion.p
          className="mt-4 max-w-2xl text-muted-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Pop! Airways is a virtual airline for flight sim pilots who want
          structure without bureaucracy. Casual or serious — fly at your own
          pace with a crew that gets it.
        </motion.p>
        <motion.div
          className="mt-12 grid gap-8 sm:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={item}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="rounded-lg border border-border bg-secondary/50 p-6"
            >
              <f.icon className="h-8 w-8 text-primary" />
              <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
                {f.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {f.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
