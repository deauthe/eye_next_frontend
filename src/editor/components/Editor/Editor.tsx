// @ts-nocheck
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
import EditorTour from '../EditorTour/EditorTour';
import { useEditor } from "../../store/editorStore";
import { useCanvas } from '../../hooks/useCanvas';
import { ViewType } from '../../types/editor.types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

export const Editor: React.FC = () => {
    const { activeView } = useEditor();
    const { renderView } = useCanvas();

    const handleExport = useCallback(async (view: ViewType) => {
        try {
            await renderView(view);
            const canvas = document.querySelector('canvas');
            return canvas?.toDataURL('image/png') || null;
        } catch (error) {
            console.error('Error exporting view:', error);
            return null;
        }
    }, [renderView]);

    return (
        <div className="flex flex-col min-h-screen max-h-screen overflow-hidden relative">
            {/* Add EditorTour component */}
            <EditorTour />

            <div className="flex-1 flex gap-6 p-4 overflow-hidden">
                {/* Left Sidebar */}
                <div className="w-64 space-y-4 overflow-y-auto">
                    <div className="flex justify-between items-center sticky top-0 bg-background z-10 pb-2">
                        <h2 className="text-lg font-semibold">Editor Tools</h2>
                        <UndoRedoControls />
                    </div>

                    <div className="space-y-4">
                        {/* Upload Zone  */}
                        <Card className="upload-zone p-4">
                            <Toolbar onExport={handleExport} />
                        </Card>

                        {/* Layer Panel */}
                        <Card className="layer-panel p-4">
                            <LayerPanel />
                        </Card>

                        {/* Transform Controls */}
                        <Card className="transform-controls p-4">
                            <TransformControls />
                        </Card>

                        <Card className="p-4">
                            <CurvatureControls />
                        </Card>


                    </div>
                </div>

                {/* Canvas Area */}
                <div className="flex-1 flex items-center justify-center overflow-hidden">
                    <div className="w-full h-full relative">
                        <Canvas />
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="w-80 overflow-y-auto">
                    <div className="space-y-4">
                        <Card className="p-4">
                            <PositionGuide />
                        </Card>
                        <Card className="p-4">
                            <DesignsPanel />
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};