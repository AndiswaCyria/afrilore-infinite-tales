import { BookOpen, Lock, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import axios from "axios";

const previewBooks = [
  {
    id: 1,
    title: "Americanah",
    author: "Chimamanda Ngozi Adichie",
    description: "A powerful story about identity, belonging, and the immigrant experience in America.",
    cover: "https://shop.tenement.org/wp-content/uploads/2019/10/americana-741x800.jpg",
    genre: "Contemporary Fiction",
    pages: 477,
    rating: 4.3,
    preview: "Ifemelu had grown up in the shadow of her mother's hair..."
  },
  {
    id: 2,
    title: "Half of a Yellow Sun",
    author: "Chimamanda Ngozi Adichie",
    description: "Set during the Nigerian Civil War, this novel explores love, loss, and the struggle for survival.",
    cover: "https://www.chimamanda.com/wp-content/uploads/2021/09/Half-of-a-Yellow-Sun-fx.jpg",
    genre: "Historical Fiction",
    pages: 433,
    rating: 4.4,
    preview: "Master was a little crazy; he had spent too many years reading books overseas..."
  },
  {
    id: 3,
    title: "The Joys of Motherhood",
    author: "Buchi Emecheta",
    description: "A poignant exploration of motherhood and women's roles in traditional Nigerian society.",
    cover: "https://www.thecornrow.com/cdn/shop/products/228ee357-f218-48b6-84e8-392b0f81763d_d43170b5-497a-499e-bf4b-3297075ee5ed_1080x.jpg?v=1687438782",
    genre: "Literary Fiction",
    pages: 224,
    rating: 4.1,
    preview: "Nnu Ego measured a woman's worth by the number of her children..."
  },
  {
    id: 4,
    title: "Nervous Conditions",
    author: "Tsitsi Dangarembga",
    description: "A coming-of-age story set in colonial Zimbabwe, exploring education and cultural identity.",
    cover: "https://cdn11.bigcommerce.com/s-40cb1enqki/images/stencil/1280x1280/products/162/442/b9170s1_Nervous_Conditions__96118.1699303560.jpg?c=1",
    genre: "Coming of Age",
    pages: 204,
    rating: 4.2,
    preview: "I was not sorry when my brother died. Nor am I apologizing for my callousness..."
  },
  {
    id: 5,
    title: "Disgrace",
    author: "J.M. Coetzee",
    description: "A controversial novel about post-apartheid South Africa and moral reckoning.",
    cover: "https://d2wzqffx6hjwip.cloudfront.net/spree/images/attachments/000/047/865/original/9781925773859.jpg?1605812506",
    genre: "Literary Fiction",
    pages: 220,
    rating: 3.9,
    preview: "For a man of his age, fifty-two, divorced, he has, to his mind, solved the problem of sex rather well..."
  },
  {
    id: 6,
    title: "Waiting for the Barbarians",
    author: "J.M. Coetzee",
    description: "An allegory about colonialism and the nature of civilization and barbarism.",
    cover: "https://images.pangobooks.com/images/5a2f9214-f207-4cc9-9539-304d37e38dcf?width=800&quality=85&crop=1%3A1",
    genre: "Allegorical Fiction",
    pages: 156,
    rating: 4.0,
    preview: "I have never seen anything like it: two little discs of glass suspended in front of his eyes..."
  }
];

const PreviewBooks = () => {
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);

  const [user, setUser] = useState<{ email: string } | null>(null);

useEffect(() => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    setUser(JSON.parse(storedUser));
  }
}, []);
  
  

  const handlePreview = (book: typeof previewBooks[0]) => {
    toast({
      title: "Preview Available",
      description: `Reading preview of "${book.title}" by ${book.author}`,
    });
  };

const handleSubscribe = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!user) {
    toast({ title: "You must be logged in to subscribe" });
    return;
  }

  try {
    await axios.post("/api/user/subscribe", { email: user.email });
    toast({ title: "Subscribed successfully" });
  } catch (err) {
    toast({ title: "Error", description: "Subscription failed" });
  }
};

  return (
    <section id="preview-books" className="py-20 bg-muted/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Premium Collection
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our curated selection of contemporary African literature. 
            Preview these books now and unlock full access with a subscription.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {previewBooks.map((book) => (
            <Card key={book.id} className="overflow-hidden hover:shadow-lg transition-shadow relative">
              <div className="absolute top-2 right-2 z-10">
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                  <Lock className="w-3 h-3 mr-1" />
                  Premium
                </Badge>
              </div>
              <div className="aspect-[3/4] overflow-hidden">
                <img 
                  src={book.cover} 
                  alt={`${book.title} cover`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <CardTitle className="font-playfair text-lg">{book.title}</CardTitle>
                <CardDescription className="text-primary font-medium">
                  by {book.author}
                </CardDescription>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{book.genre}</span>
                  <span>•</span>
                  <span>{book.pages} pages</span>
                  <span>•</span>
                  <span>⭐ {book.rating}</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {book.description}
                </p>
                <div className="bg-muted/50 p-3 rounded-md mb-4">
                  <p className="text-xs text-muted-foreground mb-1">Preview:</p>
                  <p className="text-sm italic">"{book.preview}..."</p>
                </div>
                <div className="flex gap-2">
                  <Button 
                    onClick={() => handlePreview(book)}
                    size="sm" 
                    variant="outline"
                    className="flex-1"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Read Preview
                  </Button>
                  <Dialog open={isSubscribeOpen} onOpenChange={setIsSubscribeOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        size="sm" 
                        className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                      >
                        <Lock className="w-4 h-4 mr-2" />
                        Subscribe
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Subscribe to Afrilore Premium</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="text-center">
                          <div className="font-playfair text-3xl font-bold text-primary mb-2">
                            R50<span className="text-lg text-muted-foreground">/month</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Cancel anytime. No commitment.
                          </p>
                        </div>
                        <form onSubmit={handleSubscribe} className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="sub-email">Email</Label>
                            <Input id="sub-email" type="email" placeholder="Enter your email" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="sub-name">Full Name</Label>
                            <Input id="sub-name" type="text" placeholder="Enter your full name" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="sub-card">Card Number</Label>
                            <Input id="sub-card" type="text" placeholder="1234 5678 9012 3456" required />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="sub-expiry">Expiry</Label>
                              <Input id="sub-expiry" type="text" placeholder="MM/YY" required />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="sub-cvv">CVV</Label>
                              <Input id="sub-cvv" type="text" placeholder="123" required />
                            </div>
                          </div>
                          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                            Start Subscription - R50/month
                          </Button>
                        </form>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Ready to access our full premium collection?
          </p>
          <Button 
            onClick={() => setIsSubscribeOpen(true)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 h-auto"
          >
            Subscribe Now - R50/month
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PreviewBooks;