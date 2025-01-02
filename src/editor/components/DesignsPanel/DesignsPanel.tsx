import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trash2 } from 'lucide-react';
import { useEditor } from '../../store/editorStore';

export const DesignsPanel: React.FC = () => {
    const {
        designsByView,
        activeView,
        activeDesignId,
        removeDesign,
        setActiveDesign
    } = useEditor();

    const designs = designsByView[activeView];

    const handleRemoveDesign = (designId: string) => {
        removeDesign(designId);
        if (activeDesignId === designId) {
            // If we're removing the active design, clear the selection or select another design
            if (designs.length > 1) {
                const nextDesign = designs.find(d => d.id !== designId);
                if (nextDesign) {
                    setActiveDesign(nextDesign.id);
                }
            } else {
                setActiveDesign(null);
            }
        }
    };

    return (
        <Card className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Designs on {activeView}</h3>
                <span className="text-sm text-muted-foreground">
                    {designs.length} design{designs.length !== 1 ? 's' : ''}
                </span>
            </div>

            <ScrollArea className="h-[300px]">
                <div className="space-y-2">
                    {designs.map((design) => (
                        <div
                            key={design.id}
                            className={`
                                p-3 rounded-lg border-2 cursor-pointer
                                ${activeDesignId === design.id ? 'border-primary' : 'border-border'}
                                transition-all duration-200 hover:bg-accent/50
                            `}
                            onClick={() => setActiveDesign(design.id)}
                        >
                            <div className="flex items-center gap-2">
                                <div className="w-12 h-12 bg-accent rounded overflow-hidden">
                                    <img
                                        src={design.imageUrl}
                                        alt="Design preview"
                                        className="w-full h-full object-contain"
                                    />
                                </div>

                                <div className="flex-1">
                                    <div className="text-sm font-medium">
                                        Design {designs.indexOf(design) + 1}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                        Scale: {(design.transform.scale * 100).toFixed(0)}%
                                    </div>
                                </div>

                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleRemoveDesign(design.id);
                                    }}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    ))}

                    {designs.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                            No designs added to this view yet.
                            <br />
                            Upload a design to get started.
                        </div>
                    )}
                </div>
            </ScrollArea>
        </Card>
    );
};