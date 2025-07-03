"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { Form } from "@/components/ui/form";
import { MeasurementFields } from "./measurement-fields";
import { measurements } from "@/lib/placeholder-data";

const measurementFieldsList = [
  "height", "neckWidth", "shoulder", "armholeCurve", "upperarmWidth", "chest", "underbust", "nippleToNipple", "waist", "hips", "waistToKneeLength", "waistToAnkle", "thighCirc", "ankleCirc", "shoulderToWaist", "shoulderToAnkle", "shoulderToWrist", "shoulderToElbow", "innerArmLength", "outseamLength", "inseamLength", "backRise", "frontRise", "singleShoulder", "frontDrop", "backDrop", "armholeCurveStraight", "neckBandWidth", "collarWidth", "collarPoint", "sleeveLength", "sleeveOpen", "cuffHeight", "waistBand", "legOpen", "seatLength", "dressLength"
];

const measurementSchemaObject = measurementFieldsList.reduce((acc, field) => {
  acc[field] = z.coerce.number({invalid_type_error: 'Must be a number'}).positive().optional().nullable();
  return acc;
}, {} as Record<string, z.ZodOptional<z.ZodNullable<z.ZodNumber>>>);

const newMeasurementSchema = z.object({
  details: z.object(measurementSchemaObject),
});

interface AddMeasurementFormProps {
  customerId: string;
  children: React.ReactNode;
  measurementToEdit?: (typeof measurements)[0];
}

export function AddMeasurementForm({ customerId, children, measurementToEdit }: AddMeasurementFormProps) {
  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);
  const isEditMode = !!measurementToEdit;

  const form = useForm<z.infer<typeof newMeasurementSchema>>({
    resolver: zodResolver(newMeasurementSchema),
    defaultValues: {
      details: isEditMode ? measurementToEdit.details : {},
    },
  });
  
  React.useEffect(() => {
    if (open) {
      form.reset(isEditMode ? { details: measurementToEdit.details } : { details: {} });
    }
  }, [open, form, isEditMode, measurementToEdit]);


  const onSubmit = (values: z.infer<typeof newMeasurementSchema>) => {
    const filledMeasurements = Object.fromEntries(Object.entries(values.details).filter(([_, v]) => v != null && v !== ''));

    if (Object.keys(filledMeasurements).length === 0) {
      toast({
        variant: "destructive",
        title: "No measurements entered",
        description: "Please enter at least one measurement value.",
      });
      return;
    }

    if (isEditMode) {
      console.log("Updated Measurement for", customerId, ":", filledMeasurements);
      toast({
        title: "Measurement Updated",
        description: `Measurements have been successfully updated.`,
      });
    } else {
      console.log("New Measurement for", customerId, ":", filledMeasurements);
      toast({
        title: "Measurement Added",
        description: `New measurements have been saved for the customer.`,
      });
    }
    
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-4xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>{isEditMode ? "Edit Measurement" : "Add New Measurement"}</DialogTitle>
              <DialogDescription>
                {isEditMode ? "Update the measurement details for the customer." : "Enter the new measurement details for the customer."} All values are in inches.
              </DialogDescription>
            </DialogHeader>
            <div className="max-h-[60vh] overflow-y-auto pr-6">
              <MeasurementFields control={form.control} />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">{isEditMode ? "Update Measurement" : "Save Measurement"}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
