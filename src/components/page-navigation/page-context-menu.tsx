"use client";

import type React from "react";

import { useState, useRef, useEffect, useCallback } from "react";
import { Flag, Edit3, Files, Clipboard, Trash2 } from "lucide-react";
import { createPortal } from "react-dom";
import type { Page } from "@/types";
import { cn } from "@/lib/utils";

interface PageContextMenuProps {
  children: React.ReactNode;
  page: Page;
  onSetAsFirst: (pageId: string) => void;
  onRename: (pageId: string) => void;
  onCopy: (pageId: string) => void;
  onDuplicate: (pageId: string) => void;
  onDelete: (pageId: string) => void;
  isActive?: boolean;
  // External control props
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function PageContextMenu({
  children,
  page,
  onSetAsFirst,
  onRename,
  onCopy,
  onDuplicate,
  onDelete,
  isActive = false,
  isOpen: externalIsOpen,
  onOpenChange,
}: PageContextMenuProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Use external state if provided, otherwise use internal state
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const setIsOpen = onOpenChange || setInternalIsOpen;

  const menuItems = [
    {
      label: "Set as first page",
      icon: Flag,
      onClick: () => onSetAsFirst(page.id),
      className: "text-gray-900",
      iconClassName: "text-blue-500 fill-blue-500",
    },
    {
      label: "Rename",
      icon: Edit3,
      onClick: () => onRename(page.id),
      className: "text-gray-900",
      iconClassName: "text-gray-500",
    },
    {
      label: "Copy",
      icon: Clipboard,
      onClick: () => onCopy(page.id),
      className: "text-gray-900",
      iconClassName: "text-gray-500",
    },
    {
      label: "Duplicate",
      icon: Files,
      onClick: () => onDuplicate(page.id),
      className: "text-gray-900",
      iconClassName: "text-gray-500",
    },
    {
      label: "Delete",
      icon: Trash2,
      onClick: () => onDelete(page.id),
      className: "text-red-500",
      iconClassName: "text-red-500",
      separator: true,
    },
  ];

  const updateMenuPosition = useCallback(() => {
    if (!isOpen || !menuRef.current || !buttonRef.current) return;
    const menuHeight = menuRef.current.offsetHeight;
    const menuWidth = menuRef.current.offsetWidth;
    const { innerWidth } = window;
    const tabEl = buttonRef.current.closest('[role="tab"]');
    if (!tabEl) return;
    const rect = tabEl.getBoundingClientRect();
    let top = rect.top - menuHeight - 12;
    if (top < 0) top = rect.bottom + 12;
    let left = rect.left + rect.width / 2 - menuWidth / 2;
    if (left < 8) left = 8;
    if (left + menuWidth > innerWidth) left = innerWidth - menuWidth - 8;
    setMenuPosition({ top, left });
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    window.addEventListener("resize", updateMenuPosition);
    window.addEventListener("scroll", updateMenuPosition, true);
    updateMenuPosition();
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
      window.removeEventListener("resize", updateMenuPosition);
      window.removeEventListener("scroll", updateMenuPosition, true);
    };
  }, [isOpen, updateMenuPosition, setIsOpen]);

  const handleButtonClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (onOpenChange) {
        onOpenChange(!isOpen);
      } else {
        setInternalIsOpen(!isOpen);
      }
    },
    [isOpen, onOpenChange]
  );

  const handleMenuItemClick = useCallback(
    (onClick: () => void) => (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onClick();
      setIsOpen(false);
    },
    [setIsOpen]
  );

  return (
    <>
      <button
        ref={buttonRef}
        onClick={handleButtonClick}
        onMouseDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        className={cn(
          "ml-1 p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200",
          "hover:bg-gray-200 focus:opacity-100 focus:outline-none focus:ring-1 focus:ring-gray-400",
          isActive && "hover:bg-orange-100",
          isOpen && "opacity-100"
        )}
        aria-label={`More options for ${page.name}`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {children}
      </button>

      {/* Render menu in portal to ensure it appears above everything */}
      {typeof window !== "undefined" &&
        createPortal(
          isOpen ? (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 bg-black bg-opacity-10 z-[9998]"
                onClick={() => setIsOpen(false)}
                aria-hidden="true"
              />

              {/* Menu */}
              <div
                ref={menuRef}
                className="fixed z-[9999] w-72 rounded-2xl bg-white py-3 shadow-2xl ring-1 ring-black ring-opacity-5 animate-slide-up-fade"
                style={{
                  top: `${menuPosition.top}px`,
                  left: `${menuPosition.left}px`,
                }}
                role="menu"
                aria-orientation="vertical"
              >
                <div className="px-6 py-2 border-b border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900">Settings</h3>
                </div>

                <div className="pt-2">
                  {menuItems.map((item) => (
                    <div key={item.label}>
                      {item.separator && (
                        <div className="my-2 border-t border-gray-100" />
                      )}
                      <button
                        onClick={handleMenuItemClick(item.onClick)}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        className={cn(
                          "flex w-full items-center gap-4 px-6 py-3 text-base font-medium transition-colors hover:bg-gray-50 text-left",
                          item.className
                        )}
                        role="menuitem"
                      >
                        <item.icon
                          className={cn(
                            "h-6 w-6 flex-shrink-0",
                            item.iconClassName
                          )}
                          aria-hidden="true"
                        />
                        <span>{item.label}</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : null,
          document.body
        )}
    </>
  );
}
