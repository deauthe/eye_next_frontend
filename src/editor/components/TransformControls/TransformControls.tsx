"use client";
import React from 'react';
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';
import { useEditor } from "../../store/editorStore";

export const TransformControls: React.FC = () => {
    const {
        activeDesignId,
        designsByView,
        activeView,
        updateDesignTransform
    } = useEditor();

    // Get the active design
    const design = activeDesignId
        ? designsByView[activeView].find(d => d.id === activeDesignId)
        : null;

    if (!design) {
        return (
            <div className="space-y-4">
                <div className="text-center text-sm text-muted-foreground p-4">
                    Select a design to transform
                </div>
            </div>
        );
    }

    const handleScaleChange = (value: number[]) => {
        updateDesignTransform(design.id, {
            scale: value[0] / 100
        });
    };

    const handleRotationChange = (value: number[]) => {
        updateDesignTransform(design.id, {
            rotation: value[0]
        });
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <Label>Transform Controls</Label>
            </div>

            <div className="space-y-2">
                <Label>Scale ({Math.round(design.transform.scale * 100)}%)</Label>
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
                <Label>Rotation ({Math.round(design.transform.rotation)}°)</Label>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                            updateDesignTransform(design.id, { rotation: 0 });
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