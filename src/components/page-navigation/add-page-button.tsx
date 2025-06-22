"use client";

import { Plus } from "lucide-react";
import type { AddPageButtonProps } from "@/types";

export function AddPageButton({
  onAddPage,
  position = "between",
}: AddPageButtonProps) {
  const isEndButton = position === "end";

  if (isEndButton) {
    return (
      <button
        onClick={onAddPage}
        className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-gray-600 hover:text-gray-900 bg-white border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label="Add new page"
      >
        <Plus className="h-4 w-4" />
        <span>Add page</span>
      </button>
    );
  }

  return (
    <div className="flex items-center justify-center w-6 group-hover:w-24 transition-all duration-300 ease-out">
      <button
        onClick={onAddPage}
        className="w-6 h-6 rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label="Insert page here"
      >
        <Plus className="h-3 w-3" />
      </button>
    </div>
  );
}
