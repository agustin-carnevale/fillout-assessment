"use client";

import { useEffect, useState } from "react";

interface RenameDialogProps {
  isOpen: boolean;
  initialPageName: string;
  onClose: () => void;
  onRename: (newPageName: string) => void;
}

export function RenameDialog({
  isOpen,
  initialPageName,
  onClose,
  onRename,
}: RenameDialogProps) {
  const [newPageName, setNewPageName] = useState(initialPageName);

  useEffect(() => {
    setNewPageName(initialPageName);
  }, [initialPageName]);

  const handleRenameConfirm = () => {
    if (newPageName.trim()) {
      onRename(newPageName.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleRenameConfirm();
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
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
          onKeyDown={handleKeyDown}
        />
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
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
  );
}
