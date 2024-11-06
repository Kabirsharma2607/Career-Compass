"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import Collab from "@/components/collaborative-filtering";
import Knowledge from "@/components/knowledge-based";

function Recommendations() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(false);
  const searchParams = useSearchParams();
  const { toast } = useToast();

  useEffect(() => {
    setFadeIn(true);
  }, [searchParams, toast]);

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      animate={fadeIn ? "visible" : "hidden"}
      variants={fadeInVariants}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white"
    >
      <nav className="sticky top-0 bg-white bg-opacity-10 backdrop-blur-md shadow-lg p-4  text-white z-10 ">
        <ul className="flex space-x-4 justify-center">
          <NavItem
            isActive={activeIndex === 0}
            onClick={() => setActiveIndex(0)}
          >
            Collaborative Filtering
          </NavItem>
          <NavItem
            isActive={activeIndex === 1}
            onClick={() => setActiveIndex(1)}
          >
            Knowledge-Based Recommendations
          </NavItem>
        </ul>
      </nav>

      {activeIndex === 0 ? <Collab /> : <Knowledge />}
    </motion.div>
  );
}

// Wrapper Component with Suspense
export default function RecommendationsWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Recommendations />
    </Suspense>
  );
}

interface NavItemProps {
  //href: string;
  isActive: boolean;
  children: React.ReactNode;
  onClick: () => void;
}

function NavItem({ isActive, children, onClick }: NavItemProps) {
  return (
    <li>
      <div
        //href={href}
        className={cn(
          "relative px-4 py-2 rounded-md  text-base font-medium transition-colors duration-200 cursor-pointer ",
          isActive ? "text-yellow-400" : "text-white hover:text-yellow-300"
        )}
        onClick={onClick}
      >
        {children}
        {isActive && (
          <motion.div
            onClick={onClick}
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-400"
            layoutId="underline"
            initial={false}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30,
            }}
          />
        )}
      </div>
    </li>
  );
}
