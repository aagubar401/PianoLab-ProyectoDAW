"use client";

import React from "react";
import clsx from "clsx";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export default function Button({
  children,
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants: Record<typeof variant, string> = {
    primary: "bg-darkblue text-white hover:bg-primary focus:ring-primary",
    secondary:
      "bg-white text-darkblue border border-gray-200 hover:bg-gray-50 focus:ring-primary",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-primary",
  };

  return (
    <button className={clsx(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}
