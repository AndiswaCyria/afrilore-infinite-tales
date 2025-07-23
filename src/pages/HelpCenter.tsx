import React from "react";

const HelpCenter = () => (
  <section className="py-20 bg-muted/20">
    <div className="container mx-auto px-4 text-center">
      <h1 className="font-playfair text-3xl md:text-4xl font-bold mb-6 text-foreground">
        Help Center
      </h1>
      <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
        Welcome to the Afrilore Help Center. Here you’ll find answers to common questions and resources to help you get the most out of our platform.
      </p>
      {/* Add FAQ, guides, or support resources here */}
    </div>
  </section>
);

export default HelpCenter;