import React from 'react';
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useHistoryPanel } from '../../hooks/useHistoryPanel';
import { format } from 'date-fns';

export const HistoryPanel: React.FC = () => {
    const { snapshots, currentIndex, goToSnapshot, clear } = useHistoryPanel();

    return (
        <Card className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">History</h3>
                <Button variant="ghost" size="sm" onClick={clear}>
                    Clear
                </Button>
            </div>

            <ScrollArea className="h-[200px]">
                <div className="space-y-2">
                    {snapshots.map((snapshot, index) => (
                        <div
                            key={snapshot.id}
                            className={`
                p-2 rounded cursor-pointer transition-colors
                ${index === currentIndex ? 'bg-primary/10' : 'hover:bg-accent'}
              `}
                            onClick={() => goToSnapshot(index)}
                        >
                            <div className="flex justify-between items-center">
                                <span className="text-sm">{snapshot.description}</span>
                                <span className="text-xs text-muted-foreground">
                                    {format(snapshot.timestamp, 'HH:mm:ss')}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </Card>
    );
};