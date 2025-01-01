"use client";
import React from 'react';
import { Card } from "@/components/ui/card";
import { Toolbar } from '../Toolbar/Toolbar';
import { Canvas } from '../Canvas/Canvas';
import { TransformControls } from '../TransformControls/TransformControls';
import { LayerPanel } from '../LayerPanel/LayerPanel';
import { PositionGuide } from '../PositionGuide/PositionGuide';
import { useEditor } from "../../store/editorStore";
import { DesignsPanel } from '../DesignsPanel/DesignsPanel';

export const Editor: React.FC = () => {
    const { activeView } = useEditor();

    return (
        <div className="flex flex-col h-screen">
            {/* Main Editor Area */}
            <div className="flex-1 flex gap-6 p-6">
                <div className="w-64">
                    <TransformControls />
                    <Toolbar />
                </div>

                <div className="flex-1">
                    <Canvas />
                </div>

                <div className="w-80">
                    <div className="space-y-4">
                        {/* <LayerPanel /> */}
                        <DesignsPanel />
                        <PositionGuide />

                    </div>
                </div>
            </div>


        </div>
    );
};