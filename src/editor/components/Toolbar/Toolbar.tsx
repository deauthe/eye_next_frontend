"use client";
import React, { useState } from 'react';
import { ViewSelector } from './sections/ViewSelector/ViewSelector';
import { DesignUpload } from './sections/DesignUpload/DesignUpload';
import { Button } from "@/components/ui/button";
import { Download } from 'lucide-react';
import { ExportModal } from './sections/ExportModal/ExportModal';
import { useEditor } from '../../store/editorStore';
import { ViewType } from '../../types/editor.types';

export const Toolbar: React.FC = () => {
    const [isExportModalOpen, setIsExportModalOpen] = useState(false);
    const [previews, setPreviews] = useState<{ [key in ViewType]?: string }>({});
    const { garmentColor } = useEditor();

    const handleExport = async () => {
        const views: ViewType[] = ['front', 'back', 'shoulder'];
        const newPreviews: { [key in ViewType]?: string } = {};

        // Wait for all renders to complete
        await Promise.all(views.map(async (view) => {
            try {
                const canvas = document.querySelector('canvas');
                if (canvas) {
                    // Trigger render for this view
                    // You'll need to implement this in your useCanvas hook
                    // await renderView(view);

                    // Get the canvas data
                    const dataUrl = canvas.toDataURL('image/png');
                    newPreviews[view] = dataUrl;
                }
            } catch (error) {
                console.error(`Error generating preview for ${view} view:`, error);
            }
        }));

        setPreviews(newPreviews);
        setIsExportModalOpen(true);
    };

    return (
        <div className="space-y-6">
            <ViewSelector />
            <DesignUpload />

            <div className="pt-4 border-t">
                <Button
                    className="w-full"
                    size="lg"
                    onClick={handleExport}
                >
                    <Download className="mr-2 h-4 w-4" />
                    Export Design
                </Button>
            </div>

            <ExportModal
                isOpen={isExportModalOpen}
                onClose={() => setIsExportModalOpen(false)}
                previews={previews}
            />
        </div>
    );
};