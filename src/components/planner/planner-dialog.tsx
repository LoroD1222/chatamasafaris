"use client";

import type { MouseEvent, ReactNode } from "react";
import { useState } from "react";

import { Button, type ButtonProps } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { LeadPlanner } from "@/features/home/lead-planner";
import type { HomeDictionary } from "@/i18n/types";

type Planner = HomeDictionary["planner"];

type PlannerDialogButtonProps = Omit<ButtonProps, "asChild"> & {
  planner: Planner;
  children: ReactNode;
};

export function PlannerDialogButton({ planner, children, onClick, type = "button", ...props }: PlannerDialogButtonProps) {
  const [open, setOpen] = useState(false);

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    onClick?.(event);

    if (!event.defaultPrevented) {
      setOpen(true);
    }
  }

  return (
    <>
      <Button type={type} onClick={handleClick} {...props}>
        {children}
      </Button>
      <PlannerDialog planner={planner} open={open} onOpenChange={setOpen} />
    </>
  );
}

export function PlannerDialog({
  planner,
  open,
  onOpenChange
}: {
  planner: Planner;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle className="sr-only">{planner.title}</DialogTitle>
        <LeadPlanner planner={planner} className="w-full border-white/30 bg-white shadow-none" />
      </DialogContent>
    </Dialog>
  );
}
