// @ts-nocheck
"use client";

import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { nanoid } from 'nanoid';
import { Upload } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useEditor } from "../../../../store/editorStore";
import { validateDesignSize } from '../../../../utils/validation';
import { calculateInitialScale, getImageDimensions } from '../../../../utils/designScaling';
import { DESIGN_AREAS } from '../../../../hooks/useCanvas';
import { Design, BlendMode } from '../../../../types/editor.types';

export const DesignUpload: React.FC = () => {
    const {
        addDesign,
        activeView,
        garmentType,
        designsByView
    } = useEditor();

    const { toast } = useToast();

    const createNewDesign = (imageUrl: string, dimensions: { width: number; height: number }) => {
        const designArea = DESIGN_AREAS[garmentType][activeView];
        const initialScale = calculateInitialScale(
            dimensions.width,
            dimensions.height,
            designArea.maxWidth,
            designArea.maxHeight
        );

        const currentDesigns = designsByView[activeView];
        const positionOffset = currentDesigns.length * 20;

        return {
            id: nanoid(),
            imageUrl,
            transform: {
                scale: initialScale,
                rotation: 0,
                position: {
                    x: designArea.left + (designArea.width / 2) + positionOffset,
                    y: designArea.top + (designArea.height / 2) + positionOffset
                }
            },
            visible: true,
            locked: false,
            opacity: 1,
            blendMode: 'normal' as BlendMode,
            zIndex: currentDesigns.length,
            originalSize: dimensions,
            name: `Design ${currentDesigns.length + 1}`
        };
    };

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (!file) return;

        try {
            // Validate file size
            const isValidSize = await validateDesignSize(file);
            if (!isValidSize) {
                toast({
                    title: "Invalid Image",
                    description: "Image dimensions must be between 300px and 4000px",
                    variant: "destructive",
                });
                return;
            }

            // Read the file
            const reader = new FileReader();
            reader.onload = async () => {
                try {
                    const imageUrl = reader.result as string;
                    const dimensions = await getImageDimensions(imageUrl);
                    const newDesign = createNewDesign(imageUrl, dimensions);

                    // Add the design
                    addDesign(newDesign);

                    toast({
                        title: "Design Added",
                        description: `Design has been added to ${activeView} view`,
                        duration: 2000,
                    });
                } catch (error) {
                    console.error("Error processing design:", error);
                    toast({
                        title: "Error",
                        description: "Failed to process the image",
                        variant: "destructive",
                    });
                }
            };

            reader.readAsDataURL(file);
        } catch (error) {
            console.error("Error handling file:", error);
            toast({
                title: "Error",
                description: "Failed to upload the image",
                variant: "destructive",
            });
        }
    }, [addDesign, activeView, garmentType, designsByView, toast]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.png', '.jpg', '.jpeg', '.svg']
        },
        multiple: false
    });

    return (
        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium">Upload Design</h3>
                <span className="text-xs text-muted-foreground">
                    {designsByView[activeView].length} designs on {activeView}
                </span>
            </div>

            <Card
                {...getRootProps()}
                className={`
                    p-4 border-dashed cursor-pointer transition-colors
                    ${isDragActive ? 'border-primary bg-primary/5' : 'border-gray-200'}
                `}
            >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center gap-2 text-sm text-gray-600">
                    <Upload className="h-8 w-8" />
                    <p>{isDragActive ? 'Drop here...' : 'Drag & drop or click to upload'}</p>
                </div>
            </Card>

            {designsByView[activeView].length > 0 && (
                <p className="text-xs text-muted-foreground text-center">
                    Tip: New designs will be slightly offset for easier arrangement
                </p>
            )}
        </div>
    );
};