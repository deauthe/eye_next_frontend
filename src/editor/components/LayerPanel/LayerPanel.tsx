import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Reorder } from 'framer-motion';
import { Layers, Eye, EyeOff, Lock, Unlock, GripVertical } from 'lucide-react';
import { useEditor } from '../../store/editorStore';
import { Design } from '../../types/editor.types';

interface LayerItemProps {
    design: Design;
    isActive: boolean;
    onSelect: () => void;
}

const LayerItem = ({ design, isActive, onSelect }: LayerItemProps) => {
    const { updateDesignProperties } = useEditor();

    const handleBlendModeChange = (value: string) => {
        updateDesignProperties(design.id, { blendMode: value });
    };

    const handleOpacityChange = (value: string) => {
        updateDesignProperties(design.id, { opacity: parseFloat(value) });
    };

    return (
        <div
            className={`
        p-3 rounded-lg border-2 mb-2 cursor-pointer
        ${isActive ? 'border-primary' : 'border-border'}
      `}
            onClick={onSelect}
        >
            <div className="flex items-center gap-2">
                <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />

                <div className="w-12 h-12 bg-accent rounded overflow-hidden">
                    <img
                        src={design.imageUrl}
                        alt="Design preview"
                        className="w-full h-full object-contain"
                    />
                </div>

                <div className="flex-1 space-y-2">
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Design {design.name || design.id.slice(0, 4)}</span>
                        <div className="flex gap-1">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => updateDesignProperties(design.id, { visible: !design.visible })}
                            >
                                {design.visible ? (
                                    <Eye className="h-4 w-4" />
                                ) : (
                                    <EyeOff className="h-4 w-4" />
                                )}
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => updateDesignProperties(design.id, { locked: !design.locked })}
                            >
                                {design.locked ? (
                                    <Lock className="h-4 w-4" />
                                ) : (
                                    <Unlock className="h-4 w-4" />
                                )}
                            </Button>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <Select
                            value={design.blendMode || 'normal'}
                            onValueChange={handleBlendModeChange}
                        >
                            <SelectTrigger className="h-7 text-xs">
                                <SelectValue placeholder="Blend Mode" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="normal">Normal</SelectItem>
                                <SelectItem value="multiply">Multiply</SelectItem>
                                <SelectItem value="screen">Screen</SelectItem>
                                <SelectItem value="overlay">Overlay</SelectItem>
                                <SelectItem value="darken">Darken</SelectItem>
                                <SelectItem value="lighten">Lighten</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select
                            value={String(design.opacity || 1)}
                            onValueChange={handleOpacityChange}
                        >
                            <SelectTrigger className="h-7 text-xs w-24">
                                <SelectValue placeholder="Opacity" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">100%</SelectItem>
                                <SelectItem value="0.75">75%</SelectItem>
                                <SelectItem value="0.5">50%</SelectItem>
                                <SelectItem value="0.25">25%</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const LayerPanel: React.FC = () => {
    const {
        designsByView,
        activeView,
        activeDesignId,
        setActiveDesign,
        reorderDesigns
    } = useEditor();

    const designs = designsByView[activeView];

    return (
        <Card className="p-4">
            <div className="flex items-center gap-2 mb-4">
                <Layers className="h-4 w-4" />
                <h3 className="font-medium">Layers</h3>
            </div>

            <Reorder.Group
                axis="y"
                values={designs}
                onReorder={(newOrder) => reorderDesigns(activeView, newOrder)}
                className="space-y-2"
            >
                {designs.map((design) => (
                    <Reorder.Item key={design.id} value={design}>
                        <LayerItem
                            design={design}
                            isActive={design.id === activeDesignId}
                            onSelect={() => setActiveDesign(design.id)}
                        />
                    </Reorder.Item>
                ))}
            </Reorder.Group>

            {designs.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                    No designs added to this view yet.
                    <br />
                    Upload a design to get started.
                </div>
            )}
        </Card>
    );
};