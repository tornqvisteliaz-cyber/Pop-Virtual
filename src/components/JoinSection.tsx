import { motion } from "framer-motion";

const JoinSection = () => {
  return (
    <section className="border-t border-border bg-card py-20" id="join">
      <div className="container mx-auto max-w-2xl px-6 text-center">
        <motion.h2
          className="font-display text-3xl font-bold text-foreground sm:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Ready to Fly?
        </motion.h2>
        <motion.p
          className="mt-4 text-muted-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Joining takes under a minute. No interview. No check ride. Just sign
          up and start flying.
        </motion.p>
        <motion.div
          className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.a
            href="https://app.flightlinq.com/join/ecf93d27"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-md bg-primary px-8 py-3 font-display text-sm font-semibold uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary/80"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Join via FlightLinQ
          </motion.a>
          <motion.a
            href="https://discord.gg/nDNeMMCUQu"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-md border border-border px-8 py-3 font-display text-sm font-semibold uppercase tracking-widest text-foreground transition-colors hover:bg-secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Join Discord
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default JoinSection;
