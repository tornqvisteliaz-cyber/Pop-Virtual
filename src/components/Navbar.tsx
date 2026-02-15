import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo.webp";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "News", href: "/news" },
  { label: "Game", href: "/game" },
];

const hashLinks = [
  { label: "About", href: "/#about" },
  { label: "Fleet", href: "/#fleet" },
  { label: "Join", href: "/#join" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  const allLinks = isHome
    ? [
        { label: "About", href: "#about", isHash: true },
        { label: "Fleet", href: "#fleet", isHash: true },
        { label: "News", href: "/news", isHash: false },
        { label: "Game", href: "/game", isHash: false },
        { label: "Join", href: "#join", isHash: true },
      ]
    : [
        { label: "Home", href: "/", isHash: false },
        { label: "News", href: "/news", isHash: false },
        { label: "Game", href: "/game", isHash: false },
      ];

  const adminLink = { label: "Admin", href: "/admin", isHash: false };

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-border/50 bg-background/70 backdrop-blur-xl">
      <div className="container mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
        <Link to="/" className="flex items-center gap-2.5 font-display text-lg font-bold text-foreground">
          <img src={logo} alt="Pop! Airways" className="h-9" />
          <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">Pop! Airways</span>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-5 sm:flex">
          {allLinks.map((l) =>
            l.isHash ? (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            ) : (
              <Link
                key={l.href}
                to={l.href}
                className={`text-sm transition-colors hover:text-foreground ${
                  location.pathname === l.href
                    ? "text-foreground font-medium"
                    : "text-muted-foreground"
                }`}
              >
                {l.label}
              </Link>
            )
          )}
          <Link
            to={adminLink.href}
            className={`ml-1 rounded-md border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary transition-all hover:bg-primary/20 hover:border-primary/50 ${
              location.pathname === "/admin" ? "bg-primary/20 border-primary/50" : ""
            }`}
          >
            {adminLink.label}
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="text-foreground sm:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-border bg-background px-6 sm:hidden"
          >
            <div className="space-y-1 py-4">
              {allLinks.map((l) =>
                l.isHash ? (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  >
                    {l.label}
                  </a>
                ) : (
                  <Link
                    key={l.href}
                    to={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  >
                    {l.label}
                  </Link>
                )
              )}
              <Link
                to={adminLink.href}
                onClick={() => setOpen(false)}
                className="mt-2 block rounded-md border border-primary/30 bg-primary/10 px-3 py-2 text-center text-xs font-semibold uppercase tracking-wider text-primary transition-all hover:bg-primary/20"
              >
                {adminLink.label}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
