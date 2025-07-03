"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChevronDown, PlusCircle } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
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
import { customers, orders as allOrders, measurements as allMeasurements } from "@/lib/placeholder-data";
import { DatePicker } from "@/components/ui/datepicker";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { MeasurementFields } from "@/components/measurement-fields";


const measurementFieldsList = [
  "height", "neckWidth", "shoulder", "armholeCurve", "upperarmWidth", "chest", "underbust", "nippleToNipple", "waist", "hips", "waistToKneeLength", "waistToAnkle", "thighCirc", "ankleCirc", "shoulderToWaist", "shoulderToAnkle", "shoulderToWrist", "shoulderToElbow", "innerArmLength", "outseamLength", "inseamLength", "backRise", "frontRise", "singleShoulder", "frontDrop", "backDrop", "armholeCurveStraight", "neckBandWidth", "collarWidth", "collarPoint", "sleeveLength", "sleeveOpen", "cuffHeight", "waistBand", "legOpen", "seatLength", "dressLength"
];

const measurementSchemaObject = measurementFieldsList.reduce((acc, field) => {
  acc[field] = z.coerce.number({invalid_type_error: 'Must be a number'}).positive().optional().nullable();
  return acc;
}, {} as Record<string, z.ZodOptional<z.ZodNullable<z.ZodNumber>>>);


const newOrderSchema = z.object({
  customerId: z.string({ required_error: "Please select a customer." }),
  item: z.string().min(2, { message: "Item description must be at least 2 characters." }),
  jobNumber: z.string().min(1, { message: "Job number is required." }),
  requestDate: z.date({ required_error: "A request date is required." }),
  status: z.string({ required_error: "Please select an initial status." }),
  paymentStatus: z.string({ required_error: "Please select an initial payment status." }),
  details: z.object(measurementSchemaObject).optional(),
});


export default function NewOrderPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isMeasurementsOpen, setIsMeasurementsOpen] = useState(false);
  
  const owner = { name: "Shop Owner", email: "owner@stitchperfect.com", avatar: "https://i.pravatar.cc/150?u=owner" };

  const getNextJobNumber = () => {
    const storedOrders = localStorage.getItem("orders");
    const currentOrders = storedOrders ? JSON.parse(storedOrders) : allOrders;
    if (currentOrders.length === 0) return "J001";
    
    const latestJobNum = currentOrders.reduce((max: number, order: { jobNumber: string }) => {
        const currentNum = parseInt(order.jobNumber.replace(/\D/g, ''), 10) || 0;
        return currentNum > max ? currentNum : max;
    }, 0);

    return `J${String(latestJobNum + 1).padStart(3, '0')}`;
  };


  const form = useForm<z.infer<typeof newOrderSchema>>({
    resolver: zodResolver(newOrderSchema),
    defaultValues: {
      item: "",
      jobNumber: getNextJobNumber(),
      status: "Pending",
      paymentStatus: "Pending",
      details: {},
    },
  });

  function onSubmit(values: z.infer<typeof newOrderSchema>) {
    const finalValues = {
        ...values,
        details: values.details ? Object.fromEntries(Object.entries(values.details).filter(([_, v]) => v != null && v !== '')) : undefined
    }

    const newOrderId = `ord_${new Date().getTime()}`;
    
    const newOrder = {
        id: newOrderId,
        customerId: values.customerId,
        jobNumber: values.jobNumber,
        requestDate: format(values.requestDate, "yyyy-MM-dd"),
        item: values.item,
        status: values.status,
        paymentStatus: values.paymentStatus,
    };

    const storedOrders = localStorage.getItem("orders");
    const currentOrders = storedOrders ? JSON.parse(storedOrders) : allOrders;
    const updatedOrders = [newOrder, ...currentOrders];
    localStorage.setItem("orders", JSON.stringify(updatedOrders));

    if (finalValues.details && Object.keys(finalValues.details).length > 0) {
      const newMeasurement = {
        id: `mes_${new Date().getTime()}`,
        customerId: values.customerId,
        orderId: newOrderId,
        date: format(values.requestDate, "yyyy-MM-dd"),
        details: finalValues.details
      };
      const storedMeasurements = localStorage.getItem("measurements");
      const currentMeasurements = storedMeasurements ? JSON.parse(storedMeasurements) : allMeasurements;
      const updatedMeasurements = [newMeasurement, ...currentMeasurements];
      localStorage.setItem("measurements", JSON.stringify(updatedMeasurements));
    }

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
              Fill in the details below to create a new order. You can optionally add measurements.
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
                
                <Collapsible open={isMeasurementsOpen} onOpenChange={setIsMeasurementsOpen}>
                  <CollapsibleTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Measurements (Optional)
                        <ChevronDown className={`ml-auto h-4 w-4 transition-transform ${isMeasurementsOpen ? 'rotate-180' : ''}`} />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="mt-6 border-t pt-6">
                        <h3 className="text-lg font-medium mb-2">Measurement Details</h3>
                        <p className="text-sm text-muted-foreground mb-4">All values should be in inches.</p>
                        <MeasurementFields control={form.control} />
                    </div>
                  </CollapsibleContent>
                </Collapsible>

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
