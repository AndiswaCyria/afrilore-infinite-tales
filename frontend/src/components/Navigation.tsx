
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const Navigation = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleStartReading = () => {
    // Scroll to pricing section
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
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
        <div className="hidden md:flex items-center gap-4">
          <Button 
            variant="ghost"
            onClick={() => scrollToSection('about')}
            className="text-foreground hover:text-primary transition-colors"
          >
            About
          </Button>
          <Button
            variant="ghost"
            onClick={() => scrollToSection('free-library')}
            className="text-foreground hover:text-primary transition-colors"
          >
            Free Library
          </Button>
          <Button
            variant="ghost"
            onClick={() => scrollToSection('preview-books')}
            className="text-foreground hover:text-primary transition-colors"
          >
            Premium Books
          </Button>
          <Button
            variant="ghost"
            onClick={() => scrollToSection('contact')}
            className="text-foreground hover:text-primary transition-colors"
          >
            Contact
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobile && (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                <Button 
                  variant="ghost"
                  onClick={() => scrollToSection('about')}
                  className="justify-start text-foreground hover:text-primary transition-colors"
                >
                  About
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => scrollToSection('free-library')}
                  className="justify-start text-foreground hover:text-primary transition-colors"
                >
                  Free Library
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => scrollToSection('preview-books')}
                  className="justify-start text-foreground hover:text-primary transition-colors"
                >
                  Premium Books
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => scrollToSection('contact')}
                  className="justify-start text-foreground hover:text-primary transition-colors"
                >
                  Contact
                </Button>
                {!isLoggedIn ? (
                  <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="justify-start mt-4">
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
                  <div className="flex flex-col gap-2 mt-4">
                    <Button 
                      onClick={() => {
                        const librarySection = document.getElementById('free-library');
                        if (librarySection) {
                          librarySection.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      variant="ghost" 
                      className="justify-start text-foreground hover:text-primary"
                    >
                      Free Library
                    </Button>
                    <Button 
                      onClick={handleLogout}
                      variant="ghost" 
                      className="justify-start text-foreground hover:text-primary"
                    >
                      Logout
                    </Button>
                  </div>
                )}
                <Button 
                  onClick={handleStartReading}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground mt-4"
                >
                  Start Reading
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        )}

        <div className="flex items-center gap-4">
          {!isMobile && !isLoggedIn ? (
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
          ) : !isMobile && isLoggedIn ? (
            <div className="flex items-center gap-4">
              <Button 
                onClick={() => {
                  const librarySection = document.getElementById('free-library');
                  if (librarySection) {
                    librarySection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
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
          {!isMobile && (
            <Button 
              onClick={handleStartReading}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Start Reading
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
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
