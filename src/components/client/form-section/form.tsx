"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function Form() {
  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "submitted" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("submitting");
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setFormStatus("submitted");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" placeholder="Your name" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" placeholder="Your email" type="email" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" placeholder="Your message" required />
      </div>
      <Button
        type="submit"
        className="w-full"
        disabled={formStatus === "submitting"}
      >
        {formStatus === "submitting" ? "Sending..." : "Send Message"}
      </Button>
      {formStatus === "submitted" && (
        <p className="text-green-600 dark:text-green-400">
          Thank you for your message. well be in touch soon!
        </p>
      )}
      {formStatus === "error" && (
        <p className="text-red-600 dark:text-red-400">
          There was an error sending your message. Please try again.
        </p>
      )}
    </form>
  );
}
