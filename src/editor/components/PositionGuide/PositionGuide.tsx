import React, { useEffect, useState, useRef } from 'react';
import { Card } from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";
import { useEditor } from '../../store/editorStore';
import { useToast } from "@/components/ui/use-toast";
import { DESIGN_AREAS } from '../../hooks/useCanvas';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface DesignPositionState {
    id: string;
    position: { x: number; y: number };
    isOutOfBounds: boolean;
    actualPosition: { x: number; y: number }; // Actual canvas coordinates
}

interface MockupPathProps {
    view: 'front' | 'back' | 'shoulder';
    className?: string;
}

// SVG paths for different mockup views
const MockupOutline: React.FC<MockupPathProps> = ({ view, className }) => {
    // SVG paths for different views
    const paths = {
        front: (
            <path
                className={className}
                d="M 30 120 
           C 30 80, 100 50, 170 50 
           L 230 50 
           C 300 50, 370 80, 370 120
           L 370 350
           C 370 380, 340 400, 300 420
           L 100 420
           C 60 400, 30 380, 30 350
           Z"
            />
        ),
        back: (
            <path
                className={className}
                d="M 30 120 
           C 30 80, 100 40, 170 40
           L 230 40
           C 300 40, 370 80, 370 120
           L 370 350
           C 370 380, 340 400, 300 420
           L 100 420
           C 60 400, 30 380, 30 350
           Z"
            />
        ),
        shoulder: (
            <path
                className={className}
                d="M 50 100
           C 50 70, 100 50, 200 50
           L 200 300
           C 200 320, 180 340, 150 340
           L 50 340
           Z"
            />
        ),
    };

    return paths[view];
};

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

    // Convert canvas coordinates to percentage for display
    const canvasToGuidePosition = (x: number, y: number) => ({
        x: (x / 600) * 100,
        y: (y / 800) * 100
    });

    // Format coordinates for display
    const formatCoordinates = (x: number, y: number) => {
        return `X: ${Math.round(x)}px, Y: ${Math.round(y)}px`;
    };

    // Check if position is within bounds
    const isOutOfBounds = (pos: { x: number, y: number }) => {
        return pos.x < guidePosition.left ||
            pos.x > (guidePosition.left + guidePosition.width) ||
            pos.y < guidePosition.top ||
            pos.y > (guidePosition.top + guidePosition.height);
    };

    // Update positions for all designs
    useEffect(() => {
        const currentDesigns = designsByView[activeView];
        const newPositions = currentDesigns.map(design => {
            const pos = canvasToGuidePosition(
                design.transform.position.x,
                design.transform.position.y
            );

            return {
                id: design.id,
                position: pos,
                isOutOfBounds: isOutOfBounds(pos),
                actualPosition: design.transform.position
            };
        });

        setDesignPositions(newPositions);
    }, [designsByView, activeView]);

    return (
        <div className="space-y-2">
            <Card className="p-4">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-medium">Position Guide</h3>
                    <span className="text-xs text-muted-foreground">
                        {designsByView[activeView].length} design{designsByView[activeView].length !== 1 ? 's' : ''}
                    </span>
                </div>
                <div className="relative aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden">
                    {/* SVG Container for mockup outline */}
                    <svg
                        viewBox="0 0 400 500"
                        className="absolute inset-0 w-full h-full"
                        preserveAspectRatio="xMidYMid meet"
                    >
                        {/* Mockup outline */}
                        <MockupOutline
                            view={activeView as 'front' | 'back' | 'shoulder'}
                            className="fill-none stroke-gray-300 stroke-2"
                        />

                        {/* Safe area indicator */}
                        <rect
                            x={`${guidePosition.left}%`}
                            y={`${guidePosition.top}%`}
                            width={`${guidePosition.width}%`}
                            height={`${guidePosition.height}%`}
                            className="fill-none stroke-blue-400 stroke-2 stroke-dashed opacity-50"
                        />
                    </svg>

                    {/* Design position indicators */}
                    {designPositions.map((design) => (
                        <TooltipProvider key={design.id}>
                            <Tooltip>
                                <TooltipTrigger>
                                    <div
                                        className={`
                      absolute w-4 h-4 -translate-x-1/2 -translate-y-1/2 
                      rounded-full transition-colors cursor-pointer
                      ${design.isOutOfBounds ? 'bg-red-500' : 'bg-blue-500'}
                      ${design.id === activeDesignId ? 'ring-2 ring-white shadow-lg scale-125' : 'opacity-60'}
                    `}
                                        style={{
                                            top: `${design.position.y}%`,
                                            left: `${design.position.x}%`,
                                            zIndex: design.id === activeDesignId ? 10 : 1,
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
                                </TooltipTrigger>
                                <TooltipContent>
                                    <div className="text-xs">
                                        <p className="font-medium">Design {designsByView[activeView].findIndex(d => d.id === design.id) + 1}</p>
                                        <p>{formatCoordinates(design.actualPosition.x, design.actualPosition.y)}</p>
                                        {design.isOutOfBounds &&
                                            <p className="text-red-500 mt-1">⚠️ Outside safe area</p>
                                        }
                                    </div>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
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
            {designsByView[activeView].length === 0 && (
                <div className="text-xs text-center text-muted-foreground">
                    Add designs to see their positions
                </div>
            )}
        </div>
    );
};