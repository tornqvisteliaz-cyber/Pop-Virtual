import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Lock, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";

const AdminPage = () => {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [storedPassword, setStoredPassword] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("news");

  const queryClient = useQueryClient();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setStoredPassword(password);
    setAuthenticated(true);
  };

  const { data: posts, isLoading } = useQuery({
    queryKey: ["admin-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: authenticated,
  });

  const createPost = useMutation({
    mutationFn: async () => {
      const res = await supabase.functions.invoke("admin-posts", {
        body: { password: storedPassword, title, content, category },
      });
      if (res.error) throw new Error(res.error.message);
      if (res.data?.error) throw new Error(res.data.error);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Post published!");
      setTitle("");
      setContent("");
      queryClient.invalidateQueries({ queryKey: ["admin-posts"] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (err: Error) => {
      if (err.message.includes("Invalid password")) {
        setAuthenticated(false);
        toast.error("Invalid password. Please re-enter.");
      } else {
        toast.error(err.message);
      }
    },
  });

  const deletePost = useMutation({
    mutationFn: async (postId: string) => {
      const res = await supabase.functions.invoke("admin-posts", {
        body: { password: storedPassword, action: "delete", postId },
      });
      if (res.error) throw new Error(res.error.message);
      if (res.data?.error) throw new Error(res.data.error);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Post deleted");
      queryClient.invalidateQueries({ queryKey: ["admin-posts"] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  if (!authenticated) {
    return (
      <>
        <Navbar />
        <main className="flex min-h-screen items-center justify-center bg-background px-6 pt-20">
          <motion.form
            onSubmit={handleLogin}
            className="w-full max-w-sm rounded-lg border border-border bg-card p-8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-6 flex items-center justify-center">
              <Lock className="h-10 w-10 text-primary" />
            </div>
            <h1 className="mb-2 text-center font-display text-2xl font-bold text-foreground">
              Admin Access
            </h1>
            <p className="mb-6 text-center text-sm text-muted-foreground">
              Enter the admin password to continue.
            </p>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-4"
              required
            />
            <Button type="submit" className="w-full">
              Unlock
            </Button>
          </motion.form>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-20">
        <div className="container mx-auto max-w-3xl px-6 py-12">
          <h1 className="font-display text-3xl font-bold text-foreground">
            Admin Panel
          </h1>

          {/* Create Post */}
          <motion.div
            className="mt-8 rounded-lg border border-border bg-card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-semibold text-foreground">
              <Plus className="h-5 w-5 text-primary" /> New Post
            </h2>
            <div className="space-y-4">
              <Input
                placeholder="Post title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <div className="flex gap-2">
                {["news", "announcement", "event"].map((c) => (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    className={`rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-wider transition-colors ${
                      category === c
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <Textarea
                placeholder="Write your post content..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={5}
              />
              <Button
                onClick={() => createPost.mutate()}
                disabled={!title || !content || createPost.isPending}
              >
                {createPost.isPending ? "Publishing..." : "Publish Post"}
              </Button>
            </div>
          </motion.div>

          {/* Existing Posts */}
          <h2 className="mt-12 font-display text-lg font-semibold text-foreground">
            Existing Posts
          </h2>
          {isLoading ? (
            <div className="mt-4 space-y-3">
              {[1, 2].map((i) => (
                <div key={i} className="h-20 animate-pulse rounded-lg bg-card" />
              ))}
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              {posts?.map((post) => (
                <div
                  key={post.id}
                  className="flex items-center justify-between rounded-lg border border-border bg-card p-4"
                >
                  <div>
                    <p className="font-display font-semibold text-foreground">
                      {post.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {post.category} · {format(new Date(post.created_at), "MMM d, yyyy")}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deletePost.mutate(post.id)}
                    disabled={deletePost.isPending}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default AdminPage;
