"use client";

import Link from "next/link";
import { ReviewCard } from "@/components/editor/ReviewCard";
import { createDesignFromTemplate, templates } from "@/templates";

export function TemplateGrid() {
  return (
    <div className="mt-10 grid grid-cols-1 min-[420px]:grid-cols-2 md:grid-cols-3 gap-4">
      {templates.map((template) => {
        const design = createDesignFromTemplate(template, {
          businessName: template.name,
          reviewUrl: "",
          message: template.config.defaultMessage,
        });
        return (
          <Link
            key={template.id}
            href={`/create?template=${template.id}`}
            className="group rounded-2xl border border-border bg-white p-3 shadow-sm transition-transform duration-200 hover:-translate-y-0.5"
          >
            <div className="aspect-square overflow-hidden rounded-xl">
              <ReviewCard design={design} className="h-full w-full" />
            </div>
            <div className="px-1 pb-1 pt-3">
              <p className="text-sm font-medium">{template.name}</p>
              <p className="text-xs text-muted">{template.category}</p>
              <p className="mt-1 line-clamp-2 text-xs text-muted">{template.description}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
