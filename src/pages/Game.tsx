import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plane, RotateCcw, Trophy, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface City {
  name: string;
  code: string;
  x: number;
  y: number;
  region: string;
}

const cities: City[] = [
  { name: "London", code: "LHR", x: 48, y: 25, region: "Europe" },
  { name: "Paris", code: "CDG", x: 50, y: 28, region: "Europe" },
  { name: "New York", code: "JFK", x: 25, y: 30, region: "Americas" },
  { name: "Dubai", code: "DXB", x: 62, y: 38, region: "Middle East" },
  { name: "Tokyo", code: "NRT", x: 85, y: 30, region: "Asia" },
  { name: "Sydney", code: "SYD", x: 87, y: 72, region: "Oceania" },
  { name: "Singapore", code: "SIN", x: 78, y: 52, region: "Asia" },
  { name: "Los Angeles", code: "LAX", x: 12, y: 33, region: "Americas" },
  { name: "São Paulo", code: "GRU", x: 33, y: 65, region: "Americas" },
  { name: "Cairo", code: "CAI", x: 58, y: 36, region: "Africa" },
  { name: "Mumbai", code: "BOM", x: 70, y: 42, region: "Asia" },
  { name: "Frankfurt", code: "FRA", x: 52, y: 24, region: "Europe" },
];

function generateChallenge() {
  const shuffled = [...cities].sort(() => Math.random() - 0.5);
  const route = shuffled.slice(0, 4);
  return { route, target: route.map((c) => c.code) };
}

const FlightGamePage = () => {
  const [challenge, setChallenge] = useState(generateChallenge);
  const [selected, setSelected] = useState<string[]>([]);
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [wrong, setWrong] = useState(false);

  const isCorrectSoFar = useMemo(() => {
    return selected.every((code, i) => code === challenge.target[i]);
  }, [selected, challenge.target]);

  const handleCityClick = useCallback(
    (code: string) => {
      if (completed || selected.includes(code)) return;
      const next = [...selected, code];
      setSelected(next);

      if (code !== challenge.target[next.length - 1]) {
        setWrong(true);
        setTimeout(() => {
          setSelected([]);
          setWrong(false);
        }, 800);
        return;
      }

      if (next.length === challenge.target.length) {
        setCompleted(true);
        setScore((s) => s + 1);
      }
    },
    [selected, challenge, completed]
  );

  const nextRound = () => {
    setChallenge(generateChallenge());
    setSelected([]);
    setCompleted(false);
    setWrong(false);
    setRound((r) => r + 1);
  };

  const restart = () => {
    setChallenge(generateChallenge());
    setSelected([]);
    setCompleted(false);
    setWrong(false);
    setScore(0);
    setRound(1);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-20">
        <div className="container mx-auto max-w-4xl px-6 py-12">
          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-display text-4xl font-bold text-foreground sm:text-5xl">
              Flight Path Challenge
            </h1>
            <p className="mt-3 text-muted-foreground">
              Click the airports in the correct order to complete the route.
            </p>
          </motion.div>

          {/* Stats */}
          <div className="mt-8 flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Trophy className="h-4 w-4 text-primary" />
              Score: <span className="font-semibold text-foreground">{score}</span>
            </div>
            <div className="text-sm text-muted-foreground">
              Round: <span className="font-semibold text-foreground">{round}</span>
            </div>
            <Button variant="ghost" size="sm" onClick={restart}>
              <RotateCcw className="mr-1 h-4 w-4" /> Reset
            </Button>
          </div>

          {/* Route to follow */}
          <motion.div
            className="mt-6 rounded-lg border border-border bg-card p-4"
            key={round}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Route to fly
            </p>
            <div className="flex flex-wrap items-center gap-2">
              {challenge.route.map((city, i) => {
                const isDone = selected[i] === city.code;
                return (
                  <div key={city.code} className="flex items-center gap-2">
                    {i > 0 && (
                      <Plane className="h-3 w-3 rotate-90 text-muted-foreground" />
                    )}
                    <span
                      className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                        isDone
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground"
                      }`}
                    >
                      {city.code} — {city.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            className="relative mt-8 aspect-[2/1] w-full overflow-hidden rounded-xl border border-border bg-card"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {/* Grid lines */}
            <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
              {/* Draw connections for selected route */}
              {selected.map((code, i) => {
                if (i === 0) return null;
                const from = cities.find((c) => c.code === selected[i - 1]);
                const to = cities.find((c) => c.code === code);
                if (!from || !to) return null;
                return (
                  <motion.line
                    key={`line-${i}`}
                    x1={`${from.x}%`}
                    y1={`${from.y}%`}
                    x2={`${to.x}%`}
                    y2={`${to.y}%`}
                    stroke="hsl(var(--primary))"
                    strokeWidth="2"
                    strokeDasharray="6 4"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                );
              })}
            </svg>

            {/* Cities */}
            {cities.map((city) => {
              const isInRoute = challenge.target.includes(city.code);
              const isSelected = selected.includes(city.code);
              const isNext =
                !completed &&
                isInRoute &&
                !isSelected &&
                challenge.target[selected.length] === city.code;

              return (
                <motion.button
                  key={city.code}
                  className={`absolute flex flex-col items-center transition-all ${
                    isInRoute ? "cursor-pointer" : "cursor-default opacity-30"
                  }`}
                  style={{
                    left: `${city.x}%`,
                    top: `${city.y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                  onClick={() => isInRoute && handleCityClick(city.code)}
                  whileHover={isInRoute ? { scale: 1.2 } : {}}
                  whileTap={isInRoute ? { scale: 0.9 } : {}}
                >
                  <MapPin
                    className={`h-5 w-5 sm:h-6 sm:w-6 ${
                      isSelected
                        ? "text-primary"
                        : isNext
                        ? "animate-pulse text-primary"
                        : "text-muted-foreground"
                    }`}
                  />
                  <span
                    className={`mt-0.5 text-[10px] font-semibold sm:text-xs ${
                      isSelected ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {city.code}
                  </span>
                </motion.button>
              );
            })}
          </motion.div>

          {/* Wrong feedback */}
          <AnimatePresence>
            {wrong && (
              <motion.p
                className="mt-4 text-center text-sm font-medium text-destructive"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                Wrong airport! Try again.
              </motion.p>
            )}
          </AnimatePresence>

          {/* Completion */}
          <AnimatePresence>
            {completed && (
              <motion.div
                className="mt-6 flex flex-col items-center gap-4 rounded-lg border border-primary/30 bg-primary/5 p-6"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                <Trophy className="h-8 w-8 text-primary" />
                <p className="font-display text-lg font-semibold text-foreground">
                  Route completed!
                </p>
                <Button onClick={nextRound}>Next Route →</Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <FooterSection />
    </>
  );
};

export default FlightGamePage;
