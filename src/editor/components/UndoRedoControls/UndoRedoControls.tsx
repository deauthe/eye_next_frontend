"use client";

import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Undo2, Redo2 } from 'lucide-react';
import { useEditorHistory } from '../../hooks/useEditorHistory';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider
} from "@/components/ui/tooltip";

export const UndoRedoControls: React.FC = () => {
    const { undo, redo, canUndo, canRedo } = useEditorHistory();
    const [isMac, setIsMac] = useState(false);

    useEffect(() => {
        setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const cmdKey = isMac ? e.metaKey : e.ctrlKey;

            if (cmdKey && e.key.toLowerCase() === 'z') {
                if (e.shiftKey && canRedo()) {
                    e.preventDefault();
                    redo();
                } else if (!e.shiftKey && canUndo()) {
                    e.preventDefault();
                    undo();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [undo, redo, canUndo, canRedo, isMac]);

    return (
        <TooltipProvider>
            <div className="flex gap-2">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={undo}
                            disabled={!canUndo()}
                        >
                            <Undo2 className="h-4 w-4" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Undo {isMac ? '⌘Z' : 'Ctrl+Z'}</p>
                    </TooltipContent>
                </Tooltip>

                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={redo}
                            disabled={!canRedo()}
                        >
                            <Redo2 className="h-4 w-4" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Redo {isMac ? '⌘⇧Z' : 'Ctrl+Shift+Z'}</p>
                    </TooltipContent>
                </Tooltip>
            </div>
        </TooltipProvider>
    );
};