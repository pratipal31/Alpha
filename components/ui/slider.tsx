"use client";
import * as SliderPrimitive from "@radix-ui/react-slider";

interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

export function Slider({ value, onChange, min = 0, max = 100, step = 1 }: SliderProps) {
  return (
    <SliderPrimitive.Root
      className="relative flex items-center w-full h-5"
      value={[value]} // Radix expects an array
      onValueChange={(val) => onChange(val[0])} // Extract the first number
      min={min}
      max={max}
      step={step}
    >
      <SliderPrimitive.Track className="bg-gray-200 relative flex-1 h-1 rounded-full">
        <SliderPrimitive.Range className="absolute bg-purple-600 h-full rounded-full" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="block w-5 h-5 bg-purple-700 rounded-full cursor-pointer" />
    </SliderPrimitive.Root>
  );
}
