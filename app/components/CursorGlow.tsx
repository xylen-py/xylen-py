"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorGlow() {
    const [visible, setVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
    const smoothX = useSpring(cursorX, springConfig);
    const smoothY = useSpring(cursorY, springConfig);

    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            if (!visible) setVisible(true);
        },
        [cursorX, cursorY, visible]
    );

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("resize", checkMobile);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [handleMouseMove]);

    if (isMobile) return null;

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9999]"
                style={{
                    x: smoothX,
                    y: smoothY,
                    translateX: "-50%",
                    translateY: "-50%",
                    opacity: visible ? 1 : 0,
                }}
            >
                <div
                    className="w-[500px] h-[500px] rounded-full"
                    style={{
                        background:
                            "radial-gradient(circle, rgba(167,139,250,0.06) 0%, rgba(192,132,252,0.03) 30%, transparent 60%)",
                        filter: "blur(40px)",
                    }}
                />
            </motion.div>
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-screen"
                style={{
                    x: smoothX,
                    y: smoothY,
                    translateX: "-50%",
                    translateY: "-50%",
                    opacity: visible ? 0.8 : 0,
                }}
            >
                <div
                    className="w-3 h-3 rounded-full"
                    style={{
                        background: "radial-gradient(circle, rgba(167,139,250,0.8), rgba(192,132,252,0.4) 60%, transparent)",
                        boxShadow: "0 0 20px rgba(167,139,250,0.3)",
                    }}
                />
            </motion.div>
        </>
    );
}
