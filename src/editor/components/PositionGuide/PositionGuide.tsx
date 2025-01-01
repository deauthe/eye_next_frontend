import React, { useEffect, useState, useRef } from 'react';
import { Card } from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";
import { useEditor } from '../../store/editorStore';
import { useToast } from "@/components/ui/use-toast";
import { DESIGN_AREAS } from '../../hooks/useCanvas';

interface DesignPositionState {
    id: string;
    position: { x: number; y: number };
    isOutOfBounds: boolean;
}

export const PositionGuide: React.FC = () => {
    const {
        activeView,
        garmentType,
        designsByView,
        activeDesignId
    } = useEditor();

    const { toast } = useToast();
    const [designPositions, setDesignPositions] = useState<DesignPositionState[]>([]);
    const toastTimeoutRef = useRef<NodeJS.Timeout>();
    const lastToastRef = useRef<string>('');

    // Get the guide position for current view
    const guidePosition = DESIGN_AREAS[garmentType][activeView];

    // Convert canvas coordinates to percentage
    const canvasToGuidePosition = (x: number, y: number) => ({
        x: (x / 600) * 100,
        y: (y / 800) * 100
    });

    // Check if position is within bounds
    const isOutOfBounds = (pos: { x: number, y: number }) => {
        return pos.x < guidePosition.left ||
            pos.x > (guidePosition.left + guidePosition.width) ||
            pos.y < guidePosition.top ||
            pos.y > (guidePosition.top + guidePosition.height);
    };

    // Debounced toast for out-of-bounds warning
    const showOutOfBoundsToast = (designId: string) => {
        // Clear existing timeout
        if (toastTimeoutRef.current) {
            clearTimeout(toastTimeoutRef.current);
        }

        // Only show toast if it's a different design or after 2 seconds
        if (lastToastRef.current !== designId || Date.now() - Number(lastToastRef.current) > 2000) {
            toastTimeoutRef.current = setTimeout(() => {
                toast({
                    title: "Design Out of Safe Area",
                    description: "The selected design is outside the recommended placement area.",
                    variant: "warning",
                    duration: 2000,
                });
                lastToastRef.current = designId;
            }, 500); // Debounce time
        }
    };

    // Update positions for all designs
    useEffect(() => {
        const currentDesigns = designsByView[activeView];
        const newPositions = currentDesigns.map(design => {
            const pos = canvasToGuidePosition(
                design.transform.position.x,
                design.transform.position.y
            );

            const outOfBounds = isOutOfBounds(pos);

            // Show warning toast for out-of-bounds active design
            if (outOfBounds && design.id === activeDesignId) {
                showOutOfBoundsToast(design.id);
            }

            return {
                id: design.id,
                position: pos,
                isOutOfBounds: outOfBounds
            };
        });

        setDesignPositions(newPositions);

        // Cleanup
        return () => {
            if (toastTimeoutRef.current) {
                clearTimeout(toastTimeoutRef.current);
            }
        };
    }, [designsByView, activeView, activeDesignId]);

    // Memoize the designs count for better performance
    const designCount = designsByView[activeView].length;

    return (
        <div className="space-y-2">
            <Card className="p-4">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-medium">Position Guide</h3>
                    <span className="text-xs text-muted-foreground">
                        {designCount} design{designCount !== 1 ? 's' : ''}
                    </span>
                </div>
                <div className="relative aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden">
                    {/* Mockup outline */}
                    <div className="absolute inset-0 border-2 border-dashed border-gray-300" />

                    {/* Safe area indicator */}
                    <div
                        className="absolute border-2 border-dashed border-blue-400 opacity-50"
                        style={{
                            top: `${guidePosition.top}%`,
                            left: `${guidePosition.left}%`,
                            width: `${guidePosition.width}%`,
                            height: `${guidePosition.height}%`,
                        }}
                    />

                    {/* Design position indicators */}
                    {designPositions.map((design) => (
                        <div
                            key={design.id}
                            className={`
                                absolute w-4 h-4 -translate-x-1/2 -translate-y-1/2 
                                rounded-full transition-colors
                                ${design.isOutOfBounds ? 'bg-red-500' : 'bg-blue-500'}
                                ${design.id === activeDesignId ? 'ring-2 ring-white shadow-lg scale-125' : 'opacity-60'}
                            `}
                            style={{
                                top: `${design.position.y}%`,
                                left: `${design.position.x}%`,
                                zIndex: design.id === activeDesignId ? 10 : 1,
                                transform: `translate(-50%, -50%) ${design.id === activeDesignId ? 'scale(1.25)' : 'scale(1)'}`,
                                willChange: 'transform, left, top'
                            }}
                        >
                            <span className={`
                                absolute -top-4 left-1/2 -translate-x-1/2
                                text-xs font-medium px-1 rounded
                                ${design.id === activeDesignId ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}
                            `}>
                                {designsByView[activeView].findIndex(d => d.id === design.id) + 1}
                            </span>
                        </div>
                    ))}

                    {/* View label */}
                    <div className="absolute bottom-2 left-2 text-xs text-gray-500 capitalize">
                        {activeView} view
                    </div>
                </div>
            </Card>

            {/* Out of bounds warnings */}
            {designPositions.some(d => d.isOutOfBounds) && (
                <Alert variant="warning" className="py-2">
                    <div className="text-xs">
                        {designPositions.filter(d => d.isOutOfBounds).length}
                        {designPositions.filter(d => d.isOutOfBounds).length === 1
                            ? ' design is'
                            : ' designs are'}
                        outside safe area
                    </div>
                </Alert>
            )}

            {/* Help text */}
            {designCount === 0 && (
                <div className="text-xs text-center text-muted-foreground">
                    Add designs to see their positions
                </div>
            )}
        </div>
    );
};