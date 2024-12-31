"use client";
import React from 'react';
import { Card } from "@/components/ui/card";
import { Toolbar } from '../Toolbar/Toolbar';
import { Canvas } from '../Canvas/Canvas';
import { TransformControls } from '../TransformControls/TransformControls';
import { LayerPanel } from '../LayerPanel/LayerPanel';
import { PositionGuide } from '../PositionGuide/PositionGuide';
import { HistoryPanel } from '../HistoryPanel/HistoryPanel';
import { PlaybackControls } from '../PlaybackControls/PlaybackControls';
import { useEditor } from "../../store/editorStore";
import { useTimeTravel } from '@/editor/hooks/useTimeTravel';
import { DesignsPanel } from '../DesignsPanel/DesignsPanel';

export const Editor: React.FC = () => {
    const { activeView } = useEditor();
    useTimeTravel();

    return (
        <div className="flex flex-col h-screen">
            {/* Main Editor Area */}
            <div className="flex-1 flex gap-6 p-6">
                <div className="w-64">
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
                        <HistoryPanel />
                    </div>
                </div>
            </div>

            {/* Playback controls at the bottom */}
            <PlaybackControls />
        </div>
    );
};