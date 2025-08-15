import React, { useEffect, useRef, useState } from "react"
import "./assets/style.css"
import type { Variant } from "./types"


export interface ToastProps {
    title?: string
    description?: string
    duration?: number
    variant?: Variant
    actionLabel?: string;
    onAction?: () => void;
    dismissible?: boolean;
    onDismiss?: () => void
    position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
}

export const Toast = ({ title, description, duration = 4000, variant = "default", actionLabel, onAction, dismissible = false, onDismiss, position = "bottom-right" }: ToastProps) => {
    const [hover, setHover] = useState(false);
    const [elapsed, setElapsed] = useState(0);
    const startedAt = useRef<number | null>(null);
    const timer = useRef<number | null>(null);

    const clear = () => {
        if (timer.current) {
            window.clearInterval(timer.current);
            timer.current = null;
        }
    };

    useEffect(() => {
        if (duration === 0) return; // persistent

        if (!hover) {
            startedAt.current = performance.now();
            timer.current = window.setInterval(() => {
                setElapsed((prev) => {
                    const now = performance.now();
                    const added = startedAt.current ? now - startedAt.current : 0;
                    startedAt.current = now;
                    return prev + added;
                });
            }, 16);
        }
        return clear;
    }, [hover, duration]);

    useEffect(() => {
        if (duration === 0) return;
        if (elapsed >= duration) {
            onDismiss?.();
        }
    }, [elapsed, duration, onDismiss]);

    const pct = duration === 0 ? 0 : Math.max(0, Math.min(100, ((duration - elapsed) / duration) * 100));

    return (
        <div
            className={["toast-viewport", position].join(" ")}
            role="region"
            aria-live="polite"
            aria-label="Notifications"
        >
            <div
                className={["toast", variant].join(" ")}
                role="status"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                <div className="toast-body">
                    <div className="toast-content">
                        {title && <div className="toast-title">{title}</div>}
                        {description && <div className="toast-desc">{description}</div>}
                    </div>
                    <div className="toast-actions">
                        {actionLabel && (
                            <button
                                className={["toast-btn", "action"].join(" ")}
                                onClick={() => {
                                    onAction?.();
                                    onDismiss?.();
                                }}
                            >
                                {actionLabel}
                            </button>
                        )}
                        {dismissible && (
                            <button
                                className={["toast-btn", "close"].join(" ")}
                                aria-label="Close" onClick={() => onDismiss?.()}
                            >
                                ×
                            </button>
                        )}
                    </div>
                </div>
                {duration > 0 && (
                    <div className="toast-progress" aria-hidden>
                        <div className="toast-progress-bar" style={{ width: `${pct}%` }} />
                    </div>
                )}
            </div>
        </div>
    );
}
