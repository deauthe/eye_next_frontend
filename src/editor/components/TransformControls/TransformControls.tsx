"use client";
import React from 'react';
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';
import { useEditor } from "../../store/editorStore";
import { useEditorHistory } from '../../hooks/useEditorHistory';
import { TransformCommand } from '../../commands/designCommands';
import { UndoRedoControls } from '../UndoRedoControls/UndoRedoControls';

export const TransformControls: React.FC = () => {
    const { design, updateDesignTransform } = useEditor();
    const { addCommand } = useEditorHistory();

    if (!design) return null;

    const handleScaleChange = (value: number[]) => {
        const command = new TransformCommand(
            design,
            updateDesignTransform,
            { scale: value[0] / 100 }
        );
        addCommand(command);
    };

    const handleRotationChange = (value: number[]) => {
        const command = new TransformCommand(
            design,
            updateDesignTransform,
            { rotation: value[0] }
        );
        addCommand(command);
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <Label>Transform Controls</Label>
                <UndoRedoControls />
            </div>

            <div className="space-y-2">
                <Label>Scale</Label>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleScaleChange([Math.max((design.transform.scale * 100) - 10, 10)])}
                    >
                        <ZoomOut className="h-4 w-4" />
                    </Button>

                    <Slider
                        value={[design.transform.scale * 100]}
                        min={10}
                        max={200}
                        step={1}
                        onValueChange={handleScaleChange}
                    />

                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleScaleChange([Math.min((design.transform.scale * 100) + 10, 200)])}
                    >
                        <ZoomIn className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <div className="space-y-2">
                <Label>Rotation</Label>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                            const command = new TransformCommand(
                                design,
                                updateDesignTransform,
                                { rotation: 0 }
                            );
                            addCommand(command);
                        }}
                    >
                        <RotateCcw className="h-4 w-4" />
                    </Button>

                    <Slider
                        value={[design.transform.rotation]}
                        min={-180}
                        max={180}
                        step={1}
                        onValueChange={handleRotationChange}
                    />
                </div>
            </div>
        </div>
    );
};