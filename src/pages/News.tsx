import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { ArrowLeft, Newspaper } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const NewsPage = () => {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-20">
        <div className="container mx-auto max-w-3xl px-6 py-12">
          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>

          <motion.h1
            className="font-display text-4xl font-bold text-foreground sm:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            News & Announcements
          </motion.h1>
          <motion.p
            className="mt-3 text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Stay up to date with Pop! Airways.
          </motion.p>

          {isLoading ? (
            <div className="mt-12 space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 animate-pulse rounded-lg bg-card" />
              ))}
            </div>
          ) : posts && posts.length > 0 ? (
            <motion.div
              className="mt-12 space-y-6"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {posts.map((post) => (
                <motion.article
                  key={post.id}
                  variants={item}
                  className="rounded-lg border border-border bg-card p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary">
                        {post.category}
                      </span>
                      <h2 className="mt-3 font-display text-xl font-semibold text-foreground">
                        {post.title}
                      </h2>
                    </div>
                    <time className="shrink-0 text-xs text-muted-foreground">
                      {format(new Date(post.created_at), "MMM d, yyyy")}
                    </time>
                  </div>
                  <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
                    {post.content}
                  </p>
                </motion.article>
              ))}
            </motion.div>
          ) : (
            <div className="mt-20 flex flex-col items-center text-center">
              <Newspaper className="h-12 w-12 text-muted-foreground/50" />
              <p className="mt-4 text-muted-foreground">No posts yet. Check back soon!</p>
            </div>
          )}
        </div>
      </main>
      <FooterSection />
    </>
  );
};

export default NewsPage;
