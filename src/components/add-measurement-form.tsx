"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useToast } from "@/hooks/use-toast";

interface AddMeasurementFormProps {
  customerId: string;
  children: React.ReactNode;
}

export function AddMeasurementForm({ customerId, children }: AddMeasurementFormProps) {
  const { toast } = useToast();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log("New Measurement for", customerId, ":", data);
    toast({
      title: "Measurement Added",
      description: `New measurements have been saved for the customer.`,
    });
    // Here you would typically close the dialog after a successful API call
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Measurement</DialogTitle>
            <DialogDescription>
              Enter the new measurement details for the customer. All values are in inches.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="neck">Neck</Label>
              <Input id="neck" name="neck" type="number" step="0.1" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="chest">Chest/Bust</Label>
              <Input id="chest" name="chest" type="number" step="0.1" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="waist">Waist</Label>
              <Input id="waist" name="waist" type="number" step="0.1" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hips">Hips</Label>
              <Input id="hips" name="hips" type="number" step="0.1" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sleeve">Sleeve</Label>
              <Input id="sleeve" name="sleeve" type="number" step="0.1" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="inseam">Inseam</Label>
              <Input id="inseam" name="inseam" type="number" step="0.1" />
            </div>
             <div className="space-y-2">
              <Label htmlFor="dressLength">Dress Length</Label>
              <Input id="dressLength" name="dressLength" type="number" step="0.1" />
            </div>
             <div className="space-y-2">
              <Label htmlFor="shoulder">Shoulder</Label>
              <Input id="shoulder" name="shoulder" type="number" step="0.1" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
                <Button type="submit">Save Measurement</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
