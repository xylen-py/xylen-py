"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import TechOrbit from "./components/TechOrbit";
import CodeSlideshow from "./components/CodeSlideshow";
import Projects from "./components/Projects";
import GithubStats from "./components/GithubStats";
import Testimonials from "./components/Testimonials";
import Experience from "./components/Experience";
import Footer from "./components/Footer";
import CursorGlow from "./components/CursorGlow";
import { PurpleFlare } from "./components/Effects";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

function PageLoader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: "#0d0d0d" }}
    >
      <div className="flex flex-col items-center gap-6">
        <motion.div className="relative w-20 h-20">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-accent-primary border-r-accent-tertiary"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-2 rounded-full border-2 border-transparent border-b-accent-secondary border-l-accent-primary"
          />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute inset-4 rounded-full border border-transparent border-t-accent-tertiary/50"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-3 h-3 rounded-full bg-accent-primary shadow-[0_0_20px_rgba(167,139,250,0.5)]" />
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-sm font-mono text-charcoal-400 tracking-[0.3em]"
        >
          INITIALIZING
        </motion.div>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 120 }}
          transition={{ duration: 1.2, ease: EASE }}
          className="h-[2px] rounded-full bg-gradient-to-r from-accent-primary via-accent-tertiary to-accent-secondary"
        />
      </div>
    </motion.div>
  );
}

function SectionDivider() {
  return (
    <div className="relative h-px w-full max-w-[1200px] mx-auto">
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: EASE }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-accent-primary/20 to-transparent origin-center"
      />
    </div>
  );
}

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <CursorGlow />
      <AnimatePresence>
        {loading && <PageLoader />}
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <Navbar />
        <main>
          <Hero />
          <SectionDivider />
          <About />
          <SectionDivider />

          {/* Tech Orbit Section */}
          <section className="relative overflow-hidden">
            <PurpleFlare className="top-0 right-1/4" size={350} delay={0.2} />
            <PurpleFlare className="bottom-0 left-1/3" size={300} delay={0.4} />
            <div className="section-container relative z-10">
              <div className="text-center mb-4">
                <span className="text-sm font-mono text-accent-primary tracking-widest uppercase mb-4 block">
                  {"// Tech Universe"}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                  My <span className="gradient-text">Tech Stack</span>
                </h2>
                <p className="mt-3 text-charcoal-300 max-w-md mx-auto">
                  The technologies orbiting my development workflow
                </p>
              </div>
              <TechOrbit />
            </div>
          </section>

          <SectionDivider />
          <Skills />
          <SectionDivider />

          <section className="relative overflow-hidden">
            <PurpleFlare className="top-0 left-1/4" size={400} delay={0.2} />
            <PurpleFlare className="bottom-0 right-1/4" size={350} delay={0.4} />
            <div className="section-container relative z-10">
              <div className="text-center mb-8">
                <span className="text-sm font-mono text-accent-primary tracking-widest uppercase mb-4 block">{"// Live Code"}</span>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">What I <span className="gradient-text">Write</span></h2>
              </div>
              <CodeSlideshow />
            </div>
          </section>

          <SectionDivider />
          <Projects />
          <SectionDivider />
          <GithubStats />
          <SectionDivider />
          <Testimonials />
          <SectionDivider />
          <Experience />
        </main>
        <Footer />
      </motion.div>
    </>
  );
}
