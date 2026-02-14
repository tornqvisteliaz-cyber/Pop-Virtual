import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";
import logo from "@/assets/logo.webp";

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
        <motion.img
          src={logo}
          alt="Pop! Airways logo"
          className="mx-auto mb-6 h-16 sm:h-20"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        <motion.h1
          className="font-display text-5xl font-bold tracking-tight text-foreground sm:text-7xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Pop! Airways
        </motion.h1>
        <motion.p
          className="mx-auto mt-4 max-w-md text-lg text-muted-foreground sm:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Fly together. No nonsense. Just sim flying done right.
        </motion.p>
        <motion.a
          href="#join"
          className="mt-8 inline-block rounded-md bg-primary px-8 py-3 font-display text-sm font-semibold uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary/80"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          Join Now
        </motion.a>
      </div>
    </section>
  );
};

export default HeroSection;
