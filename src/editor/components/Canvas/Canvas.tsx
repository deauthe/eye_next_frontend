"use client";

import React, { useEffect, useRef } from 'react';
import { useCanvas } from '../../hooks/useCanvas';

export const Canvas: React.FC = () => {
    const canvasElRef = useRef<HTMLCanvasElement>(null);
    const { initCanvas, cleanupCanvas } = useCanvas();

    useEffect(() => {
        let canvas: HTMLCanvasElement | null = null;

        if (canvasElRef.current) {
            canvas = canvasElRef.current;
            initCanvas(canvas);
        }

        // Cleanup function
        return () => {
            if (canvas) {
                cleanupCanvas();
                // Make sure the canvas element is empty
                const context = canvas.getContext('2d');
                if (context) {
                    context.clearRect(0, 0, canvas.width, canvas.height);
                }
            }
        };
    }, []);

    return (
        <div className="w-full h-full bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center">
            <canvas ref={canvasElRef} />
        </div>
    );
};