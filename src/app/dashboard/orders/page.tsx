"use client";

import { useState } from "react";
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
import { Search, PlusCircle } from "lucide-react";
import { customers, orders as allOrders } from "@/lib/placeholder-data";
import { Header } from "@/components/header";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export default function OrdersPage() {
  const [orders, setOrders] = useState(allOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const getCustomerName = (customerId: string) => {
    return customers.find((c) => c.id === customerId)?.name || "Unknown";
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.jobNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getCustomerName(order.customerId).toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const owner = { name: "Shop Owner", email: "owner@stitchperfect.com", avatar: "https://i.pravatar.cc/150?u=owner" };

  const handleStatusChange = (orderId: string, field: 'status' | 'paymentStatus', value: string) => {
    setOrders(currentOrders => currentOrders.map(o => o.id === orderId ? {...o, [field]: value} : o));
    toast({
      title: "Order Updated",
      description: `Order ${orderId} has been updated.`,
    });
  }

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
    </div>
  );
}
