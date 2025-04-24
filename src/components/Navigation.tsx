
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-sm z-50 border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary" />
          <span className="font-playfair text-xl font-bold">Afrilore</span>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="text-secondary hover:text-primary">
            Login
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            Start Reading
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
