import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Lock, Unlock, Trash2, GripVertical } from 'lucide-react';
import { useEditor } from '../../store/editorStore';

export const LayerPanel: React.FC = () => {
    const {
        layers,
        activeLayerId,
        removeLayer,
        updateLayer,
        setActiveLayer,
        toggleLayerVisibility,
        toggleLayerLock
    } = useEditor();

    return (
        <Card className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Layers</h3>
            </div>

            <div className="space-y-2">
                {layers.map((layer) => (
                    <div
                        key={layer.id}
                        className={`
                            p-3 rounded-lg border-2 transition-colors
                            ${activeLayerId === layer.id ? 'border-blue-500' : 'border-gray-200'}
                            ${!layer.visible ? 'opacity-50' : ''}
                        `}
                        onClick={() => !layer.locked && setActiveLayer(layer.id)}
                    >
                        <div className="flex items-center gap-2">
                            <GripVertical className="h-4 w-4 text-gray-400 cursor-move" />

                            <Input
                                value={layer.name}
                                onChange={(e) => updateLayer(layer.id, { name: e.target.value })}
                                className="h-7 flex-1"
                                disabled={layer.locked}
                            />

                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => toggleLayerVisibility(layer.id)}
                            >
                                {layer.visible ? (
                                    <Eye className="h-4 w-4" />
                                ) : (
                                    <EyeOff className="h-4 w-4" />
                                )}
                            </Button>

                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => toggleLayerLock(layer.id)}
                            >
                                {layer.locked ? (
                                    <Lock className="h-4 w-4" />
                                ) : (
                                    <Unlock className="h-4 w-4" />
                                )}
                            </Button>

                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeLayer(layer.id)}
                                disabled={layer.locked}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
};