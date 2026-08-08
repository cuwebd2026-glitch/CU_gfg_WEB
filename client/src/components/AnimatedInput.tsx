import { motion, useReducedMotion } from "motion/react";
import { useId, useRef, useState } from "react";

const EASE_IN_OUT_CUBIC_X1 = 0.4;
const EASE_IN_OUT_CUBIC_Y1 = 0;
const EASE_IN_OUT_CUBIC_X2 = 0.2;
const EASE_IN_OUT_CUBIC_Y2 = 1;

const LABEL_TRANSITION = {
  duration: 0.28,
  ease: [
    EASE_IN_OUT_CUBIC_X1,
    EASE_IN_OUT_CUBIC_Y1,
    EASE_IN_OUT_CUBIC_X2,
    EASE_IN_OUT_CUBIC_Y2,
  ] as [number, number, number, number],
};

export interface AnimatedInputProps {
  className?: string;
  defaultValue?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  inputClassName?: string;
  label: string;
  labelClassName?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  value?: string;
}

export default function AnimatedInput({
  value,
  defaultValue = "",
  onChange,
  label,
  placeholder = "",
  disabled = false,
  className = "",
  inputClassName = "",
  labelClassName = "",
  icon,
}: AnimatedInputProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = value !== undefined;
  const val = isControlled ? value : internalValue;
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const isFloating = !!val || isFocused;
  const shouldReduceMotion = useReducedMotion();
  const reactId = useId();
  const inputId = `animated-input-${reactId.replace(/:/g, "")}`;

  const getLabelAnimation = () => {
    if (shouldReduceMotion) {
      return {};
    }
    if (isFloating) {
      return {
        y: -24,
        scale: 0.85,
        color: "var(--gfg-green)",
        borderColor: "var(--gfg-green)",
      };
    }
    return { y: 0, scale: 1, color: "var(--muted-foreground)" };
  };

  const getLabelStyle = () => {
    if (!shouldReduceMotion) {
      return {};
    }
    if (isFloating) {
      return {
        transform: "translateY(-24px) scale(0.85)",
        color: "var(--gfg-green)",
        borderColor: "var(--gfg-green)",
      };
    }
    return {
      transform: "translateY(0) scale(1)",
      color: "var(--muted-foreground)",
    };
  };

  return (
    <div className={`relative flex items-center ${className}`}>
      {icon && (
        <span
          aria-hidden="true"
          className="absolute top-1/2 left-3.5 -translate-y-1/2 text-muted-foreground z-10 pointer-events-none flex items-center justify-center"
        >
          {icon}
        </span>
      )}
      <input
        aria-label={label}
        className={`peer w-full rounded-lg border border-border bg-secondary/50 py-3 pr-4 text-sm text-foreground outline-none transition focus-visible:ring-2 focus-visible:ring-[var(--gfg-green)] focus-visible:ring-offset-2 focus-visible:ring-offset-background hover:border-muted-foreground/40 ${
          icon ? "pl-11" : "pl-3"
        } ${inputClassName}`}
        disabled={disabled}
        id={inputId}
        onBlur={() => setIsFocused(false)}
        onChange={(e) => {
          if (!isControlled) {
            setInternalValue(e.target.value);
          }
          onChange?.(e.target.value);
        }}
        onFocus={() => setIsFocused(true)}
        placeholder={isFloating ? placeholder : ""}
        ref={inputRef}
        type="text"
        value={val}
      />
      <motion.label
        animate={getLabelAnimation()}
        className={`pointer-events-none absolute top-1/2 origin-left -translate-y-1/2 rounded-sm border border-transparent bg-secondary/50 px-1 text-muted-foreground transition-all ${
          icon ? "left-10" : "left-3"
        } ${labelClassName}`}
        htmlFor={inputId}
        style={{
          zIndex: 2,
          ...getLabelStyle(),
        }}
        transition={shouldReduceMotion ? { duration: 0 } : LABEL_TRANSITION}
      >
        {label}
      </motion.label>
    </div>
  );
}