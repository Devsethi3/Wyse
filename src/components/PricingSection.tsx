"use client";

import { PricingCard } from "./PricingCard";
import { Zap, Rocket, Star } from "lucide-react";

const basicFeatures = [
  {
    icon: <Zap className="w-4 h-4" />,
    title: "5 Projects",
    description: "Create up to 5 projects",
  },
  {
    icon: <Zap className="w-4 h-4" />,
    title: "Basic Analytics",
    description: "Track your project performance",
  },
  {
    icon: <Zap className="w-4 h-4" />,
    title: "24/7 Support",
    description: "Get help when you need it",
  },
];

const proFeatures = [
  {
    icon: <Rocket className="w-4 h-4" />,
    title: "Unlimited Projects",
    description: "Create as many projects as you need",
    highlight: true,
  },
  {
    icon: <Rocket className="w-4 h-4" />,
    title: "Advanced Analytics",
    description: "Gain deeper insights into your projects",
  },
  {
    icon: <Rocket className="w-4 h-4" />,
    title: "Priority Support",
    description: "Get faster responses to your queries",
    highlight: true,
  },
];

const enterpriseFeatures = [
  {
    icon: <Star className="w-4 h-4" />,
    title: "Custom Solutions",
    description: "Tailored features for your business",
    highlight: true,
  },
  {
    icon: <Star className="w-4 h-4" />,
    title: "Dedicated Account Manager",
    description: "Personalized support and guidance",
  },
  {
    icon: <Star className="w-4 h-4" />,
    title: "SLA",
    description: "Guaranteed uptime and performance",
    highlight: true,
  },
];

export function PricingSection() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-4xl font-bold text-center text-zinc-900 dark:text-zinc-100">
        Choose Your Plan
      </h2>
      <p className="mb-16 text-center text-muted-foreground text-sm">
        Everything you need to scale your business
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <PricingCard
          name="Basic Plan"
          description="For individuals"
          price="$9"
          features={basicFeatures}
          icon={Zap}
        />
        <PricingCard
          name="Pro Plan"
          description="For growing teams"
          price="$29"
          features={proFeatures}
          popular={true}
          icon={Rocket}
        />
        <PricingCard
          name="Enterprise Plan"
          description="For large organizations"
          price="$99"
          features={enterpriseFeatures}
          icon={Star}
        />
      </div>
    </div>
  );
}
