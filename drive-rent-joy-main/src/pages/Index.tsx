import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Clock, DollarSign, Star } from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: Shield,
      title: "Fully Insured",
      description: "All vehicles come with comprehensive insurance coverage",
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock customer service for your convenience",
    },
    {
      icon: DollarSign,
      title: "Best Prices",
      description: "Competitive rates with no hidden fees",
    },
    {
      icon: Star,
      title: "Premium Fleet",
      description: "Wide selection of luxury and economy vehicles",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose DriveEasy?
          </h2>
          <p className="text-muted-foreground text-lg">
            We make car rental simple, affordable, and reliable
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title} className="text-center hover:shadow-elegant transition-shadow">
                <CardContent className="pt-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary-glow/20 mb-4">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Index;
