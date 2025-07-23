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
    downloadUrl: "https://www.gutenberg.org/files/2346/2346-h/2346-h.htm",
    readUrl: "https://www.gutenberg.org/files/2346/2346-h/2346-h.htm"
  },
  {
    id: 2,
    title: "The African Child",
    author: "Camara Laye",
    description: "An autobiographical French novel depicting life in Guinea, West Africa.",
    cover: "https://i.ebayimg.com/images/g/~c8AAOSwHyxjJUZK/s-l1200.jpg",
    downloadUrl: "https://archive.org/details/africanchild00laye",
    readUrl: "https://archive.org/details/africanchild00laye"
  },
  {
    id: 3,
    title: "Mine Boy",
    author: "Peter Abrahams",
    description: "A novel about the life of a young black man in South Africa during apartheid.",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1629645697i/43154603.jpg",
    downloadUrl: "https://archive.org/details/mineboy00abra",
    readUrl: "https://archive.org/details/mineboy00abra"
  },
  {
    id: 4,
    title: "The Beautiful Ones Are Not Yet Born",
    author: "Ayi Kwei Armah",
    description: "A novel dealing with political corruption in post-independence Ghana.",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1708113800i/264587.jpg",
    downloadUrl: "https://archive.org/details/beautifulonesare00arma",
    readUrl: "https://archive.org/details/beautifulonesare00arma"
  },
  {
    id: 5,
    title: "So Long a Letter",
    author: "Mariama Bâ",
    description: "A semi-autobiographical epistolary novel exploring women's lives in post-colonial Senegal.",
    cover: "https://i0.wp.com/africanbookaddict.com/wp-content/uploads/2021/05/img_6124.jpg?fit=900%2C1200&ssl=1",
    downloadUrl: "https://archive.org/details/solongaletter00ba",
    readUrl: "https://archive.org/details/solongaletter00ba"
  },
  {
    id: 6,
    title: "Purple Hibiscus",
    author: "Chimamanda Ngozi Adichie",
    description: "A coming-of-age novel set in postcolonial Nigeria during political instability.",
    cover: "data:image/jpeg;base64,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",
    downloadUrl: "https://archive.org/details/purplehibiscus00adic",
    readUrl: "https://archive.org/details/purplehibiscus00adic"
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