"use client";

import { useState, useEffect } from "react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  ShoppingBag,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Eye,
  UserPlus,
} from "lucide-react";
import { orders as allOrders, customers as allCustomers } from "@/lib/placeholder-data";
import { Header } from "@/components/header";
import Link from "next/link";

export default function DashboardPage() {
  const [orders, setOrders] = useState(allOrders);
  const [customers, setCustomers] = useState(allCustomers);

  useEffect(() => {
    const storedOrders = localStorage.getItem("orders");
    setOrders(storedOrders ? JSON.parse(storedOrders) : allOrders);

    const storedCustomers = localStorage.getItem("customers");
    setCustomers(storedCustomers ? JSON.parse(storedCustomers) : allCustomers);
  }, []);

  const activeOrders = orders.filter((order) =>
    ["Cutting", "Stitching", "Finishing", "Pending"].includes(order.status)
  ).length;
  const totalCustomers = customers.length;
  const pendingTasks = orders.filter(
    (order) => order.status === "Pending"
  ).length;
  const readyForPickup = orders.filter(
    (order) => order.status === "Ready for Pickup"
  ).length;

  const owner = {
    name: "Shop Owner",
    email: "owner@stitchperfect.com",
    avatar: "https://i.pravatar.cc/150?u=owner",
  };
  
  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.requestDate).getTime() - new Date(a.requestDate).getTime())
    .slice(0, 5);
    
  const recentCustomers = [...customers]
    .sort((a, b) => (b.id > a.id ? 1 : -1)) // A simple sort for new customers
    .slice(0, 5);


  const getCustomerName = (customerId: string) => {
    return customers.find((c) => c.id === customerId)?.name || "Unknown";
  };
  
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

  return (
    <div className="flex h-screen flex-col">
      <Header title="Dashboard" user={owner}>
        <Button asChild>
          <Link href="/dashboard/customers/new">
            <UserPlus className="mr-2 h-4 w-4" />
            Add Customer
          </Link>
        </Button>
      </Header>
      <main className="flex-1 space-y-4 overflow-y-auto p-4 pt-6 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Customers
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCustomers}</div>
              <p className="text-xs text-muted-foreground">
                All registered customers
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Orders
              </CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeOrders}</div>
              <p className="text-xs text-muted-foreground">
                Orders currently in progress or pending
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{pendingTasks}</div>
              <p className="text-xs text-muted-foreground">
                New orders requiring attention
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Ready for Pickup
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{readyForPickup}</div>
              <p className="text-xs text-muted-foreground">
                Completed orders awaiting customer pickup
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Recent Orders</CardTitle>
                        <CardDescription>
                            A quick look at the most recent orders.
                        </CardDescription>
                    </div>
                    <Button asChild size="sm">
                        <Link href="/dashboard/orders">
                            View All
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Job #</TableHead>
                                <TableHead>Customer</TableHead>
                                <TableHead>Item</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {recentOrders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell className="font-medium">{order.jobNumber}</TableCell>
                                <TableCell>{getCustomerName(order.customerId)}</TableCell>
                                <TableCell>{order.item}</TableCell>
                                <TableCell>
                                    <Badge variant={getStatusVariant(order.status) as any}>{order.status}</Badge>
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>New Customers</CardTitle>
                        <CardDescription>
                            Your most recently added customers.
                        </CardDescription>
                    </div>
                    <Button asChild size="sm">
                        <Link href="/dashboard/customers">
                            View All
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Customer</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead><span className="sr-only">Actions</span></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                        {recentCustomers.map((customer) => (
                            <TableRow key={customer.id}>
                            <TableCell>
                                <div className="flex items-center gap-3">
                                <Avatar className="h-9 w-9">
                                    <AvatarImage src={customer.avatar} alt={customer.name} />
                                    <AvatarFallback>
                                    {customer.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="font-medium">{customer.name}</div>
                                </div>
                            </TableCell>
                            <TableCell>{customer.email}</TableCell>
                            <TableCell>
                                <Link href={`/dashboard/customers/${customer.id}`}>
                                <Button aria-label="View customer" size="icon" variant="ghost">
                                    <Eye className="h-4 w-4" />
                                </Button>
                                </Link>
                            </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
      </main>
    </div>
  );
}
