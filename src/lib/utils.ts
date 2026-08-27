import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";


//this utility is fundamental for shadcn/ui it allows components to safely combine tailwind classes:
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}