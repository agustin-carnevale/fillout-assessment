export interface Page {
  id: string
  name: string
  icon: "info" | "file-text" | "check-circle"
  isActive?: boolean
}

export interface PageContextMenuProps {
  page: Page
  onSetAsFirst: (pageId: string) => void
  onRename: (pageId: string) => void
  onCopy: (pageId: string) => void
  onDuplicate: (pageId: string) => void
  onDelete: (pageId: string) => void
  isActive?: boolean
}

export interface PageTabProps {
  page: Page
  isActive: boolean
  isDragging?: boolean
  onSelect: (pageId: string) => void
  onSetAsFirst: (pageId: string) => void
  onRename: (pageId: string) => void
  onCopy: (pageId: string) => void
  onDuplicate: (pageId: string) => void
  onDelete: (pageId: string) => void
}

export interface AddPageButtonProps {
  onAddPage: () => void
  position?: "between" | "end"
}
