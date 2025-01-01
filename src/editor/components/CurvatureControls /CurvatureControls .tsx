import React from 'react';
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEditor } from "../../store/editorStore";

export const CurvatureControls: React.FC = () => {
    const {
        activeDesignId,
        designsByView,
        activeView,
        updateDesignProperties
    } = useEditor();

    const activeDesign = activeDesignId
        ? designsByView[activeView].find(d => d.id === activeDesignId)
        : null;

    if (!activeDesign) return null;

    const handleCurvatureToggle = (enabled: boolean) => {
        updateDesignProperties(activeDesign.id, {
            curvature: {
                ...(activeDesign.curvature || { intensity: 0.5, direction: 'horizontal' }),
                enabled
            }
        });
    };

    const handleIntensityChange = (value: number[]) => {
        updateDesignProperties(activeDesign.id, {
            curvature: {
                ...(activeDesign.curvature || { enabled: true, direction: 'horizontal' }),
                intensity: value[0]
            }
        });
    };

    const handleDirectionChange = (direction: 'horizontal' | 'vertical') => {
        updateDesignProperties(activeDesign.id, {
            curvature: {
                ...(activeDesign.curvature || { enabled: true, intensity: 0.5 }),
                direction
            }
        });
    };

    return (
        <Card className="p-4 space-y-4">
            <div className="flex items-center justify-between">
                <Label>Surface Mapping</Label>
                <Switch
                    checked={activeDesign.curvature?.enabled || false}
                    onCheckedChange={handleCurvatureToggle}
                />
            </div>

            {activeDesign.curvature?.enabled && (
                <>
                    <div className="space-y-2">
                        <Label className="text-sm">Curvature Intensity</Label>
                        <Slider
                            value={[activeDesign.curvature.intensity || 0.5]}
                            min={0}
                            max={1}
                            step={0.1}
                            onValueChange={handleIntensityChange}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label className="text-sm">Direction</Label>
                        <Select
                            value={activeDesign.curvature.direction || 'horizontal'}
                            onValueChange={(value: 'horizontal' | 'vertical') => handleDirectionChange(value)}
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="horizontal">Horizontal</SelectItem>
                                <SelectItem value="vertical">Vertical</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </>
            )}
        </Card>
    );
};