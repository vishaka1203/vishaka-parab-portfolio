"use client";
import { LayoutProvider } from "@once-ui-system/core/next";
import { Tag } from "@once-ui-system/core/components/Tag";
export function CurrentTag() {
  return (
    <LayoutProvider>
      <Tag size="s" className="current-tag">
        CURRENT
      </Tag>
    </LayoutProvider>
  );
}
