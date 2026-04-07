"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type Section = {
  id: string;
  title: string;
  content: React.ReactNode;
};

type Props = {
  sections: Section[];
};

export default function CourseAccordion({ sections }: Props) {
  const [openId, setOpenId] = useState<string | null>(sections[0]?.id ?? null);

  return (
    <div className="space-y-3">
      {sections.map((section) => {
        const open = openId === section.id;
        return (
          <div
            key={section.id}
            className="bg-white rounded-xl shadow-card border border-gray-100"
          >
            <button
              onClick={() => setOpenId(open ? null : section.id)}
              className="w-full flex items-center justify-between px-4 py-3"
            >
              <span className="font-medium text-gray-800">{section.title}</span>
              <ChevronDown
                className={`w-4 h-4 text-gray-500 transition-transform ${
                  open ? "rotate-180" : ""
                }`}
              />
            </button>
            {open && (
              <div className="px-4 pb-4 pt-1 text-sm text-gray-700">
                {section.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
