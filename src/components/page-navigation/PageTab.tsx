"use client";

import { useCallback, useState } from "react";
import { Info, FileText, CheckCircle, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Page } from "@/types";
import { PageContextMenu } from "./context-menu/PageContextMenu";

const iconMap = {
  info: Info,
  "file-text": FileText,
  "check-circle": CheckCircle,
} as const;

interface PageTabProps {
  page: Page;
  isActive: boolean;
  isDragging?: boolean;
  onSelect: (pageId: string) => void;
  onSetAsFirst: (pageId: string) => void;
  onRename: (pageId: string) => void;
  onCopy: (pageId: string) => void;
  onDuplicate: (pageId: string) => void;
  onDelete: (pageId: string) => void;
}

export function PageTab({
  page,
  isActive,
  isDragging = false,
  onSelect,
  onSetAsFirst,
  onRename,
  onCopy,
  onDuplicate,
  onDelete,
}: PageTabProps) {
  const IconComponent = iconMap[page.icon];
  const [contextMenuOpen, setContextMenuOpen] = useState(false);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case "Enter":
        case " ":
          e.preventDefault();
          onSelect(page.id);
          break;
        case "Delete":
        case "Backspace":
          e.preventDefault();
          onDelete(page.id);
          break;
        case "F2":
          e.preventDefault();
          onRename(page.id);
          break;
        case "F10":
          if (e.shiftKey) {
            e.preventDefault();
            e.stopPropagation();
            setContextMenuOpen(true);
          }
          break;
      }
    },
    [page.id, onSelect, onDelete, onRename]
  );

  const handleClick = useCallback(() => {
    onSelect(page.id);
  }, [page.id, onSelect]);

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    if ((e.target as Element).closest("button")) return;
    e.preventDefault();
    e.stopPropagation();
    setContextMenuOpen(true);
  }, []);

  const handleContextMenuToggle = useCallback((open: boolean) => {
    setContextMenuOpen(open);
  }, []);

  return (
    <div
      className={cn(
        "group relative flex items-center gap-2.5 px-4 py-3 text-sm font-medium transition-all duration-200 cursor-pointer rounded-xl select-none",
        isDragging && "shadow-lg rotate-2 scale-105",
        isActive && "border bg-white text-gray-900 border-[#e1e1e1] shadow-sm",
        !isActive && [
          "bg-[#ebedf0] text-gray-500 border-2 border-transparent",
          "hover:bg-[#d8dce0] hover:text-gray-700",
        ],
        "focus-within:bg-white focus-within:border-2 focus-within:border-blue-500 focus-within:text-gray-900"
      )}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
      role="tab"
      aria-selected={isActive}
      aria-label={`${page.name} page${
        isActive ? " (active)" : ""
      }. Right-click for more options.`}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      title={`${page.name}${
        isActive ? " (active)" : ""
      }. Right-click for more options.`}
    >
      <IconComponent
        className={cn(
          "h-4 w-4 transition-colors flex-shrink-0",
          isActive && "text-[#f59c0e]",
          !isActive && "text-gray-400 group-hover:text-gray-500",
          "group-focus-within:text-[#f59c0e]"
        )}
        aria-hidden="true"
      />
      <span className="truncate max-w-36 font-medium" title={page.name}>
        {page.name}
      </span>
      <PageContextMenu
        page={page}
        onSetAsFirst={onSetAsFirst}
        onRename={onRename}
        onCopy={onCopy}
        onDuplicate={onDuplicate}
        onDelete={onDelete}
        isActive={isActive}
        isOpen={contextMenuOpen}
        onOpenChange={handleContextMenuToggle}
      >
        <MoreVertical
          className="h-4 w-4 text-gray-400 flex-shrink-0"
          aria-hidden="true"
        />
      </PageContextMenu>
    </div>
  );
}
