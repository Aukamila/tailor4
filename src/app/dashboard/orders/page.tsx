"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, PlusCircle, Trash2 } from "lucide-react";
import { customers, orders as allOrders, measurements } from "@/lib/placeholder-data";
import { Header } from "@/components/header";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function OrdersPage() {
  const [orders, setOrders] = useState<typeof allOrders>([]);
  const [currentCustomers, setCurrentCustomers] = useState(customers);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  const [orderToDelete, setOrderToDelete] = useState<string | null>(null);

  useEffect(() => {
    // Initialize local storage if it's empty
    if (!localStorage.getItem("orders")) {
      localStorage.setItem("orders", JSON.stringify(allOrders));
    }
    if (!localStorage.getItem("customers")) {
      localStorage.setItem("customers", JSON.stringify(customers));
    }
     if (!localStorage.getItem("measurements")) {
      localStorage.setItem("measurements", JSON.stringify(measurements));
    }

    const storedOrders = localStorage.getItem("orders");
    setOrders(storedOrders ? JSON.parse(storedOrders) : []);

    const storedCustomers = localStorage.getItem("customers");
    setCurrentCustomers(storedCustomers ? JSON.parse(storedCustomers) : []);
  }, []);

  const getCustomerName = (customerId: string) => {
    return currentCustomers.find((c) => c.id === customerId)?.name || "Unknown";
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.jobNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getCustomerName(order.customerId).toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const owner = { name: "Shop Owner", email: "owner@stitchperfect.com", avatar: "https://i.pravatar.cc/150?u=owner" };

  const handleStatusChange = (orderId: string, field: 'status' | 'paymentStatus', value: string) => {
    const updatedOrders = orders.map(o => o.id === orderId ? {...o, [field]: value} : o);
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    toast({
      title: "Order Updated",
      description: `Order ${orderId} has been updated.`,
    });
  }
  
  const handleDeleteConfirm = () => {
    if (!orderToDelete) return;

    const updatedOrders = orders.filter(o => o.id !== orderToDelete);
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));

    const storedMeasurements = localStorage.getItem("measurements");
    if (storedMeasurements) {
        const currentMeasurements = JSON.parse(storedMeasurements);
        const updatedMeasurements = currentMeasurements.filter((m: any) => m.orderId !== orderToDelete);
        localStorage.setItem("measurements", JSON.stringify(updatedMeasurements));
    }

    toast({
      title: "Order Deleted",
      description: `The order has been successfully deleted.`,
    });
    setOrderToDelete(null);
  };

  const orderStatusOptions = ["Pending", "Cutting", "Stitching", "Finishing", "Ready for Pickup", "Completed"];
  const paymentStatusOptions = ["Pending", "Partial", "Paid"];

  return (
    <div className="flex h-screen flex-col">
      <Header title="Orders" user={owner} />
      <main className="flex-1 space-y-4 overflow-y-auto p-4 pt-6 md:p-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Order Management</CardTitle>
            <CardDescription>
              Search, view, and manage all customer orders.
            </CardDescription>
          </div>
          <Link href="/dashboard/orders/new">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Order
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
            <div className="relative mb-4">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                type="search"
                placeholder="Search by Job #, Customer, or Item..."
                className="w-full rounded-lg bg-background pl-8 md:w-[320px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Job #</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Item</TableHead>
                <TableHead>Request Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.jobNumber}</TableCell>
                  <TableCell>{getCustomerName(order.customerId)}</TableCell>
                  <TableCell>{order.item}</TableCell>
                  <TableCell>{new Date(order.requestDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Select value={order.status} onValueChange={(value) => handleStatusChange(order.id, 'status', value)}>
                        <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                            {orderStatusOptions.map(status => <SelectItem key={status} value={status}>{status}</SelectItem>)}
                        </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Select value={order.paymentStatus} onValueChange={(value) => handleStatusChange(order.id, 'paymentStatus', value)}>
                        <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                            {paymentStatusOptions.map(status => <SelectItem key={status} value={status}>{status}</SelectItem>)}
                        </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" onClick={() => setOrderToDelete(order.id)}>
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete Order</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredOrders.length === 0 && (
            <div className="text-center p-8 text-muted-foreground">
              No orders found.
            </div>
          )}
        </CardContent>
      </Card>
      </main>
      <AlertDialog open={!!orderToDelete} onOpenChange={(open) => !open && setOrderToDelete(null)}>
        <AlertDialogContent>
        <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the order
            and any associated measurements from local storage.
            </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>Delete</AlertDialogAction>
        </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
    </div>
  );
}
