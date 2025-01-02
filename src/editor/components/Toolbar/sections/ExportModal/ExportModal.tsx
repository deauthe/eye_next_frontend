"use client";
import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card } from '@/components/ui/card';

interface ExportModalProps {
    isOpen: boolean;
    onClose: () => void;
    previews: {
        front?: string;
        back?: string;
        shoulder?: string;
    };
}

export const ExportModal: React.FC<ExportModalProps> = ({
    isOpen,
    onClose,
    previews
}) => {
    const [selectedViews, setSelectedViews] = useState<{ [key: string]: boolean }>({
        front: true,
        back: false,
        shoulder: false,
    });

    const handleDownload = () => {
        // Download selected previews
        Object.entries(selectedViews).forEach(([view, isSelected]) => {
            if (isSelected && previews[view]) {
                const link = document.createElement('a');
                link.href = previews[view]!;
                link.download = `design-${view}.png`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        });
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle>Export Designs</DialogTitle>
                </DialogHeader>

                <div className="grid grid-cols-3 gap-4 py-4">
                    {Object.entries(previews).map(([view, preview]) => (
                        preview && (
                            <Card key={view} className="p-4 space-y-4">
                                <div className="relative aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden">
                                    <img
                                        src={preview}
                                        alt={`${view} view`}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`check-${view}`}
                                        checked={selectedViews[view]}
                                        onCheckedChange={(checked) =>
                                            setSelectedViews(prev => ({
                                                ...prev,
                                                [view]: checked === true
                                            }))
                                        }
                                    />
                                    <Label htmlFor={`check-${view}`} className="capitalize">
                                        {view} View
                                    </Label>
                                </div>
                            </Card>
                        )
                    ))}
                </div>

                <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleDownload}
                        disabled={!Object.values(selectedViews).some(v => v)}
                    >
                        Download Selected
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};