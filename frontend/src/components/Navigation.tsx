
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { useLocation, useNavigate } from "react-router-dom";
import api from "@/lib/api";

const Navigation = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);
  
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

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);
  
  const email = (document.getElementById("login-email") as HTMLInputElement).value;
  const password = (document.getElementById("login-password") as HTMLInputElement).value;

  if (!email || !password) {
    toast({
      title: "Validation Error",
      description: "Please fill in all fields.",
      variant: "destructive",
    });
    setIsLoading(false);
    return;
  }
  try {
    const res = await api.post("/users/login", {
      email,
      password,
    });

    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify({
        id: res.data._id,
        name: res.data.name,
        surname: res.data.surname,
        email: res.data.email
      }));
    }
    
    toast({
      title: "Login Successful!",
      description: "Welcome back to Afrilore.",
    });
    
    setIsLoggedIn(true);
    setIsLoginOpen(false);
    
    // Reset form
    (e.target as HTMLFormElement).reset();
  } catch (err: any) {
    console.error("Login error:", err);
    let errorMessage = "Invalid email or password.";
    
    if (err.code === 'ECONNABORTED') {
      errorMessage = "Connection timeout. The server might be starting up, please try again in a moment.";
    } else if (err.message === 'Network Error') {
      errorMessage = "Network error. Please check your internet connection and try again.";
    } else if (err.response?.data?.error || err.response?.data?.message) {
      errorMessage = err.response.data.error || err.response.data.message;
    }
    
    toast({
      title: "Login Failed",
      description: errorMessage,
      variant: "destructive",
    });
  } finally {
    setIsLoading(false);
  }
};


const handleRegister = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  const name = (document.getElementById("register-name") as HTMLInputElement).value;
  const surname = (document.getElementById("register-surname") as HTMLInputElement).value;
  const email = (document.getElementById("register-email") as HTMLInputElement).value;
  const password = (document.getElementById("register-password") as HTMLInputElement).value;

  if (!name || !surname || !email || !password) {
    toast({
      title: "Validation Error",
      description: "Please fill in all fields.",
      variant: "destructive",
    });
    setIsLoading(false);
    return;
  }

  if (password.length < 6) {
    toast({
      title: "Validation Error",
      description: "Password must be at least 6 characters long.",
      variant: "destructive",
    });
    setIsLoading(false);
    return;
  }

  try {
    const res = await api.post("/users/register", {
      name,
      surname,
      email,
      password,
    });

    toast({
      title: "Registration Successful!",
      description: "Welcome to Afrilore! You are now logged in.",
    });

    // Auto login after successful registration
    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify({
        id: res.data._id,
        name: res.data.name,
        surname: res.data.surname,
        email: res.data.email
      }));
      setIsLoggedIn(true);
      setIsLoginOpen(false);
    }
    
    // Reset form
    (e.target as HTMLFormElement).reset();
  } catch (err: any) {
    console.error("Registration error:", err);
    let errorMessage = "Registration failed. Please check your details.";
    
    if (err.code === 'ECONNABORTED') {
      errorMessage = "Connection timeout. The server might be starting up, please try again in a moment.";
    } else if (err.message === 'Network Error') {
      errorMessage = "Network error. Please check your internet connection and try again.";
    } else if (err.response?.data?.error || err.response?.data?.message) {
      errorMessage = err.response.data.error || err.response.data.message;
    }
    
    toast({
      title: "Registration Failed",
      description: errorMessage,
      variant: "destructive",
    });
  } finally {
    setIsLoading(false);
  }
};


const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
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
                      <Button 
                        type="submit" 
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                        disabled={isLoading}
                      >
                        {isLoading ? "Logging in..." : "Login"}
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
                        <Label htmlFor="register-password">Password (min 6 characters)</Label>
                        <Input id="register-password" type="password" placeholder="Create a password" required minLength={6} />
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                        disabled={isLoading}
                      >
                        {isLoading ? "Creating Account..." : "Register"}
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


