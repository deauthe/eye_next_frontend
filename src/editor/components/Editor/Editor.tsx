"use client";
import React, { useCallback } from 'react';
import { DesignsPanel } from '../DesignsPanel/DesignsPanel';
import { Toolbar } from '../Toolbar/Toolbar';
import { Canvas } from '../Canvas/Canvas';
import { TransformControls } from '../TransformControls/TransformControls';
import { LayerPanel } from '../LayerPanel/LayerPanel';
import { CurvatureControls } from '../CurvatureControls/CurvatureControls';
import { PositionGuide } from '../PositionGuide/PositionGuide';
import { UndoRedoControls } from '../UndoRedoControls/UndoRedoControls';
import { useEditor } from "../../store/editorStore";
import { useCanvas } from '../../hooks/useCanvas';

export const Editor: React.FC = () => {
    const { activeView } = useEditor();
    const { renderView } = useCanvas();

    const handleExport = useCallback(async (view: ViewType) => {
        try {
            await renderView(view);
            const canvas = canvasRef.current?.toDataURL('image/png');
            return canvas;
        } catch (error) {
            console.error('Error exporting view:', error);
            return null;
        }
    }, [renderView]);

    return (
        <div className="flex flex-col min-h-screen max-h-screen overflow-hidden">
            <div className="flex-1 flex gap-6 p-4 overflow-hidden">
                <div className="w-64 space-y-4 overflow-y-auto">
                    <div className="flex justify-between items-center sticky top-0 bg-background z-10 pb-2">
                        <h2 className="text-lg font-semibold">Editor Tools</h2>
                        <UndoRedoControls />
                    </div>

                    <div className="space-y-4">
                        <Toolbar onExport={handleExport} />
                        <TransformControls />
                        <CurvatureControls />
                        <LayerPanel />
                    </div>
                </div>

                <div className="flex-1 flex items-center justify-center overflow-hidden">
                    <Canvas />
                </div>

                <div className="w-80 overflow-y-auto">
                    <div className="space-y-4">
                        <PositionGuide />
                        <DesignsPanel />
                    </div>
                </div>
            </div>
        </div>
    );
};