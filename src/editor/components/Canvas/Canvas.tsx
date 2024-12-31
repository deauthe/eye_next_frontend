"use client";

import React, { useEffect, useRef } from 'react';
import { useCanvas } from '../../hooks/useCanvas';

export const Canvas: React.FC = () => {
    const canvasElRef = useRef<HTMLCanvasElement>(null);
    const { initCanvas } = useCanvas();

    useEffect(() => {
        if (canvasElRef.current) {
            initCanvas(canvasElRef.current);
        }
    }, []);

    return (
        <div className="w-full h-full bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center">
            <canvas ref={canvasElRef} />
        </div>
    );
};