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
import api from "@/lib/api"; 



const Index = () => {
  const [isTrialOpen, setIsTrialOpen] = useState(false);
  const [user, setUser] = useState<{ email: string } | null>(null);
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const [trialName, setTrialName] = useState("");
  const [trialEmail, setTrialEmail] = useState(""); 
  const [trialPassword, setTrialPassword] = useState("");


  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleStartTrial = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!trialName || !trialEmail || !trialPassword) {
    toast({
      title: "Validation Error",
      description: "Please fill in all fields.",
      variant: "destructive",
    });
    return;
  }

  if (trialPassword.length < 6) {
    toast({
      title: "Validation Error", 
      description: "Password must be at least 6 characters long.",
      variant: "destructive",
    });
    return;
  }

  try {
    // Split name into first and last name for backend compatibility
    const nameParts = trialName.trim().split(' ');
    const firstName = nameParts[0] || trialName;
    const lastName = nameParts.slice(1).join(' ') || 'User';
    
    const response = await api.post("/users/register", {
      name: firstName,
      surname: lastName,
      email: trialEmail,
      password: trialPassword,
    });

    const data = response.data;
    
    // Store user data and token
    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify({
        id: data._id,
        name: data.name,
        surname: data.surname,
        email: data.email
      }));
    }

    toast({
      title: "Welcome to Afrilore!",
      description: "Your account has been created successfully!",
    });

    setUser({ email: trialEmail });
    setIsTrialOpen(false);
    
    // Reset form
    setTrialName("");
    setTrialEmail("");
    setTrialPassword("");
  } catch (err: any) {
    console.error("Trial registration error:", err);
    console.error("Error response:", err.response?.data);
    let errorMessage = "Something went wrong. Please try again.";
    
    if (err.code === 'ECONNABORTED') {
      errorMessage = "Connection timeout. The server might be starting up, please try again in a moment.";
    } else if (err.message === 'Network Error') {
      errorMessage = "Network error. Please check your internet connection and try again.";
    } else if (err.response?.data?.error || err.response?.data?.message) {
      errorMessage = err.response.data.error || err.response.data.message;
    }
    
    toast({
      title: "Error",
      description: errorMessage,
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
                  <Input
                      id="trial-email"
                      type="text"
                      placeholder="Enter your email"
                      required
                      value={trialEmail}
                      onChange={(e) => setTrialEmail(e.target.value)}
                    />

                </div>
                <div className="space-y-2">
                  <Label htmlFor="trial-name">Full Name</Label>
                  <Input
                      id="trial-name"
                      type="text"
                      placeholder="Enter your full name"
                      required
                      value={trialName}
                      onChange={(e) => setTrialName(e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="trial-password">Password</Label>
                  <Input
                      id="trial-password"
                      type="password"
                      placeholder="Enter your password"
                      required
                      value={trialPassword}
                      onChange={(e) => setTrialPassword(e.target.value)}
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

