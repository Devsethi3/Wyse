"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Bot, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import type React from "react";
import ThemeSwitcher from "./ThemeSwitcher";
import { UserButton, useUser } from "@clerk/nextjs";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 border-b backdrop-blur-lg  left-0 right-0 z-50 transition-all duration-200
        ${scrolled ? "bg-white/80 dark:bg-black/80" : "bg-transparent"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link href="/" className="flex items-center space-x-2">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Bot className="w-8 h-8 text-purple-500 dark:text-purple-400" />
              </motion.div>
              <span className="text-zinc-800 dark:text-white font-medium text-xl">
                ResearchAI
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-between flex-1 ml-10">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center space-x-8"
            >
              <NavLink href="/features">Features</NavLink>
              <NavLink href="/how-it-works">How it Works</NavLink>
              <NavLink href="/examples">Examples</NavLink>
              <NavLink href="/pricing">Pricing</NavLink>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center space-x-4"
            >
              <ThemeSwitcher />

              {user ? (
                <UserButton
                  afterSwitchSessionUrl="/"
                  appearance={{
                    elements: {
                      userButtonAvatarBox: "w-8 h-8",
                      userButtonPopoverFooter: "hidden",
                    },
                  }}
                />
              ) : (
                <>
                  <Link href="/sign-in">
                    <Button
                      variant="secondary"
                      className="text-zinc-700 dark:text-zinc-300 hover:text-purple-600 dark:hover:text-purple-400"
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Button className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white">
                    Get Started
                  </Button>
                </>
              )}
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="md:hidden"
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-zinc-700 dark:text-zinc-300"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800"
          >
            <div className="px-4 py-2 space-y-1">
              <MobileNavLink href="/features" onClick={() => setIsOpen(false)}>
                Features
              </MobileNavLink>
              <MobileNavLink
                href="/how-it-works"
                onClick={() => setIsOpen(false)}
              >
                How it Works
              </MobileNavLink>
              <MobileNavLink href="/examples" onClick={() => setIsOpen(false)}>
                Examples
              </MobileNavLink>
              <MobileNavLink href="/pricing" onClick={() => setIsOpen(false)}>
                Pricing
              </MobileNavLink>
              <div className="pt-4 pb-2 space-y-2">
                <Button
                  variant="ghost"
                  className="w-full text-zinc-700 dark:text-zinc-300 hover:text-purple-600 dark:hover:text-purple-400"
                >
                  Sign In
                </Button>
                <Button className="w-full bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white">
                  Get Started
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="relative group text-zinc-700 dark:text-zinc-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
    >
      {children}
      <motion.span
        className="absolute -bottom-1 left-0 h-0.5 bg-purple-500 dark:bg-purple-400"
        initial={{ width: "0%" }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.3 }}
      />
    </Link>
  );
}

function MobileNavLink({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <motion.div whileTap={{ scale: 0.95 }}>
      <Link
        href={href}
        onClick={onClick}
        className="block py-2 text-base text-zinc-700 dark:text-zinc-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
      >
        {children}
      </Link>
    </motion.div>
  );
}
