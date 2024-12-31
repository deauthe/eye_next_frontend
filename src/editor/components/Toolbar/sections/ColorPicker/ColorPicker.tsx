"use client";
import React from 'react';
import { Button } from "@/components/ui/button";
import { useEditor } from '../../../../store/editorStore';

const PRESET_COLORS = [
    '#FFFFFF', '#000000', '#FF0000', '#00FF00', '#0000FF',
    '#FFFF00', '#FF00FF', '#00FFFF', '#808080', '#800000'
];

export const ColorPicker: React.FC = () => {
    const { garmentColor, setGarmentColor } = useEditor();

    return (
        <div className="space-y-2">
            <h3 className="text-sm font-medium">Garment Color</h3>
            <div className="grid grid-cols-5 gap-2">
                {PRESET_COLORS.map((color) => (
                    <Button
                        key={color}
                        className="w-8 h-8 p-0 rounded-full"
                        style={{ backgroundColor: color }}
                        variant={garmentColor === color ? "default" : "outline"}
                        onClick={() => setGarmentColor(color)}
                    />
                ))}
            </div>
        </div>
    );
};
