"use client";

import type { Control } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const measurementFieldsList = [
  { name: "height", label: "Height" },
  { name: "neckWidth", label: "Neck Width" },
  { name: "shoulder", label: "Shoulder" },
  { name: "armholeCurve", label: "Armhole Curve" },
  { name: "upperarmWidth", label: "Upperarm Width" },
  { name: "chest", label: "Chest/Bust" },
  { name: "underbust", label: "Underbust" },
  { name: "nippleToNipple", label: "Nipple to Nipple" },
  { name: "waist", label: "Waist" },
  { name: "hips", label: "Hips" },
  { name: "waistToKneeLength", label: "Waist to Knee" },
  { name: "waistToAnkle", label: "Waist to Ankle" },
  { name: "thighCirc", label: "Thigh Circ" },
  { name: "ankleCirc", label: "Ankle Circ" },
  { name: "shoulderToWaist", label: "Shoulder to Waist" },
  { name: "shoulderToAnkle", label: "Shoulder to Ankle" },
  { name: "shoulderToWrist", label: "Shoulder to Wrist" },
  { name: "shoulderToElbow", label: "Shoulder to Elbow" },
  { name: "innerArmLength", label: "Inner Arm Length" },
  { name: "outseamLength", label: "Outseam Length" },
  { name: "inseamLength", label: "Inseam Length" },
  { name: "backRise", label: "Back Rise" },
  { name: "frontRise", label: "Front Rise" },
  { name: "singleShoulder", label: "Single Shoulder" },
  { name: "frontDrop", label: "Front Drop" },
  { name: "backDrop", label: "Back Drop" },
  { name: "armholeCurveStraight", label: "Armhole Curve (Straight)" },
  { name: "neckBandWidth", label: "Neck Band Width" },
  { name: "collarWidth", label: "Collar Width" },
  { name: "collarPoint", label: "Collar Point" },
  { name: "sleeveLength", label: "Sleeve Length" },
  { name: "sleeveOpen", label: "Sleeve Open" },
  { name: "cuffHeight", label: "Cuff Height" },
  { name: "waistBand", label: "Waist Band" },
  { name: "legOpen", label: "Leg Open" },
  { name: "seatLength", label: "Seat Length" },
  { name: "dressLength", label: "Dress Length" },
];

interface MeasurementFieldsProps {
  control: Control<any>;
}

export function MeasurementFields({ control }: MeasurementFieldsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 pr-2">
      {measurementFieldsList.map((fieldInfo) => (
        <FormField
          key={fieldInfo.name}
          control={control}
          name={`details.${fieldInfo.name}`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{fieldInfo.label}</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.1"
                  placeholder="Inches"
                  {...field}
                  onChange={e => field.onChange(e.target.value === '' ? undefined : +e.target.value)}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
    </div>
  );
}
