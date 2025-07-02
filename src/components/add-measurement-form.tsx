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
      <DialogContent className="sm:max-w-4xl">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Measurement</DialogTitle>
            <DialogDescription>
              Enter the new measurement details for the customer. All values are in inches.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 max-h-[60vh] overflow-y-auto pr-6">
            <div className="space-y-2"><Label htmlFor="height">Height</Label><Input id="height" name="height" type="number" step="0.1" /></div>
            <div className="space-y-2"><Label htmlFor="neckWidth">Neck Width</Label><Input id="neckWidth" name="neckWidth" type="number" step="0.1" /></div>
            <div className="space-y-2"><Label htmlFor="shoulder">Shoulder</Label><Input id="shoulder" name="shoulder" type="number" step="0.1" /></div>
            <div className="space-y-2"><Label htmlFor="armholeCurve">Armhole Curve</Label><Input id="armholeCurve" name="armholeCurve" type="number" step="0.1" /></div>
            <div className="space-y-2"><Label htmlFor="upperarmWidth">Upperarm Width</Label><Input id="upperarmWidth" name="upperarmWidth" type="number" step="0.1" /></div>
            <div className="space-y-2"><Label htmlFor="chest">Chest/Bust</Label><Input id="chest" name="chest" type="number" step="0.1" /></div>
            <div className="space-y-2"><Label htmlFor="underbust">Underbust</Label><Input id="underbust" name="underbust" type="number" step="0.1" /></div>
            <div className="space-y-2"><Label htmlFor="nippleToNipple">Nipple to Nipple</Label><Input id="nippleToNipple" name="nippleToNipple" type="number" step="0.1" /></div>
            <div className="space-y-2"><Label htmlFor="waist">Waist</Label><Input id="waist" name="waist" type="number" step="0.1" /></div>
            <div className="space-y-2"><Label htmlFor="hips">Hips</Label><Input id="hips" name="hips" type="number" step="0.1" /></div>
            <div className="space-y-2"><Label htmlFor="waistToKneeLength">Waist to Knee</Label><Input id="waistToKneeLength" name="waistToKneeLength" type="number" step="0.1" /></div>
            <div className="space-y-2"><Label htmlFor="waistToAnkle">Waist to Ankle</Label><Input id="waistToAnkle" name="waistToAnkle" type="number" step="0.1" /></div>
            <div className="space-y-2"><Label htmlFor="thighCirc">Thigh Circ</Label><Input id="thighCirc" name="thighCirc" type="number" step="0.1" /></div>
            <div className="space-y-2"><Label htmlFor="ankleCirc">Ankle Circ</Label><Input id="ankleCirc" name="ankleCirc" type="number" step="0.1" /></div>
            <div className="space-y-2"><Label htmlFor="shoulderToWaist">Shoulder to Waist</Label><Input id="shoulderToWaist" name="shoulderToWaist" type="number" step="0.1" /></div>
            <div className="space-y-2"><Label htmlFor="shoulderToAnkle">Shoulder to Ankle</Label><Input id="shoulderToAnkle" name="shoulderToAnkle" type="number" step="0.1" /></div>
            <div className="space-y-2"><Label htmlFor="shoulderToWrist">Shoulder to Wrist</Label><Input id="shoulderToWrist" name="shoulderToWrist" type="number" step="0.1" /></div>
            <div className="space-y-2"><Label htmlFor="shoulderToElbow">Shoulder to Elbow</Label><Input id="shoulderToElbow" name="shoulderToElbow" type="number" step="0.1" /></div>
            <div className="space-y-2"><Label htmlFor="innerArmLength">Inner Arm Length</Label><Input id="innerArmLength" name="innerArmLength" type="number" step="0.1" /></div>
            <div className="space-y-2"><Label htmlFor="outseamLength">Outseam Length</Label><Input id="outseamLength" name="outseamLength" type="number" step="0.1" /></div>
            <div className="space-y-2"><Label htmlFor="inseamLength">Inseam Length</Label><Input id="inseamLength" name="inseamLength" type="number" step="0.1" /></div>
            <div className="space-y-2"><Label htmlFor="backRise">Back Rise</Label><Input id="backRise" name="backRise" type="number" step="0.1" /></div>
            <div className="space-y-2"><Label htmlFor="frontRise">Front Rise</Label><Input id="frontRise" name="frontRise" type="number" step="0.1" /></div>
            <div className="space-y-2"><Label htmlFor="singleShoulder">Single Shoulder</Label><Input id="singleShoulder" name="singleShoulder" type="number" step="0.1" /></div>
            <div className="space-y-2"><Label htmlFor="frontDrop">Front Drop</Label><Input id="frontDrop" name="frontDrop" type="number" step="0.1" /></div>
            <div className="space-y-2"><Label htmlFor="backDrop">Back Drop</Label><Input id="backDrop" name="backDrop" type="number" step="0.1" /></div>
            <div className="space-y-2"><Label htmlFor="armholeCurveStraight">Armhole Curve (Straight)</Label><Input id="armholeCurveStraight" name="armholeCurveStraight" type="number" step="0.1" /></div>
            <div className="space-y-2"><Label htmlFor="neckBandWidth">Neck Band Width</Label><Input id="neckBandWidth" name="neckBandWidth" type="number" step="0.1" /></div>
            <div className="space-y-2"><Label htmlFor="collarWidth">Collar Width</Label><Input id="collarWidth" name="collarWidth" type="number" step="0.1" /></div>
            <div className="space-y-2"><Label htmlFor="collarPoint">Collar Point</Label><Input id="collarPoint" name="collarPoint" type="number" step="0.1" /></div>
            <div className="space-y-2"><Label htmlFor="sleeveLength">Sleeve Length</Label><Input id="sleeveLength" name="sleeveLength" type="number" step="0.1" /></div>
            <div className="space-y-2"><Label htmlFor="sleeveOpen">Sleeve Open</Label><Input id="sleeveOpen" name="sleeveOpen" type="number" step="0.1" /></div>
            <div className="space-y-2"><Label htmlFor="cuffHeight">Cuff Height</Label><Input id="cuffHeight" name="cuffHeight" type="number" step="0.1" /></div>
            <div className="space-y-2"><Label htmlFor="waistBand">Waist Band</Label><Input id="waistBand" name="waistBand" type="number" step="0.1" /></div>
            <div className="space-y-2"><Label htmlFor="legOpen">Leg Open</Label><Input id="legOpen" name="legOpen" type="number" step="0.1" /></div>
            <div className="space-y-2"><Label htmlFor="seatLength">Seat Length</Label><Input id="seatLength" name="seatLength" type="number" step="0.1" /></div>
            <div className="space-y-2"><Label htmlFor="dressLength">Dress Length</Label><Input id="dressLength" name="dressLength" type="number" step="0.1" /></div>
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
