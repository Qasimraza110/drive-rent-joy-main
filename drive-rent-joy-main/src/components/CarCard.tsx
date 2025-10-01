import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Car, Users, Fuel, Settings } from "lucide-react";
import { Link } from "react-router-dom";

interface CarCardProps {
  car: {
    id: string;
    name: string;
    brand: string;
    price_per_day: number;
    image_url: string;
    category: string;
    transmission: string;
    fuel_type: string;
    seats: number;
  };
}

const CarCard = ({ car }: CarCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-elegant transition-all duration-300 group">
      <div className="relative h-48 overflow-hidden">
        <img
          src={car.image_url}
          alt={car.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground">
          {car.category}
        </Badge>
      </div>
      
      <CardContent className="pt-4">
        <h3 className="text-xl font-semibold mb-1">{car.name}</h3>
        <p className="text-sm text-muted-foreground mb-4">{car.brand}</p>
        
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{car.seats} Seats</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Settings className="h-4 w-4" />
            <span>{car.transmission}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Fuel className="h-4 w-4" />
            <span>{car.fuel_type}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Car className="h-4 w-4" />
            <span>Premium</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex items-center justify-between border-t pt-4">
        <div>
          <div className="text-2xl font-bold text-primary">
            ${car.price_per_day}
          </div>
          <div className="text-xs text-muted-foreground">per day</div>
        </div>
        <Link to={`/car/${car.id}`}>
          <Button className="bg-gradient-to-r from-primary to-primary-glow hover:opacity-90">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CarCard;
