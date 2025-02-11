"use client";

import Input from "@/components/Input";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Brain, Zap, Clock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PricingSection } from "@/components/PricingSection";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.6),rgba(0,0,0,0))]">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div
            initial="initial"
            animate="animate"
            variants={stagger}
            className="text-center space-y-8"
          >
            <motion.div variants={fadeInUp} className="space-y-4">
              <div className="flex items-center justify-center space-x-2 mb-6">
                <span className="px-3 py-1 text-sm text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center gap-1">
                  <Sparkles className="w-4 h-4" />
                  <span>Powered by AI</span>
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-800 dark:text-white">
                Transform Your Research
                <span className="text-purple-600 dark:text-purple-400">
                  {" "}
                  with AI
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-300 max-w-3xl mx-auto">
                Streamline your research process with advanced AI tools.
                Analyze, synthesize, and generate insights faster than ever
                before.
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto"
            >
              <Input
                type="text"
                placeholder="Enter your email"
                className="w-full"
              />
              <Button className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white">
                Get Started <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="p-6 rounded-2xl bg-white/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 backdrop-blur-sm"
              >
                <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-zinc-800 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center"
              >
                <div className="text-3xl sm:text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>
        <section className="container my-10">
          <div className="flex items-center">
            <PricingSection />
          </div>
        </section>
      </main>
    </>
  );
}

const features = [
  {
    icon: <Brain className="w-6 h-6 text-purple-600 dark:text-purple-400" />,
    title: "AI-Powered Analysis",
    description:
      "Advanced algorithms analyze your research data to uncover hidden patterns and insights.",
  },
  {
    icon: <Zap className="w-6 h-6 text-purple-600 dark:text-purple-400" />,
    title: "Lightning Fast",
    description:
      "Get results in seconds, not hours. Speed up your research process dramatically.",
  },
  {
    icon: <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400" />,
    title: "Save Time",
    description:
      "Automate repetitive tasks and focus on what matters most in your research.",
  },
  {
    icon: <Shield className="w-6 h-6 text-purple-600 dark:text-purple-400" />,
    title: "Secure & Private",
    description:
      "Your research data is encrypted and protected with enterprise-grade security.",
  },
];

const stats = [
  {
    value: "500K+",
    label: "Researchers",
  },
  {
    value: "50M+",
    label: "Papers Analyzed",
  },
  {
    value: "99.9%",
    label: "Accuracy Rate",
  },
  {
    value: "24/7",
    label: "Support",
  },
];
