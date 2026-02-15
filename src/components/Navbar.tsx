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

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold text-foreground">
          <img src={logo} alt="Pop! Airways" className="h-8" />
          Pop! Airways
        </Link>

        {/* Desktop */}
        <div className="hidden gap-6 sm:flex">
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
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {l.label}
              </Link>
            )
          )}
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
            <div className="py-4">
              {allLinks.map((l) =>
                l.isHash ? (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {l.label}
                  </a>
                ) : (
                  <Link
                    key={l.href}
                    to={l.href}
                    onClick={() => setOpen(false)}
                    className="block py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {l.label}
                  </Link>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
