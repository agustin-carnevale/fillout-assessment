import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Page } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateId(): string {
  // Use crypto.randomUUID() for better uniqueness and security
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback for environments without crypto.randomUUID
  return Math.random().toString(36).substr(2, 9);
}

export function reorderPages(
  pages: Page[],
  startIndex: number,
  endIndex: number
): Page[] {
  const result = Array.from(pages);
  const [removed] = result.splice(startIndex, 1);
  if (removed) {
    result.splice(endIndex, 0, removed);
  }
  return result;
}

export function createNewPage(name = "New Page"): Page {
  return {
    id: generateId(),
    name,
    icon: "file-text",
  };
}
