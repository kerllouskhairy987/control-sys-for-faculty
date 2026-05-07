"use client";

import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

interface ProfileActionsProps {
  isEditing: boolean;
  onSave: () => void;
  onCancel: () => void;
}

export function ProfileActions({
  isEditing,
  onSave,
  onCancel,
}: ProfileActionsProps) {
  if (!isEditing) return null; 
  
  return (
    <div className="pt-4 flex justify-end gap-2">
      <Button
        size={"lg"}
        variant="outline"
        onClick={onCancel}
        className="gap-2"
      >
        <X className="h-2 w-2" />
        Cancel
      </Button>
      <Button size={"lg"} onClick={onSave} className="gap-2">
        <Check className="h-2 w-2" />
        Save Edit
      </Button>
    </div>
  );
}