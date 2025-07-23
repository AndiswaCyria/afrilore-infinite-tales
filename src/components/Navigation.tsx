
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  return (
    <nav className="fixed w-full bg-background/80 backdrop-blur-sm z-50 border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-foreground" />
          <span className="font-playfair text-xl font-bold text-foreground">Afrilore</span>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="text-foreground hover:text-primary">
            Login
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Start Reading
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
