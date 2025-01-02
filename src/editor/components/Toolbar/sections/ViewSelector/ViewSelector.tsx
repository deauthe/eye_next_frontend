import React from 'react';
import { Button } from "@/components/ui/button";
import { useEditor } from '../../../../store/editorStore';
import { ViewType } from '../../../../types/editor.types';

export const ViewSelector: React.FC = () => {
    const { activeView, setActiveView } = useEditor();

    const views: ViewType[] = ['front', 'back', 'shoulder'];

    return (
        <div className="space-y-2">
            <h3 className="text-sm font-medium">View</h3>
            <div className="flex gap-2">
                {views.map((view) => (
                    <Button
                        key={view}
                        variant={activeView === view ? "default" : "outline"}
                        size="sm"
                        className="flex-1 capitalize"
                        onClick={() => setActiveView(view)}
                    >
                        {view}
                    </Button>
                ))}
            </div>
        </div>
    );
};
