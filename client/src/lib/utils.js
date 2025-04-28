import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"



export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


export function formatDate(date) {
  if (!date) return ""

  const options = {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }

  return new Date(date).toLocaleString("en-US", options)
}
