import { motion } from "framer-motion";
import { Package } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4 } },
};

const FleetSection = () => {
  const { data: fleet = [] } = useQuery({
    queryKey: ["fleet"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("fleet")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  return (
    <section className="border-t border-border py-20" id="fleet">
      <div className="container mx-auto max-w-4xl px-6">
        <motion.h2
          className="font-display text-3xl font-bold text-foreground sm:text-4xl"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Fleet
        </motion.h2>
        <motion.p
          className="mt-4 text-muted-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          We keep it simple. Fly what you have — these are our focus aircraft.
        </motion.p>
        <motion.div
          className="mt-10 grid gap-4 sm:grid-cols-2"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {fleet.map((a) => (
            <motion.div
              key={a.id}
              variants={item}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              className="flex items-center justify-between rounded-lg border border-border bg-card p-5"
            >
              <span className="font-display font-semibold text-foreground">
                {a.type}
              </span>
              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                {a.cargo && <Package className="h-4 w-4 text-primary" />}
                {a.role}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FleetSection;
