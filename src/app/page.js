"use client";
import { useState, useEffect } from "react";
import Hero from "../components/Hero";
import Sidebar from "../components/Sidebar";
import Background from "../components/Background";
import { IoIosInfinite } from "react-icons/io";

export default function Home() {
  const [activeSection, setActiveSection] = useState("about");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "skills", "experience", "projects"];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gray-900 z-[9999] flex items-center justify-center">
        <div className="text-8xl text-blue-400">
          <span className="loading-infinity-symbol">
            <IoIosInfinite />
          </span>
        </div>
        <p className="sr-only">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen relative overflow-hidden">
      {/* Premium animated background & spring-smoothed mouse glow */}
      <Background />

      <Sidebar active={activeSection} />
      <Hero />
    </div>
  );
}
