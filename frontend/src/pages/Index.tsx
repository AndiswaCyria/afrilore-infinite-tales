import Navigation from "@/components/Navigation";
import Features from "@/components/Features";
import FreeLibrary from "@/components/FreeLibrary";
import PreviewBooks from "@/components/PreviewBooks";
import AboutUs from "@/components/AboutUs";
import ContactUs from "@/components/ContactUs";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import axios from "axios";

const Index = () => {
  const [isTrialOpen, setIsTrialOpen] = useState(false);
  const [user, setUser] = useState<{ email: string } | null>(null);
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleStartTrial = async (e: React.FormEvent) => {
    e.preventDefault();

    const name = (document.getElementById("trial-name") as HTMLInputElement).value;
    const email = (document.getElementById("trial-email") as HTMLInputElement).value;
    const password = (document.getElementById("trial-password") as HTMLInputElement).value;

    try {
      const response = await fetch(`${baseUrl}/api/user/start-trial`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Welcome to Afrilore!",
          description: data.message || "Trial started successfully",
        });
        setIsTrialOpen(false);
      } else {
        toast({
          title: "Error",
          description: data.message || "Something went wrong",
        });
      }
    } catch (err) {
      toast({
        title: "Network Error",
        description: "Failed to start trial. Please try again.",
        variant: "destructive",
      });
    }
  };

  const scrollToPricing = () => {
    const pricingSection = document.getElementById("pricing");
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-6 animate-fade-in text-foreground">
            One Subscription.
            <br />
            <span className="text-primary">Infinite Stories.</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-8 animate-slide-up">
            Unlock unlimited access to African literature, folklore, and educational content.
            Start your reading journey today.
          </p>

          {/* Start Trial Dialog */}
          <Dialog open={isTrialOpen} onOpenChange={setIsTrialOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6 h-auto animate-slide-up">
                Start Your Free Trial
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Start Your Free Trial</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleStartTrial} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="trial-email">Email</Label>
                  <Input id="trial-email" type="email" placeholder="Enter your email" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="trial-name">Full Name</Label>
                  <Input id="trial-name" type="text" placeholder="Enter your full name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="trial-password">Password</Label>
                  <Input
                    id="trial-password"
                    type="password"
                    placeholder="Create a password"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Start Free Trial
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  No credit card required. Cancel anytime.
                </p>
              </form>
            </DialogContent>
          </Dialog>

          <p className="text-sm text-muted-foreground mt-4 animate-fade-in">
            No credit card required
          </p>
        </div>
      </section>

      {/* Features Section */}
      <Features />

      {/* Free Library Section */}
      <FreeLibrary />

      {/* Preview Books Section */}
      <PreviewBooks />

      {/* About Us Section */}
      <AboutUs />

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-muted/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Simple, Affordable Pricing
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Access our entire library of books for one low monthly price. Cancel anytime.
          </p>
          <div className="bg-card rounded-lg shadow-lg max-w-md mx-auto p-8 border border-border">
            <div className="font-playfair text-4xl font-bold text-primary mb-4">
              R50<span className="text-lg text-muted-foreground">/month</span>
            </div>
            <ul className="text-left space-y-4 mb-8">
              <li className="flex items-center gap-2 text-card-foreground">
                <span className="text-primary">✓</span> Unlimited access to all books
              </li>
              <li className="flex items-center gap-2 text-card-foreground">
                <span className="text-primary">✓</span> Offline reading
              </li>
              <li className="flex items-center gap-2 text-card-foreground">
                <span className="text-primary">✓</span> New titles added monthly
              </li>
            </ul>
            <Button
              onClick={() => setIsTrialOpen(true)}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Start Free Trial
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <ContactUs />
    </div>
  );
};

export default Index;

