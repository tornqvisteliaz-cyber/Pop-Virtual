import { motion } from "framer-motion";

const CommunitySection = () => {
  return (
    <section className="border-t border-border py-20" id="community">
      <div className="container mx-auto max-w-2xl px-6 text-center">
        <motion.h2
          className="font-display text-3xl font-bold text-foreground sm:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Community
        </motion.h2>
        <motion.p
          className="mt-4 text-muted-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Our Discord is where everything happens — flight announcements,
          route planning, and just hanging out between flights.
        </motion.p>
        <motion.p
          className="mt-2 text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          No activity minimums. Fly when you can. We are here when you are.
        </motion.p>
        <motion.a
          href="https://discord.gg/nDNeMMCUQu"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block rounded-md border border-primary px-8 py-3 font-display text-sm font-semibold uppercase tracking-widest text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          Join Our Discord
        </motion.a>
      </div>
    </section>
  );
};

export default CommunitySection;
