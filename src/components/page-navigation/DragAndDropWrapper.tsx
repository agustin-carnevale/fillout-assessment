"use client";

import React, { useCallback } from "react";
import type { ReactNode } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Page } from "@/types";

interface DragAndDropWrapperProps {
  pages: Page[];
  onReorder: (pages: Page[]) => void;
  children: ReactNode;
}

interface SortableItemProps {
  id: string;
  children: ReactNode;
}

function SortableItem({ id, children }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // Filter out keyboard listeners to prevent interference with custom keyboard shortcuts
  const filteredListeners = useCallback(() => {
    if (!listeners) return {};
    return Object.fromEntries(
      Object.entries(listeners).filter(([key]) => key !== "onKeyDown")
    );
  }, [listeners]);

  // Clone the child and inject isDragging prop if it's a valid React element
  const childWithDragging =
    typeof children === "object" &&
    children &&
    (children as React.ReactElement).type
      ? (React.cloneElement(
          children as React.ReactElement<{ isDragging?: boolean }>,
          {
            isDragging,
          }
        ) as React.ReactNode)
      : children;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...filteredListeners()}
      className={isDragging ? "z-10" : ""}
      aria-describedby={`sortable-item-${id}`}
    >
      {childWithDragging}
    </div>
  );
}

export function DragAndDropWrapper({
  pages,
  onReorder,
  children,
}: DragAndDropWrapperProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (over && active.id !== over.id) {
        const oldIndex = pages.findIndex((page) => page.id === active.id);
        const newIndex = pages.findIndex((page) => page.id === over.id);

        if (oldIndex !== -1 && newIndex !== -1) {
          onReorder(arrayMove(pages, oldIndex, newIndex));
        }
      }

      // Prevent focus on any element after drag by blurring the document
      setTimeout(() => {
        if (document.activeElement) {
          (document.activeElement as HTMLElement).blur();
        }
      }, 0);
    },
    [pages, onReorder]
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={pages.map((p) => p.id)}
        strategy={horizontalListSortingStrategy}
      >
        {children}
      </SortableContext>
    </DndContext>
  );
}

export { SortableItem };
