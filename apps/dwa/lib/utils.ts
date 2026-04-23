import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merges Tailwind CSS classes with clsx and tailwind-merge.
 * 
 * @param inputs - Class names or conditional class objects.
 * @returns A merged string of classes.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a date string or timestamp into a readable US format.
 * 
 * @param input - Date string or numeric timestamp.
 * @returns Formatted date string (e.g., "January 1, 2026").
 */
export function formatDate(input: string | number): string {
  const date = new Date(input)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

/**
 * Constructs an absolute URL targeting the application's base URL.
 * 
 * @param path - Relative path from the root.
 * @returns Absolute URL string.
 */
export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
}