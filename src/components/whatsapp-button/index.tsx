"use client";

import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface WhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
}

export function WhatsAppButton({
  phoneNumber,
  message = "Hello! I'm interested in your services",
}: WhatsAppButtonProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      setIsVisible(window.scrollY > heroHeight * 0.8);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    const encodedMessage = encodeURIComponent(message);
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodedMessage}`,
      "_blank"
    );
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-main-500 p-4 text-white shadow-lg transition-all duration-300 hover:bg-main-600",
        "transform hover:scale-105",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
      )}
      aria-label="Contact on WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </button>
  );
}
