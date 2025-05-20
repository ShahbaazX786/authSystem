import { motion } from "framer-motion";
import type { FloatingShapePropType } from "../utils/types";

const FloatingShapes = ({
  color,
  size,
  top,
  left,
  delay,
}: FloatingShapePropType) => {
  return (
    <motion.div
      className={`absolute rounded-full ${color} ${size} opacity-20 blur-xl`}
      style={{ top, left }}
      animate={{
        x: ["0%", "100%", "0%"],
        y: ["0%", "100%", "0%"],
        rotate: [0, 360],
      }}
      transition={{
        duration: 20,
        ease: "linear",
        repeat: Infinity,
        delay,
      }}
      aria-hidden="true"
    />
  );
};

export default FloatingShapes;
