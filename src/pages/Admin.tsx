import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Newspaper, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import PostManager from "@/components/admin/PostManager";
import FleetManager from "@/components/admin/FleetManager";

const tabs = [
  { id: "posts", label: "Posts", icon: Newspaper },
  { id: "fleet", label: "Fleet", icon: Plane },
] as const;

type Tab = (typeof tabs)[number]["id"];

const AdminPage = () => {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [storedPassword, setStoredPassword] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("posts");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setStoredPassword(password);
    setAuthenticated(true);
  };

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

          {/* Tabs */}
          <div className="mt-6 flex gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === "posts" && <PostManager storedPassword={storedPassword} />}
          {activeTab === "fleet" && <FleetManager storedPassword={storedPassword} />}
        </div>
      </main>
    </>
  );
};

export default AdminPage;
