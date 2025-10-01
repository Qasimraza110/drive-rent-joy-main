import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, DollarSign } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface Booking {
  id: string;
  start_date: string;
  end_date: string;
  total_price: number;
  status: string;
  cars: {
    name: string;
    brand: string;
    image_url: string;
  };
}

const Bookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate("/auth");
        return;
      }

      const { data, error } = await supabase
        .from("bookings")
        .select(`
          *,
          cars (
            name,
            brand,
            image_url
          )
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setBookings(data || []);
    } catch (error) {
      toast({
        title: "Error loading bookings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500";
      case "confirmed":
        return "bg-green-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">My Bookings</h1>

        {loading ? (
          <div className="text-center py-12">Loading your bookings...</div>
        ) : bookings.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground mb-4">You don't have any bookings yet</p>
              <a href="/browse" className="text-primary hover:underline">
                Browse our fleet to make your first booking
              </a>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {bookings.map((booking) => (
              <Card key={booking.id} className="overflow-hidden">
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="md:col-span-1">
                    <img
                      src={booking.cars.image_url}
                      alt={booking.cars.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="md:col-span-3 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold">{booking.cars.name}</h3>
                        <p className="text-muted-foreground">{booking.cars.brand}</p>
                      </div>
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status}
                      </Badge>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-5 w-5" />
                        <div>
                          <div className="text-sm">Pick-up</div>
                          <div className="font-semibold text-foreground">
                            {format(new Date(booking.start_date), "PPP")}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-5 w-5" />
                        <div>
                          <div className="text-sm">Drop-off</div>
                          <div className="font-semibold text-foreground">
                            {format(new Date(booking.end_date), "PPP")}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <DollarSign className="h-5 w-5 text-primary" />
                        <div>
                          <div className="text-sm text-muted-foreground">Total Price</div>
                          <div className="text-2xl font-bold text-primary">
                            ${booking.total_price}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookings;
