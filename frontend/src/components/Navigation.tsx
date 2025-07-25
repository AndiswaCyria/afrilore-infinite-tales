
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { useLocation, useNavigate } from "react-router-dom";

const Navigation = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleStartReading = () => {
    if (location.pathname === '/' || location.pathname === '/index') {
      // Scroll to pricing section on index page
      const pricingSection = document.getElementById('pricing');
      if (pricingSection) {
        pricingSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to index page from other pages
      navigate('/');
    }
  };

  const handleHomeClick = () => {
    if (location.pathname === '/' || location.pathname === '/index') {
      // Scroll to top on index page
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Navigate to index page from other pages
      navigate('/');
    }
  };

  const handleNavigationClick = (sectionId: string) => {
    if (location.pathname === '/' || location.pathname === '/index') {
      // Scroll to section on index page
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to index page and then scroll (handled by navigate)
      navigate('/', { state: { scrollTo: sectionId } });
    }
  };
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Login Successful!",
      description: "Welcome back to Afrilore.",
    });
    setIsLoggedIn(true);
    setIsLoginOpen(false);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Registration Successful!",
      description: "Welcome to Afrilore! You can now access our free books library.",
    });
    setIsLoggedIn(true);
    setIsLoginOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };
  return (
    <nav className="fixed w-full bg-background/80 backdrop-blur-sm z-50 border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-foreground" />
          <span className="font-playfair text-xl font-bold text-foreground">Afrilore</span>
        </div>
        
        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-6">
          <Button
            onClick={handleHomeClick}
            variant="ghost"
            className="text-foreground hover:text-primary transition-colors"
          >
            Home
          </Button>
          <Button 
            onClick={() => handleNavigationClick('about')}
            variant="ghost"
            className="text-foreground hover:text-primary transition-colors"
          >
            About
          </Button>
          <Button
            onClick={() => handleNavigationClick('free-library')}
            variant="ghost"
            className="text-foreground hover:text-primary transition-colors"
          >
            Free Library
          </Button>
          <Button
            onClick={() => handleNavigationClick('contact')}
            variant="ghost"
            className="text-foreground hover:text-primary transition-colors"
          >
            Contact
          </Button>
        </div>
        <div className="flex items-center gap-4">
          {!isLoggedIn ? (
            <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" className="text-foreground hover:text-primary">
                  Login / Register
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Welcome to Afrilore</DialogTitle>
                </DialogHeader>
                <Tabs defaultValue="login" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="register">Register</TabsTrigger>
                  </TabsList>
                  <TabsContent value="login">
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="login-email">Email</Label>
                        <Input id="login-email" type="email" placeholder="Enter your email" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="login-password">Password</Label>
                        <Input id="login-password" type="password" placeholder="Enter your password" required />
                      </div>
                      <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                        Login
                      </Button>
                    </form>
                  </TabsContent>
                  <TabsContent value="register">
                    <form onSubmit={handleRegister} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="register-name">Name</Label>
                          <Input id="register-name" type="text" placeholder="First name" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="register-surname">Surname</Label>
                          <Input id="register-surname" type="text" placeholder="Last name" required />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="register-email">Email</Label>
                        <Input id="register-email" type="email" placeholder="Enter your email" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="register-password">Create New Password</Label>
                        <Input id="register-password" type="password" placeholder="Create a password" required />
                      </div>
                      <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                        Register
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </DialogContent>
            </Dialog>
          ) : (
            <div className="flex items-center gap-4">
              <Button 
                onClick={() => handleNavigationClick('free-library')}
                variant="ghost" 
                className="text-foreground hover:text-primary"
              >
                Free Library
              </Button>
              <Button 
                onClick={handleLogout}
                variant="ghost" 
                className="text-foreground hover:text-primary"
              >
                Logout
              </Button>
            </div>
          )}
          <Button 
            onClick={handleStartReading}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Start Reading
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
