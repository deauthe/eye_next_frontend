import React from 'react';
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEditor } from "../../store/editorStore";
import { AnimatePresence, motion } from "framer-motion";
import { useEditorCommands } from "../../hooks/useEditorCommands";

export const CurvatureControls: React.FC = () => {
    const {
        activeDesignId,
        designsByView,
        activeView,
        updateDesignProperties
    } = useEditor();

    const { handleUpdateProperties } = useEditorCommands();

    const activeDesign = activeDesignId
        ? designsByView[activeView].find(d => d.id === activeDesignId)
        : null;

    if (!activeDesign) return null;

    const handleCurvatureToggle = (enabled: boolean) => {
        if (!activeDesignId) return;

        updateDesignProperties(activeDesignId, {
            curvature: {
                ...(activeDesign.curvature || {
                    intensity: 0.5,
                    direction: 'horizontal',
                    perspective: 0.3,
                    waveform: 'sine',
                    adaptiveEdges: true,
                    meshDensity: 0.5
                }),
                enabled
            }
        });

        handleUpdateProperties(activeDesignId, {
            curvature: {
                ...(activeDesign?.curvature || {
                    intensity: 0.5,
                    direction: 'horizontal',
                    perspective: 0.3,
                    waveform: 'sine',
                    adaptiveEdges: true,
                    meshDensity: 0.5
                }),
                enabled
            }
        });

    };

    const handleIntensityChange = (value: number[]) => {
        if (!activeDesignId) return;

        updateDesignProperties(activeDesignId, {
            curvature: {
                ...(activeDesign.curvature || {
                    enabled: true,
                    direction: 'horizontal',
                    perspective: 0.3,
                    waveform: 'sine',
                    adaptiveEdges: true,
                    meshDensity: 0.5
                }),
                intensity: value[0]
            }
        });
    };

    const handlePerspectiveChange = (value: number[]) => {
        if (!activeDesignId) return;

        updateDesignProperties(activeDesignId, {
            curvature: {
                ...(activeDesign.curvature || {
                    enabled: true,
                    intensity: 0.5,
                    direction: 'horizontal',
                    waveform: 'sine',
                    adaptiveEdges: true,
                    meshDensity: 0.5
                }),
                perspective: value[0]
            }
        });
    };

    const handleMeshDensityChange = (value: number[]) => {
        if (!activeDesignId) return;

        updateDesignProperties(activeDesignId, {
            curvature: {
                ...(activeDesign.curvature || {
                    enabled: true,
                    intensity: 0.5,
                    direction: 'horizontal',
                    perspective: 0.3,
                    waveform: 'sine',
                    adaptiveEdges: true
                }),
                meshDensity: value[0]
            }
        });
    };

    const handleDirectionChange = (direction: 'horizontal' | 'vertical' | 'radial' | 'custom') => {
        updateDesignProperties(activeDesignId, {
            curvature: {
                ...(activeDesign.curvature || {
                    enabled: true,
                    intensity: 0.5,
                    perspective: 0.3,
                    waveform: 'sine',
                    adaptiveEdges: true,
                    meshDensity: 0.5
                }),
                direction
            }
        });
    };

    const handleWaveformChange = (waveform: 'sine' | 'quad' | 'cubic' | 'custom') => {
        updateDesignProperties(activeDesignId, {
            curvature: {
                ...(activeDesign.curvature || {
                    enabled: true,
                    intensity: 0.5,
                    direction: 'horizontal',
                    perspective: 0.3,
                    adaptiveEdges: true,
                    meshDensity: 0.5
                }),
                waveform
            }
        });
    };

    const handleAdaptiveEdgesToggle = (adaptiveEdges: boolean) => {
        if (!activeDesignId) return;
        updateDesignProperties(activeDesignId, {
            curvature: {
                ...(activeDesign.curvature || {
                    enabled: true,
                    intensity: 0.5,
                    direction: 'horizontal',
                    perspective: 0.3,
                    waveform: 'sine',
                    meshDensity: 0.5
                }),
                adaptiveEdges
            }
        });
    };

    return (
        <AnimatePresence mode="wait">
            {activeDesign && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                >
                    <Card className="p-4 space-y-4">
                        <div className="flex items-center justify-between">
                            <Label>Surface Mapping</Label>
                            <Switch
                                checked={activeDesign.curvature?.enabled || false}
                                onCheckedChange={handleCurvatureToggle}
                            />
                        </div>

                        <AnimatePresence>
                            {activeDesign.curvature?.enabled && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Tabs defaultValue="basic">
                                        <TabsList className="grid w-full grid-cols-2 mb-4">
                                            <TabsTrigger value="basic">Basic</TabsTrigger>
                                            <TabsTrigger value="advanced">Advanced</TabsTrigger>
                                        </TabsList>

                                        <TabsContent value="basic" className="space-y-4">
                                            <div className="space-y-2">
                                                <Label className="text-sm">Curvature Intensity</Label>
                                                <Slider
                                                    value={[activeDesign.curvature.intensity || 0.5]}
                                                    min={0}
                                                    max={1}
                                                    step={0.01}
                                                    onValueChange={handleIntensityChange}
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label className="text-sm">Direction</Label>
                                                <Select
                                                    value={activeDesign.curvature.direction || 'horizontal'}
                                                    onValueChange={handleDirectionChange}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="horizontal">Horizontal</SelectItem>
                                                        <SelectItem value="vertical">Vertical</SelectItem>
                                                        <SelectItem value="radial">Radial</SelectItem>
                                                        <SelectItem value="custom">Custom</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </TabsContent>

                                        <TabsContent value="advanced" className="space-y-4">
                                            <div className="space-y-2">
                                                <Label className="text-sm">Perspective Depth</Label>
                                                <Slider
                                                    value={[activeDesign.curvature.perspective || 0.3]}
                                                    min={0}
                                                    max={1}
                                                    step={0.01}
                                                    onValueChange={handlePerspectiveChange}
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label className="text-sm">Mesh Density</Label>
                                                <Slider
                                                    value={[activeDesign.curvature.meshDensity || 0.5]}
                                                    min={0.1}
                                                    max={1}
                                                    step={0.01}
                                                    onValueChange={handleMeshDensityChange}
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label className="text-sm">Waveform</Label>
                                                <Select
                                                    value={activeDesign.curvature.waveform || 'sine'}
                                                    onValueChange={handleWaveformChange}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="sine">Sine Wave</SelectItem>
                                                        <SelectItem value="quad">Quadratic</SelectItem>
                                                        <SelectItem value="cubic">Cubic</SelectItem>
                                                        <SelectItem value="custom">Custom</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="flex items-center justify-between pt-2">
                                                <Label className="text-sm">Adaptive Edges</Label>
                                                <Switch
                                                    checked={activeDesign.curvature?.adaptiveEdges ?? true}
                                                    onCheckedChange={handleAdaptiveEdgesToggle}
                                                />
                                            </div>
                                        </TabsContent>
                                    </Tabs>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Card>
                </motion.div>
            )}
        </AnimatePresence>
    );
};