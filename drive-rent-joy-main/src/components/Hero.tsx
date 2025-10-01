import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Search } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[600px] flex items-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
      </div>
      
      <div className="container relative z-10 mx-auto px-4 py-20">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Find Your Perfect
            <span className="block bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Ride Today
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Premium car rentals at unbeatable prices. Choose from luxury sedans, SUVs, and sports cars.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link to="/browse">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 transition-opacity shadow-elegant"
              >
                <Search className="mr-2 h-5 w-5" />
                Browse Cars
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Check Availability
            </Button>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-8">
            <div>
              <div className="text-3xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Premium Cars</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">50k+</div>
              <div className="text-sm text-muted-foreground">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">24/7</div>
              <div className="text-sm text-muted-foreground">Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
