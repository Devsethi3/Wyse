"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { X, Check, Eye, EyeOff, AlertCircle } from "lucide-react";

interface InputProps {
  label?: string;
  description?: string;
  placeholder?: string;
  error?: string;
  success?: string;
  onChange?: (value: string) => void;
  onClear?: () => void;
  type?: "text" | "email" | "password" | "search" | "tel" | "url";
  required?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  readOnly?: boolean;
  name?: string;
  id?: string;
  defaultValue?: string;
  autoComplete?: string;
  tooltipText?: string;
  className?: string;
}

export default function Input({
  label,
  description,
  placeholder = "Type something...",
  error,
  success,
  onChange,
  onClear,
  type = "text",
  required = false,
  disabled = false,
  autoFocus = false,
  maxLength,
  minLength,
  pattern,
  readOnly = false,
  name,
  id,
  defaultValue = "",
  autoComplete,
  tooltipText,
  className,
}: InputProps) {
  const [value, setValue] = useState(defaultValue);
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus) {
      inputRef.current?.focus();
    }
  }, [autoFocus]);

  const handleClear = () => {
    setValue("");
    onClear?.();
    inputRef.current?.focus();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (maxLength && newValue.length > maxLength) return;
    setValue(newValue);
    onChange?.(newValue);
  };

  const getInputType = () => {
    if (type === "password") {
      return showPassword ? "text" : "password";
    }
    return type;
  };

  return (
    <div className={cn("w-full space-y-1.5", className)}>
      {label && (
        <div className="flex items-center gap-1">
          <label
            className={cn(
              "text-sm font-medium",
              disabled ? "text-zinc-400" : "text-zinc-700 dark:text-zinc-300"
            )}
            htmlFor={id || name}
          >
            {label}
            {required && <span className="text-red-500 ml-0.5">*</span>}
          </label>
          {/* {tooltipText && (
            <Tooltip content={tooltipText}>
              <AlertCircle className="w-4 h-4 text-zinc-400" />
            </Tooltip>
          )} */}
        </div>
      )}

      {description && (
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {description}
        </p>
      )}

      <div className="relative group">
        <input
          ref={inputRef}
          type={getInputType()}
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          maxLength={maxLength}
          minLength={minLength}
          pattern={pattern}
          readOnly={readOnly}
          name={name}
          id={id || name}
          autoComplete={autoComplete}
          className={cn(
            "w-full px-3 py-2",
            "rounded-lg",
            "bg-white dark:bg-zinc-900",
            "border border-zinc-200 dark:border-zinc-800",
            "text-sm text-zinc-900 dark:text-zinc-100",
            "placeholder:text-zinc-400 dark:placeholder:text-zinc-600",
            "transition-all duration-200",
            "focus:outline-none focus:ring-2",
            disabled && "opacity-50 cursor-not-allowed",
            readOnly && "cursor-default",
            error
              ? "border-red-500 focus:ring-red-500/20"
              : success
              ? "border-green-500 focus:ring-green-500/20"
              : "focus:ring-indigo-500/20 hover:border-indigo-500/50",
            isFocused && "border-indigo-500",
            type === "password" && "pr-20"
          )}
        />

        {/* Action buttons container */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {/* Password toggle */}
          {type === "password" && value && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={cn(
                "p-1 rounded-md",
                "text-zinc-400 hover:text-zinc-600",
                "dark:text-zinc-600 dark:hover:text-zinc-400",
                "transition-colors"
              )}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          )}

          {/* Clear button */}
          {value && !disabled && !readOnly && (
            <button
              type="button"
              onClick={handleClear}
              className={cn(
                "p-1 rounded-md",
                "text-zinc-400 hover:text-zinc-600",
                "dark:text-zinc-600 dark:hover:text-zinc-400",
                "transition-colors"
              )}
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Status indicator */}
        <div
          className={cn(
            "absolute -right-4 top-1/2 -translate-y-1/2",
            "transition-opacity duration-200",
            !error && !success && "opacity-0"
          )}
        >
          {error ? (
            <X className="w-4 h-4 text-red-500" />
          ) : success ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : null}
        </div>
      </div>

      {/* Character count */}
      {maxLength && (
        <div className="flex justify-end">
          <span className="text-xs text-zinc-400">
            {value.length}/{maxLength}
          </span>
        </div>
      )}

      {/* Error/Success message */}
      {(error || success) && (
        <p
          className={cn(
            "text-sm flex items-center gap-1",
            error ? "text-red-500" : "text-green-500"
          )}
        >
          {error ? (
            <AlertCircle className="w-4 h-4" />
          ) : (
            <Check className="w-4 h-4" />
          )}
          {error || success}
        </p>
      )}
    </div>
  );
}
