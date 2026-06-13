import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
    icon?: LucideIcon;
    title: string;
    description?: string;
    action?: React.ReactNode;
    className?: string;
}

export function EmptyState({
    icon: Icon,
    title,
    description,
    action,
    className,
}: EmptyStateProps) {
    return (
        <div
            className={cn(
                "flex flex-col items-center justify-center text-center p-8 min-h-[400px]",
                className
            )}
        >
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                }}
                className="relative mb-6"
            >
                <div className="absolute inset-0 blur-3xl rounded-full scale-150" />
                {Icon ? (
                    <div className="relative bg-background border border-border p-5 rounded-2xl shadow-sm">
                        <Icon className="w-20 h-20 text-brand" />
                    </div>
                ) : (
                    <div className="relative bg-background border border-border p-5 rounded-2xl shadow-sm">
                        <svg
                            className="w-20 h-20 text-muted-foreground"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>
                )}
            </motion.div>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="max-w-xs space-y-2"
            >
                <h3 className="text-xl font-bold tracking-tight">{title}</h3>
                {description && (
                    <p className="text-muted-foreground text-sm leading-relaxed">
                        {description}
                    </p>
                )}
            </motion.div>

            {action && (
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mt-8"
                >
                    {action}
                </motion.div>
            )}
        </div>
    );
}
