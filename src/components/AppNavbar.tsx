import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AppNavbar = () => {
  return (
    <nav className="w-full bg-background border-b border-border shadow-sm z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-foreground" />
          <span className="font-playfair text-xl font-bold text-foreground">Afrilore</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex gap-6 items-center">
          <Link
            to="/contact-us"
            className="text-foreground hover:text-primary transition-colors"
          >
            Contact
          </Link>
          <Link
            to="/help-center"
            className="text-foreground hover:text-primary transition-colors"
          >
            Help Center
          </Link>
          <Link to="/live-chat">
            <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Live Chat
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default AppNavbar;
