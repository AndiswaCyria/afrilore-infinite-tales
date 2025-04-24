
import { BookOpen, Library, Star } from "lucide-react";

const features = [
  {
    icon: <BookOpen className="h-8 w-8" />,
    title: "African Folklore",
    description: "Discover rich cultural stories passed down through generations",
  },
  {
    icon: <Library className="h-8 w-8" />,
    title: "Educational Texts",
    description: "Access comprehensive learning materials and academic resources",
  },
  {
    icon: <Star className="h-8 w-8" />,
    title: "Modern Literature",
    description: "Explore contemporary African writers and their compelling narratives",
  },
];

const Features = () => {
  return (
    <section className="py-20 bg-primary-light/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow animate-fade-in"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="text-primary mb-4">{feature.icon}</div>
              <h3 className="font-playfair text-xl font-semibold mb-2">
                {feature.title}
              </h3>
              <p className="text-secondary">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
