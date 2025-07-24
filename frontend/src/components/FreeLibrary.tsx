import { BookOpen, Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";

interface Book {
  _id: string;
  title: string;
  author: string;
  description: string;
  cover: string;
  downloadUrl: string;
  readUrl: string;
}

const freeBooks = [
  {
    id: 1,
    title: "Things Fall Apart",
    author: "Chinua Achebe",
    description: "A masterpiece that has inspired generations of writers in Nigeria, across Africa, and around the world.",
    cover: "http://litkicks.com/wp-content/uploads/2013/03/tfa2.jpg",
    downloadUrl: "https://marul.ffst.hr/~bwillems/fymob/things.pdf",
    readUrl: "https://marul.ffst.hr/~bwillems/fymob/things.pdf"
  },
  {
    id: 2,
    title: "The African Child",
    author: "Camara Laye",
    description: "An autobiographical French novel depicting life in Guinea, West Africa.",
    cover: "https://i.ebayimg.com/images/g/~c8AAOSwHyxjJUZK/s-l1200.jpg",
    downloadUrl: "https://archive.org/details/africanchild0000lowee",
    readUrl: "https://archive.org/details/africanchild0000lowe"
  },
  {
    id: 3,
    title: "Mine Boy",
    author: "Peter Abrahams",
    description: "A novel about the life of a young black man in South Africa during apartheid.",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1629645697i/43154603.jpg",
    downloadUrl: "https://archive.org/details/mineboy0000unse/page/n1/mode/2up",
    readUrl: "https://archive.org/details/mineboy0000unse/page/n1/mode/2up"
  },
  {
    id: 4,
    title: "The Beautiful Ones Are Not Yet Born",
    author: "Ayi Kwei Armah",
    description: "A novel dealing with political corruption in post-independence Ghana.",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1708113800i/264587.jpg",
    downloadUrl: "https://archive.org/details/the-beautyful-ones-are-not-yet-born-a-novel-by-ayi-kwei-armah/The%20beautyful%20ones%20are%20not%20yet%20born%20%20a%20novel%20by%20Armah%20Ayi%20Kwei%2C%201939-%20%28z-lib.org%29/",
    readUrl: "https://archive.org/details/the-beautyful-ones-are-not-yet-born-a-novel-by-ayi-kwei-armah/The%20beautyful%20ones%20are%20not%20yet%20born%20%20a%20novel%20by%20Armah%20Ayi%20Kwei%2C%201939-%20%28z-lib.org%29/"
  },
  {
    id: 5,
    title: "So Long a Letter",
    author: "Mariama Bâ",
    description: "A semi-autobiographical epistolary novel exploring women's lives in post-colonial Senegal.",
    cover: "https://i0.wp.com/africanbookaddict.com/wp-content/uploads/2021/05/img_6124.jpg?fit=900%2C1200&ssl=1",
    downloadUrl: "https://archive.org/details/solongaletter00ba",
    readUrl: "https://archive.org/details/solongletter00bm/page/n5/mode/2up"
  },
  {
    id: 6,
    title: "Purple Hibiscus",
    author: "Chimamanda Ngozi Adichie",
    description: "A coming-of-age novel set in postcolonial Nigeria during political instability.",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1527718322i/14569052.jpg",
    downloadUrl: "https://cliffemwangi2016.wordpress.com/wp-content/uploads/2017/07/purple-hibiscus.pdf",
    readUrl: "https://cliffemwangi2016.wordpress.com/wp-content/uploads/2017/07/purple-hibiscus.pdf"
  }
];

const FreeLibrary = () => {
  const handleReadBook = (book: typeof freeBooks[0]) => {
    window.open(book.readUrl, '_blank');
  };

  const handleDownloadBook = (book: typeof freeBooks[0]) => {
    window.open(book.downloadUrl, '_blank');
  };

  return (
    <section id="free-library" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Free Books Library
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Access our collection of classic African literature available for free. 
            These timeless works are in the public domain and available to everyone.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {freeBooks.map((book) => (
            <Card key={book.id} className="overflow-hidden hover:shadow-lg transition-shadow">
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
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {book.description}
                </p>
                <div className="flex gap-2">
                  <Button 
                    onClick={() => handleReadBook(book)}
                    size="sm" 
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Read Online
                  </Button>
                  <Button 
                    onClick={() => handleDownloadBook(book)}
                    size="sm" 
                    variant="outline"
                    className="flex-1"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground mb-4">
            Want access to our premium collection with thousands more titles?
          </p>
          <Button 
            onClick={() => {
              const pricingSection = document.getElementById('pricing');
              if (pricingSection) {
                pricingSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Upgrade to Premium - R50/month
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FreeLibrary;