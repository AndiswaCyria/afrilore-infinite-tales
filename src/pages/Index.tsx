
import Navigation from "@/components/Navigation";
import Features from "@/components/Features";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            One Subscription.
            <br />
            <span className="text-primary">Infinite Stories.</span>
          </h1>
          <p className="text-secondary text-lg md:text-xl max-w-2xl mx-auto mb-8 animate-slide-up">
            Unlock unlimited access to African literature, folklore, and educational content.
            Start your reading journey today.
          </p>
          <Button className="bg-primary hover:bg-primary/90 text-lg px-8 py-6 h-auto animate-slide-up">
            Start Your Free Trial
          </Button>
          <p className="text-sm text-secondary mt-4 animate-fade-in">
            No credit card required
          </p>
        </div>
      </section>

      {/* Features Section */}
      <Features />

      {/* Pricing Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">
            Simple, Affordable Pricing
          </h2>
          <p className="text-secondary mb-8 max-w-xl mx-auto">
            Access our entire library of books for one low monthly price.
            Cancel anytime.
          </p>
          <div className="bg-white rounded-lg shadow-lg max-w-md mx-auto p-8">
            <div className="font-playfair text-4xl font-bold text-primary mb-4">
              $9.99<span className="text-lg text-secondary">/month</span>
            </div>
            <ul className="text-left space-y-4 mb-8">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Unlimited access to all books
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Offline reading
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                New titles added monthly
              </li>
            </ul>
            <Button className="w-full bg-primary hover:bg-primary/90">
              Start Free Trial
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
