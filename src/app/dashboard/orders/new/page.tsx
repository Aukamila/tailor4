"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/header";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { customers } from "@/lib/placeholder-data";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { DatePicker } from "@/components/ui/datepicker";


const newOrderSchema = z.object({
  customerId: z.string({ required_error: "Please select a customer." }),
  item: z.string().min(2, { message: "Item description must be at least 2 characters." }),
  jobNumber: z.string().min(1, { message: "Job number is required." }),
  requestDate: z.date({ required_error: "A request date is required." }),
  status: z.string({ required_error: "Please select an initial status." }),
  paymentStatus: z.string({ required_error: "Please select an initial payment status." }),
});

export default function NewOrderPage() {
  const router = useRouter();
  const { toast } = useToast();
  
  const owner = { name: "Shop Owner", email: "owner@stitchperfect.com", avatar: "https://i.pravatar.cc/150?u=owner" };

  const form = useForm<z.infer<typeof newOrderSchema>>({
    resolver: zodResolver(newOrderSchema),
    defaultValues: {
      item: "",
      jobNumber: "",
      status: "Pending",
      paymentStatus: "Pending",
    },
  });

  function onSubmit(values: z.infer<typeof newOrderSchema>) {
    console.log("New Order Data:", values);
    toast({
      title: "Order Created",
      description: `A new order for ${values.item} has been created.`,
    });
    router.push("/dashboard/orders");
  }
  
  const orderStatusOptions = ["Pending", "Cutting", "Stitching", "Finishing", "Ready for Pickup", "Completed"];
  const paymentStatusOptions = ["Pending", "Partial", "Paid"];

  return (
    <div className="flex h-screen flex-col">
       <Header title="Add New Order" user={owner} showBackButton />
      <main className="flex-1 space-y-4 overflow-y-auto p-4 pt-6 md:p-8">
        <Card>
          <CardHeader>
            <CardTitle>New Order Details</CardTitle>
            <CardDescription>
              Fill in the details below to create a new customer order.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FormField
                    control={form.control}
                    name="customerId"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Customer</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a customer" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            {customers.map(customer => (
                                <SelectItem key={customer.id} value={customer.id}>{customer.name}</SelectItem>
                            ))}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="jobNumber"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Job Number</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g. J008" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="item"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Item Description</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g. Custom Suit, Blue" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                        control={form.control}
                        name="requestDate"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                            <FormLabel>Request Date</FormLabel>
                                <DatePicker date={field.value} setDate={field.onChange} />
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Initial Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Set initial status" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {orderStatusOptions.map(status => <SelectItem key={status} value={status}>{status}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="paymentStatus"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Payment Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Set payment status" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {paymentStatusOptions.map(status => <SelectItem key={status} value={status}>{status}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>
                <div className="flex justify-end">
                    <Button type="submit">Create Order</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
