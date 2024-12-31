import React from 'react';
import { Button } from "@/components/ui/button";
import { Undo2, Redo2 } from 'lucide-react';
import { useEditorHistory } from '../../hooks/useEditorHistory';

export const UndoRedoControls: React.FC = () => {
    const { undo, redo, canUndo, canRedo } = useEditorHistory();

    return (
        <div className="flex gap-2">
            <Button
                variant="outline"
                size="icon"
                onClick={undo}
                disabled={!canUndo()}
                title="Undo (Ctrl+Z)"
            >
                <Undo2 className="h-4 w-4" />
            </Button>

            <Button
                variant="outline"
                size="icon"
                onClick={redo}
                disabled={!canRedo()}
                title="Redo (Ctrl+Shift+Z)"
            >
                <Redo2 className="h-4 w-4" />
            </Button>
        </div>
    );
};