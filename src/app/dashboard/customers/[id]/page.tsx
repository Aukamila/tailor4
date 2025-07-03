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
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/header";
import { AddMeasurementForm } from "@/components/add-measurement-form";
import { customers, measurements, orders } from "@/lib/placeholder-data";
import { notFound } from "next/navigation";
import { Ruler, ShoppingBag, Mail, Phone, Calendar as CalendarIcon, PlusCircle } from "lucide-react";

export default function CustomerDetailPage({ params }: { params: { id: string } }) {
  const customer = customers.find((c) => c.id === params.id);
  if (!customer) {
    notFound();
  }

  const customerMeasurements = measurements.filter((m) => m.customerId === customer.id);
  const customerOrders = orders.filter((o) => o.customerId === customer.id);
  
  const owner = { name: "Shop Owner", email: "owner@stitchperfect.com", avatar: "https://i.pravatar.cc/150?u=owner" };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'default';
      case 'Cutting':
      case 'Stitching':
      case 'Finishing':
        return 'secondary';
      case 'Ready for Pickup':
          return 'default';
      case 'Pending':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const getPaymentStatusVariant = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'default';
      case 'Partial':
        return 'secondary';
      case 'Pending':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <div className="flex h-screen flex-col">
       <Header title="Customer Details" user={owner} showBackButton />
       <main className="flex-1 space-y-4 overflow-y-auto p-4 pt-6 md:p-8">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="flex items-center space-y-4">
              <Avatar className="h-24 w-24 border-2 border-primary">
                <AvatarImage src={customer.avatar} />
                <AvatarFallback>
                  {customer.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <CardTitle>{customer.name}</CardTitle>
                <CardDescription>Customer Profile</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{customer.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{customer.phone}</span>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-2">
          <Tabs defaultValue="measurements">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="measurements">
                <Ruler className="mr-2 h-4 w-4" />
                Measurements
              </TabsTrigger>
              <TabsTrigger value="orders">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Order History
              </TabsTrigger>
            </TabsList>
            <TabsContent value="measurements">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Measurement History</CardTitle>
                    <CardDescription>
                      All recorded measurements for {customer.name}.
                    </CardDescription>
                  </div>
                  <AddMeasurementForm customerId={customer.id}>
                    <Button size="sm" className="ml-auto gap-1">
                      <PlusCircle className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Add Measurement
                      </span>
                    </Button>
                  </AddMeasurementForm>
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
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2 text-sm">
                            {Object.entries(m.details).map(([key, value]) => (
                              value ? (
                                <div key={key} className="flex justify-between border-b">
                                  <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}: </span>
                                  <span className="text-muted-foreground">{value}"</span>
                                </div>
                              ) : null
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>Order History</CardTitle>
                  <CardDescription>
                    All past and current orders for {customer.name}.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Job #</TableHead>
                        <TableHead>Item</TableHead>
                        <TableHead>Request Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Payment</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {customerOrders.map((order) => (
                        <TableRow key={order.id}>
                           <TableCell className="font-medium">{order.jobNumber}</TableCell>
                          <TableCell className="font-medium">{order.item}</TableCell>
                          <TableCell>{new Date(order.requestDate).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Badge variant={getStatusVariant(order.status) as any}>{order.status}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={getPaymentStatusVariant(order.paymentStatus) as any}>{order.paymentStatus}</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      </main>
    </div>
  );
}
