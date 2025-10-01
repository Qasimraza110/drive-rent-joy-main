import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import CarCard from "@/components/CarCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
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
  category: string;
  transmission: string;
  fuel_type: string;
  seats: number;
  available: boolean;
}

const Browse = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchCars();
  }, []);

  useEffect(() => {
    filterCars();
  }, [searchTerm, categoryFilter, cars]);

  const fetchCars = async () => {
    try {
      const { data, error } = await supabase
        .from("cars")
        .select("*")
        .eq("available", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setCars(data || []);
      setFilteredCars(data || []);
    } catch (error) {
      toast({
        title: "Error loading cars",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filterCars = () => {
    let filtered = cars;

    if (searchTerm) {
      filtered = filtered.filter(
        (car) =>
          car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          car.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter((car) => car.category === categoryFilter);
    }

    setFilteredCars(filtered);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Browse Our Fleet</h1>
          <p className="text-muted-foreground">Find the perfect car for your journey</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or brand..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Sedan">Sedan</SelectItem>
              <SelectItem value="SUV">SUV</SelectItem>
              <SelectItem value="Sports">Sports</SelectItem>
              <SelectItem value="Luxury">Luxury</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading cars...</div>
        ) : filteredCars.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No cars found matching your criteria
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
