"use client";

import { CalendarDays, Send } from "lucide-react";
import { useId } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { HomeDictionary } from "@/i18n/types";

type Planner = HomeDictionary["planner"];

export function LeadPlanner({ planner }: { planner: Planner }) {
  const id = useId();

  return (
    <Card id="planner" className="scroll-mt-24 border-safari-gold/30 bg-white/96 shadow-lift">
      <CardContent className="p-6">
        <div className="flex items-start gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-safari-sand text-safari-gold">
            <CalendarDays className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-2xl font-semibold text-safari-ink">{planner.title}</h2>
            <p className="mt-2 text-sm leading-6 text-safari-bark/72">{planner.description}</p>
          </div>
        </div>

        <form className="mt-6 grid gap-4" aria-label={planner.title}>
          {planner.fields.map((field, index) => {
            const fieldId = `${id}-${index}`;

            return (
              <div key={field.label} className="grid gap-2">
                <Label htmlFor={fieldId}>{field.label}</Label>
                <Select>
                  <SelectTrigger id={fieldId} aria-label={field.label}>
                    <SelectValue placeholder={field.placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            );
          })}

          <div className="grid gap-2">
            <Label htmlFor={`${id}-email`}>{planner.emailLabel}</Label>
            <Input id={`${id}-email`} name="email" type="email" placeholder={planner.emailPlaceholder} autoComplete="email" />
          </div>

          <Button type="submit" variant="gold" size="lg" className="mt-2 w-full">
            <Send className="me-2 h-4 w-4" />
            {planner.submit}
          </Button>
          <p className="text-center text-xs text-safari-bark/58">{planner.note}</p>
        </form>
      </CardContent>
    </Card>
  );
}
