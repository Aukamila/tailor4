import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { customers, measurements, orders } from "@/lib/placeholder-data";
import { Ruler, ShoppingBag, Calendar as CalendarIcon } from "lucide-react";

export default function AccountPage() {
  // For demonstration, we'll hardcode the view for the first customer.
  // In a real app, this would be based on the logged-in user.
  const customer = customers[0];

  const customerMeasurements = measurements.filter((m) => m.customerId === customer.id);
  const customerOrders = orders.filter((o) => o.customerId === customer.id);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'default';
      case 'In Progress':
        return 'secondary';
      case 'Ready for Pickup':
          return 'default';
      case 'Pending':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <Tabs defaultValue="orders" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="orders">
          <ShoppingBag className="mr-2 h-4 w-4" />
          My Orders
        </TabsTrigger>
        <TabsTrigger value="measurements">
          <Ruler className="mr-2 h-4 w-4" />
          My Measurements
        </TabsTrigger>
      </TabsList>
      <TabsContent value="orders">
        <Card>
          <CardHeader>
            <CardTitle>Order History</CardTitle>
            <CardDescription>
              Track the status of your current and past orders.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customerOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.item}</TableCell>
                    <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(order.status) as any}>{order.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="measurements">
        <Card>
          <CardHeader>
            <CardTitle>Measurement History</CardTitle>
            <CardDescription>
              Your measurement records saved at our shop.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {customerMeasurements.map((m) => (
                <Card key={m.id}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                      Measurement from {new Date(m.date).toLocaleDateString()}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                      {Object.entries(m.details).map(([key, value]) => (
                        <div key={key}>
                          <span className="font-medium capitalize">{key}: </span>
                          <span className="text-muted-foreground">{value}"</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
