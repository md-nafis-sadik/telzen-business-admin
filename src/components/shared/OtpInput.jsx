import { cn } from "@/services";
import React, { useEffect, useMemo, useRef } from "react";

/**
 * A11y-friendly OTP input component with:
 * - Auto-advance to next box
 * - Backspace to previous box
 * - Paste full OTP
 * - Numeric keypad on mobile
 */
const OtpInput = ({
    length = 4,
    value,
    onChange,
    onComplete, // optional callback when value reaches full length
    autoFocus = true,
    inputClassName = "",
    containerClassName = "",
    name, // optional: adds a hidden input to submit via native forms
}) => {

    const refs = useRef([]);
    const digits = useMemo(() => (value || "").padEnd(length, " ").slice(0, length).split(""), [value, length]);

    useEffect(() => {
        if (autoFocus && refs.current[0]) refs.current[0].focus();
    }, [autoFocus]);

    useEffect(() => {
        if (onComplete && value?.length === length) {
            onComplete(value);
        }
    }, [value, length, onComplete]);

    const setFocus = (index) => {
        const el = refs.current[index];
        if (el) {
            el.focus();
            el.select?.();
        }
    };

    const commitChange = (nextValue) => {
        const cleaned = nextValue.replace(/\D/g, "").slice(0, length);
        onChange?.(cleaned);
    };

    const handleChange = (e, index) => {
        const raw = e.target.value;
        // If user pasted multiple chars into a single box, distribute them
        if (raw.length > 1) {
            const chunk = raw.replace(/\D/g, "");
            if (!chunk) return;

            const prefix = (value || "").slice(0, index);
            const suffix = (value || "").slice(index + chunk.length);
            const combined = (prefix + chunk + suffix).slice(0, length);

            commitChange(combined);

            const nextIndex = Math.min(index + chunk.length, length - 1);
            setFocus(nextIndex);
            return;
        }

        // Single char typed
        const char = raw.replace(/\D/g, "");
        const arr = (value || "").split("");
        arr[index] = char || "";
        const next = arr.join("");
        commitChange(next);

        if (char) {
            if (index < length - 1) setFocus(index + 1);
        }
    };

    const handleKeyDown = (e, index) => {
        const key = e.key;

        if (key === "Backspace") {
            if (!digits[index].trim() && index > 0) {
                // Move back if current is empty
                const arr = (value || "").split("");
                arr[index - 1] = "";
                commitChange(arr.join(""));
                setFocus(index - 1);
                e.preventDefault();
            }
            return;
        }

        if (key === "ArrowLeft" && index > 0) {
            setFocus(index - 1);
            e.preventDefault();
        } else if (key === "ArrowRight" && index < length - 1) {
            setFocus(index + 1);
            e.preventDefault();
        } else if (key === "Home") {
            setFocus(0);
            e.preventDefault();
        } else if (key === "End") {
            setFocus(length - 1);
            e.preventDefault();
        }
    };

    const handlePaste = (e, index) => {
        e.preventDefault();
        const text = (e.clipboardData || window.clipboardData).getData("text") || "";
        if (!text) return;

        const cleaned = text.replace(/\D/g, "");
        if (!cleaned) return;

        const before = (value || "").slice(0, index);
        const after = (value || "").slice(index + cleaned.length);
        const combined = (before + cleaned + after).slice(0, length);

        commitChange(combined);

        const nextIndex = Math.min(index + cleaned.length - 1, length - 1);
        setFocus(nextIndex);
    };

    return (
        <div className={cn("flex gap-x-4 justify-center", containerClassName)}>
            {Array.from({ length }).map((_, i) => (
                <input
                    key={i}
                    ref={(el) => (refs.current[i] = el)}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    value={digits[i].trim() || ""}
                    onChange={(e) => handleChange(e, i)}
                    onKeyDown={(e) => handleKeyDown(e, i)}
                    onPaste={(e) => handlePaste(e, i)}
                    onFocus={(e) => e.target.select()}
                    aria-label={`OTP Digit ${i + 1}`}
                    className={cn(
                        "w-10 h-10 sm:w-11 sm:h-11 text-sm text-gray-700 text-center border border-natural-400 rounded-lg bg-transparent focus:outline-none focus:ring-1 focus:ring-violet-500 focus:border-violet-500 placeholder-transparent caret-violet-600",
                        inputClassName,
                    )}
                />
            ))}
            {name ? <input type="hidden" name={name} value={value || ""} /> : null}
        </div>
    );
};

export default OtpInput;