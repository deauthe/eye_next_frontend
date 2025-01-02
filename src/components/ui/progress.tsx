import React from "react";

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
    value?: number;
    max?: number;
    className?: string;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
    ({ className = "", value = 0, max = 100, ...props }, ref) => {
        // Ensure value is between 0 and max
        const clampedValue = Math.min(Math.max(value, 0), max);
        const percentage = (clampedValue / max) * 100;

        return (
            <div
                ref={ref}
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={max}
                aria-valuenow={clampedValue}
                className={`relative h-2 w-full overflow-hidden rounded-full bg-primary/20 ${className}`}
                {...props}
            >
                <div
                    className="h-full bg-primary transition-all duration-300 ease-in-out"
                    style={{ width: `${percentage}%` }}
                />
            </div>
        );
    }
);

Progress.displayName = "Progress";

export default Progress;