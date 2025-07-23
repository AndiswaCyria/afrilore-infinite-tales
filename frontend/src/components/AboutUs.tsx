import { Users, BookOpen, Globe, Award } from "lucide-react";

const AboutUs = () => {
  const stats = [
    { icon: <BookOpen className="h-8 w-8 text-primary" />, number: "10,000+", label: "Books Available" },
    { icon: <Users className="h-8 w-8 text-primary" />, number: "50,000+", label: "Active Readers" },
    { icon: <Globe className="h-8 w-8 text-primary" />, number: "54", label: "African Countries" },
    { icon: <Award className="h-8 w-8 text-primary" />, number: "500+", label: "Award-Winning Titles" },
  ];

  const team = [
    {
      name: "Ms. Andiswa Cyria Molangathi",
      role: "Founder & CEO",
      image: "public/Andiswa.jpeg",
      bio: "Former literature professor with 15 years of experience in African studies and digital publishing."
    },
    {
      name: "Ray Satsi",
      role: "Head of Content",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      bio: "Published author and curator specializing in contemporary African literature and folklore preservation."
    },
    {
      name: "Fatima Al-Rashid",
      role: "Technology Director",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      bio: "Tech innovator focused on making African content accessible through cutting-edge digital platforms."
    }
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6 text-foreground">
            About Afrilore
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto mb-8">
            We are passionate about preserving, promoting, and making African literature accessible to readers worldwide. 
            Our mission is to bridge the gap between traditional storytelling and modern digital consumption.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="bg-card p-8 rounded-lg border border-border">
            <h3 className="font-playfair text-2xl font-semibold mb-4 text-card-foreground">Our Mission</h3>
            <p className="text-muted-foreground leading-relaxed">
              To democratize access to African literature and educational content by providing a comprehensive digital library 
              that celebrates the rich cultural heritage and contemporary voices of Africa. We believe every story deserves to be heard 
              and every reader deserves access to diverse narratives.
            </p>
          </div>
          <div className="bg-card p-8 rounded-lg border border-border">
            <h3 className="font-playfair text-2xl font-semibold mb-4 text-card-foreground">Our Vision</h3>
            <p className="text-muted-foreground leading-relaxed">
              To become the world's leading platform for African literature, fostering a global community of readers who appreciate 
              the depth, diversity, and beauty of African storytelling. We envision a future where African voices are amplified 
              and celebrated across all continents.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4">{stat.icon}</div>
              <div className="font-playfair text-3xl font-bold text-foreground mb-2">{stat.number}</div>
              <div className="text-muted-foreground text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* What We Offer */}
        <div className="mb-16">
          <h3 className="font-playfair text-2xl font-semibold text-center mb-8 text-foreground">What We Offer</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <h4 className="font-semibold mb-2 text-foreground">Curated Collections</h4>
              <p className="text-muted-foreground text-sm">
                Carefully selected books spanning classic literature, contemporary fiction, poetry, and educational materials.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h4 className="font-semibold mb-2 text-foreground">Community Features</h4>
              <p className="text-muted-foreground text-sm">
                Connect with fellow readers, join book clubs, and participate in discussions about African literature.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-primary" />
              </div>
              <h4 className="font-semibold mb-2 text-foreground">Global Accessibility</h4>
              <p className="text-muted-foreground text-sm">
                Available worldwide with offline reading capabilities and multiple language support.
              </p>
            </div>
          </div>
        </div>

        {/* Team */}
        <div>
          <h3 className="font-playfair text-2xl font-semibold text-center mb-8 text-foreground">Meet Our Team</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h4 className="font-playfair text-xl font-semibold mb-1 text-foreground">{member.name}</h4>
                <p className="text-primary font-medium mb-3">{member.role}</p>
                <p className="text-muted-foreground text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;