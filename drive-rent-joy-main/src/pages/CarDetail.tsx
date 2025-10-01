import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Users, Fuel, Settings, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Car {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  price_per_day: number;
  image_url: string;
  description: string;
  category: string;
  transmission: string;
  fuel_type: string;
  seats: number;
}

const CarDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchCar();
    checkUser();
  }, [id]);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setUser(session?.user ?? null);
  };

  const fetchCar = async () => {
    try {
      const { data, error } = await supabase
        .from("cars")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      setCar(data);
    } catch (error) {
      toast({
        title: "Error loading car details",
        variant: "destructive",
      });
      navigate("/browse");
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = () => {
    if (!user) {
      toast({
        title: "Please sign in to book",
        description: "You need to be logged in to make a booking",
      });
      navigate("/auth");
      return;
    }
    navigate(`/booking/${id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-12 text-center">Loading...</div>
      </div>
    );
  }

  if (!car) return null;

  const features = [
    "Air Conditioning",
    "GPS Navigation",
    "Bluetooth Audio",
    "USB Charging",
    "Premium Sound System",
    "Parking Sensors",
    "Cruise Control",
    "Leather Seats",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <div className="relative rounded-2xl overflow-hidden shadow-elegant mb-6">
              <img
                src={car.image_url}
                alt={car.name}
                className="w-full h-[400px] object-cover"
              />
              <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
                {car.category}
              </Badge>
            </div>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Features</h3>
                <div className="grid grid-cols-2 gap-3">
                  {features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <h1 className="text-4xl font-bold mb-2">{car.name}</h1>
            <p className="text-xl text-muted-foreground mb-6">{car.brand} {car.model} • {car.year}</p>

            <div className="bg-gradient-to-br from-primary/10 to-primary-glow/10 rounded-xl p-6 mb-6">
              <div className="text-4xl font-bold text-primary mb-2">
                ${car.price_per_day}
                <span className="text-lg font-normal text-muted-foreground"> / day</span>
              </div>
              <p className="text-sm text-muted-foreground">Best price guaranteed</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <Card>
                <CardContent className="pt-6 text-center">
                  <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <div className="font-semibold">{car.seats} Passengers</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Settings className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <div className="font-semibold">{car.transmission}</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Fuel className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <div className="font-semibold">{car.fuel_type}</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Calendar className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <div className="font-semibold">Available</div>
                </CardContent>
              </Card>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                {car.description || `Experience luxury and performance with the ${car.name}. Perfect for business trips, special occasions, or simply enjoying the open road in style.`}
              </p>
            </div>

            <Button
              size="lg"
              className="w-full bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 transition-opacity shadow-elegant"
              onClick={handleBookNow}
            >
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;
