import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { theme } from "../theme";

const texts = [
  "AI-Powered Stock Analysis",
  "Real-Time Market Data",
  "Smart Investment Recommendations",
  "Risk Assessment Tools",
  "Portfolio Management",
  "Market Insights",
];

export function RevolvingText() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 3000); // Change text every 3 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`h-15 overflow-hidden relative rounded-lg p-4 w-[400px] flex items-center ${theme.typography.fontFamily}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="absolute w-full h-full flex items-center justify-center"
        >
          <div className="text-2xl font-semibold text-[#2fce5c] opacity-70 text-center px-4 leading-tight">
            {texts[currentIndex]}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
} 