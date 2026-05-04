"use client";

import { motion } from "framer-motion";

interface RevealTextProps {
  text?: string;
  textColor?: string;
  fontSize?: string;
  letterDelay?: number;
  className?: string;
  gradient?: boolean;
}

export function RevealText({
  text = "MakiCalls",
  textColor = "text-white",
  fontSize = "text-[88px] md:text-[140px]",
  letterDelay = 0.06,
  className = "",
  gradient = true,
}: RevealTextProps) {
  return (
    <div className={`flex items-center justify-center relative ${className}`}>
      <div className="flex">
        {text.split("").map((letter, index) => (
          <motion.span
            key={index}
            className={`${fontSize} font-black tracking-[-0.04em] cursor-default relative leading-none`}
            initial={{
              scale: 0,
              opacity: 0,
              filter: "blur(20px)",
            }}
            animate={{
              scale: 1,
              opacity: 1,
              filter: "blur(0px)",
            }}
            transition={{
              delay: index * letterDelay,
              type: "spring",
              damping: 12,
              stiffness: 180,
              mass: 0.9,
            }}
          >
            {gradient ? (
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-[#e9d5ff] to-[#a78bfa]">
                {letter === " " ? " " : letter}
              </span>
            ) : (
              <span className={textColor}>{letter === " " ? " " : letter}</span>
            )}
          </motion.span>
        ))}
      </div>
    </div>
  );
}
