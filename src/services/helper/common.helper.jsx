import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { BRICK_TYPE_OPTIONS } from "../data";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatNumberIN(num) {
  if (num === null || num === undefined) return "";
  return new Intl.NumberFormat("en-IN").format(num);
}

export const getBrickTypeLabel = (id) => {
  return BRICK_TYPE_OPTIONS.find((option) => option.id === id)?.label || id;
};

export function formatStatusText(input = "") {
  return input
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export const getBrickTypeArrayLabels = (types = []) => {
  if (!Array.isArray(types) || types.length === 0) return [];

  return types
    .map((type) => BRICK_TYPE_OPTIONS.find((opt) => opt.id === type)?.label)
    .filter(Boolean);
};

