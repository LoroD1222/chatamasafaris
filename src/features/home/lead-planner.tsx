"use client";

import { ArrowRight } from "lucide-react";
import { FormEvent, useEffect, useId, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { HomeDictionary, PlannerField } from "@/i18n/types";
import { cn } from "@/utils/cn";
import { submitWeb3Form } from "@/utils/web3forms";

type Planner = HomeDictionary["planner"];

type LeadPlannerProps = {
  planner: Planner;
  sectionId?: string;
  className?: string;
};

export function LeadPlanner({ planner, sectionId, className }: LeadPlannerProps) {
  const id = useId();
  const initialValues = useMemo(
    () => Object.fromEntries(planner.fields.map((field) => [field.name, ""])) as Record<string, string>,
    [planner.fields]
  );
  const [values, setValues] = useState(initialValues);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [invalidFields, setInvalidFields] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  function updateValue(name: string, value: string) {
    setValues((current) => ({ ...current, [name]: value }));
    setInvalidFields((current) => current.filter((fieldName) => fieldName !== name));
    setSubmitError("");
  }

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const missing = planner.fields.filter((field) => !values[field.name]?.trim()).map((field) => field.name);

    if (missing.length > 0) {
      setInvalidFields(missing);
      setSubmitted(false);
      return;
    }

    setSubmitting(true);
    setSubmitError("");

    try {
      await submitWeb3Form({
        subject: "New safari planner request",
        values: {
          ...values,
          form_name: planner.title
        }
      });
      setSubmitted(true);
      setValues(initialValues);
    } catch {
      setSubmitted(false);
      setSubmitError("Something went wrong. Please try again or contact us on WhatsApp.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section
      id={sectionId}
      data-hydrated={hydrated ? "true" : undefined}
      aria-labelledby={`${id}-title`}
      className={cn(
        "scroll-mt-24 rounded-[15px] border border-black/15 bg-white/80 p-5 text-astra-brown shadow-[0_22px_70px_rgba(28,22,18,0.22)] backdrop-blur-[5px]",
        className
      )}
    >
      <div className="border-b border-astra-brown/20 pb-5">
        <p className="text-[13px] font-bold uppercase leading-[1.6] tracking-[0.05em] text-astra-gold">{planner.eyebrow}</p>
        <h2 id={`${id}-title`} className="mt-2 text-[25px] font-semibold leading-[1.14]">
          {planner.title}
        </h2>
        <p className="mt-2 max-w-[296px] text-xs leading-[1.4]">{planner.description}</p>
      </div>

      <form className="mt-5 grid gap-4" aria-label={planner.title} onSubmit={submitForm} noValidate>
        <div className="grid gap-4 sm:grid-cols-2">
          {planner.fields.map((field, index) => (
            <PlannerFieldControl
              key={field.name}
              field={field}
              id={`${id}-${field.name}`}
              value={values[field.name] ?? ""}
              invalid={invalidFields.includes(field.name)}
              onChange={(value) => updateValue(field.name, value)}
              className={index === 0 || index === planner.fields.length - 1 ? "sm:col-span-2" : undefined}
            />
          ))}
        </div>

        <Button
          type="submit"
          disabled={submitting}
          className="mt-1 h-[42px] w-full rounded-[9px] bg-astra-gold px-4 text-[15px] font-semibold text-astra-cocoa hover:bg-astra-gold/90"
        >
          <span className="me-auto">{submitting ? "Sending..." : planner.submit}</span>
          <ArrowRight data-icon="inline-end" className="size-4" aria-hidden="true" />
        </Button>

        {submitError ? (
          <p className="rounded-md bg-red-500/10 px-3 py-2 text-center text-xs font-semibold text-red-700" role="alert">
            {submitError}
          </p>
        ) : submitted ? (
          <p className="rounded-md bg-astra-gold/15 px-3 py-2 text-center text-xs font-semibold text-astra-cocoa" role="status">
            {planner.success}
          </p>
        ) : (
          <p className="text-center text-[11px] leading-[1.5] text-astra-brown/65">{planner.note}</p>
        )}
      </form>
    </section>
  );
}

function PlannerFieldControl({
  field,
  id,
  value,
  invalid,
  onChange,
  className
}: {
  field: PlannerField;
  id: string;
  value: string;
  invalid: boolean;
  onChange: (value: string) => void;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-1.5", className)} data-invalid={invalid ? true : undefined}>
      <Label htmlFor={id} className="sr-only">
        {field.label}
      </Label>
      {field.type === "select" ? (
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger
            id={id}
            aria-label={field.label}
            aria-invalid={invalid}
            className="h-[47px] rounded border border-[#1C1612]/15 bg-astra-cream px-[18px] text-left text-[13px] font-bold text-astra-brown/60 shadow-none focus:ring-astra-gold"
          >
            <SelectValue placeholder={field.placeholder} />
          </SelectTrigger>
          <SelectContent className="bg-white text-astra-brown">
            {field.options.map((option) => (
              <SelectItem key={option} value={option} className="focus:bg-astra-cream">
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <Input
          id={id}
          name={field.name}
          type={field.type}
          value={value}
          placeholder={field.placeholder}
          autoComplete={field.type === "email" ? "email" : field.type === "tel" ? "tel" : "name"}
          aria-invalid={invalid}
          onChange={(event) => onChange(event.currentTarget.value)}
          className="h-[47px] rounded border border-[#1C1612]/15 bg-astra-cream px-[18px] text-[13px] font-bold text-astra-brown placeholder:text-astra-brown/60 focus-visible:ring-astra-gold"
        />
      )}
    </div>
  );
}
