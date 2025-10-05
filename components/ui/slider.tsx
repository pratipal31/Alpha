"use client";
import * as SliderPrimitive from '@radix-ui/react-slider';

interface SliderProps {
  value: number;
  onChange: (value: number) => void;
}

export function Slider({ value, onChange }: SliderProps) {
  return (
    <SliderPrimitive.Root
      className="relative flex items-center w-full h-5"
      value={[value]}
      onValueChange={(val) => onChange(val[0])}
      max={100}
      step={1}
    >
      <SliderPrimitive.Track className="bg-gray-200 relative flex-1 h-1 rounded-full">
        <SliderPrimitive.Range className="absolute bg-purple-600 h-full rounded-full" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="block w-5 h-5 bg-purple-700 rounded-full" />
    </SliderPrimitive.Root>
  );
}
