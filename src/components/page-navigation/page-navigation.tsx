"use client";

import React, { useState, useCallback } from "react";
import type { Page } from "@/types";
import { createNewPage } from "@/lib/utils";
import { PageTab } from "./page-tab";
import { AddPageButton } from "./add-page-button";
import { DragAndDropWrapper, SortableItem } from "./drag-and-drop-wrapper";

const initialPages: Page[] = [
  { id: "1", name: "Info", icon: "info", isActive: true },
  { id: "2", name: "Details", icon: "file-text" },
  { id: "3", name: "Other", icon: "file-text" },
  { id: "4", name: "Ending", icon: "check-circle" },
];

export function PageNavigation() {
  const [pages, setPages] = useState<Page[]>(initialPages);
  const [activePageId, setActivePageId] = useState("1");
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
  const [renamePageId, setRenamePageId] = useState<string | null>(null);
  const [newPageName, setNewPageName] = useState("");

  const handleSelectPage = useCallback((pageId: string) => {
    setActivePageId(pageId);
    setPages((prev) =>
      prev.map((page) => ({
        ...page,
        isActive: page.id === pageId,
      }))
    );
  }, []);

  const handleAddPage = useCallback((insertAfterIndex?: number) => {
    const newPage = createNewPage();
    setPages((prev) => {
      if (insertAfterIndex !== undefined) {
        const newPages = [...prev];
        newPages.splice(insertAfterIndex + 1, 0, newPage);
        return newPages;
      }
      return [...prev, newPage];
    });
  }, []);

  const handleSetAsFirst = useCallback((pageId: string) => {
    setPages((prev) => {
      const pageIndex = prev.findIndex((p) => p.id === pageId);
      if (pageIndex > 0) {
        const page = prev[pageIndex];
        if (page) {
          const newPages = prev.filter((p) => p.id !== pageId);
          return [page, ...newPages];
        }
      }
      return prev;
    });
  }, []);

  const handleRename = useCallback(
    (pageId: string) => {
      const page = pages.find((p) => p.id === pageId);
      if (page) {
        setRenamePageId(pageId);
        setNewPageName(page.name);
        setIsRenameDialogOpen(true);
      }
    },
    [pages]
  );

  const handleRenameConfirm = useCallback(() => {
    if (renamePageId && newPageName.trim()) {
      setPages((prev) =>
        prev.map((page) =>
          page.id === renamePageId
            ? { ...page, name: newPageName.trim() }
            : page
        )
      );
    }
    setIsRenameDialogOpen(false);
    setRenamePageId(null);
    setNewPageName("");
  }, [renamePageId, newPageName]);

  const handleRenameCancel = useCallback(() => {
    setIsRenameDialogOpen(false);
    setRenamePageId(null);
    setNewPageName("");
  }, []);

  const handleCopy = useCallback(
    async (pageId: string) => {
      const page = pages.find((p) => p.id === pageId);
      if (page) {
        try {
          await navigator.clipboard.writeText(page.name);
          // Could add toast notification here for success feedback
        } catch (error) {
          // Fallback for older browsers or when clipboard API is not available
          const textArea = document.createElement("textarea");
          textArea.value = page.name;
          document.body.appendChild(textArea);
          textArea.select();
          try {
            document.execCommand("copy");
          } catch (fallbackError) {
            // Silent fail for clipboard operations
          }
          document.body.removeChild(textArea);
        }
      }
    },
    [pages]
  );

  const handleDuplicate = useCallback(
    (pageId: string) => {
      const page = pages.find((p) => p.id === pageId);
      if (page) {
        const duplicatedPage = {
          ...createNewPage(`${page.name} Copy`),
          icon: page.icon,
        };
        const pageIndex = pages.findIndex((p) => p.id === pageId);
        setPages((prev) => {
          const newPages = [...prev];
          newPages.splice(pageIndex + 1, 0, duplicatedPage);
          return newPages;
        });
      }
    },
    [pages]
  );

  const handleDelete = useCallback(
    (pageId: string) => {
      if (pages.length > 1) {
        setPages((prev) => prev.filter((page) => page.id !== pageId));
        if (activePageId === pageId) {
          const remainingPages = pages.filter((page) => page.id !== pageId);
          if (remainingPages.length > 0) {
            handleSelectPage(remainingPages[0]!.id);
          }
        }
      }
    },
    [pages.length, activePageId, pages, handleSelectPage]
  );

  const handleReorderPages = useCallback((reorderedPages: Page[]) => {
    setPages(reorderedPages);
  }, []);

  return (
    <>
      <div className="w-full bg-[#f9fafb] relative">
        <div className="w-full px-6">
          {/* Horizontal scrollable container */}
          <div className="overflow-x-auto scrollbar-hide">
            <nav
              className="flex items-center py-4 pr-9 min-w-max relative"
              role="tablist"
            >
              <DragAndDropWrapper pages={pages} onReorder={handleReorderPages}>
                <div className="flex items-center">
                  {pages.map((page, index) => (
                    <div key={page.id} className="flex items-center">
                      <SortableItem id={page.id}>
                        <PageTab
                          page={page}
                          isActive={page.id === activePageId}
                          onSelect={handleSelectPage}
                          onSetAsFirst={handleSetAsFirst}
                          onRename={handleRename}
                          onCopy={handleCopy}
                          onDuplicate={handleDuplicate}
                          onDelete={handleDelete}
                        />
                      </SortableItem>
                      {index < pages.length - 1 && (
                        <div className="group h-10 flex items-center">
                          <AddPageButton
                            onAddPage={() => handleAddPage(index)}
                            position="between"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </DragAndDropWrapper>

              {/* Add page button at the end */}
              <div className="ml-6">
                <AddPageButton
                  onAddPage={() => handleAddPage()}
                  position="end"
                />
              </div>
            </nav>
          </div>
        </div>
      </div>

      {/* Rename Dialog */}
      {isRenameDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-[90vw]">
            <h3 className="text-lg font-semibold mb-4">Rename Page</h3>
            <input
              type="text"
              value={newPageName}
              onChange={(e) => setNewPageName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter page name"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleRenameConfirm();
                } else if (e.key === "Escape") {
                  handleRenameCancel();
                }
              }}
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={handleRenameCancel}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleRenameConfirm}
                disabled={!newPageName.trim()}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Rename
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
