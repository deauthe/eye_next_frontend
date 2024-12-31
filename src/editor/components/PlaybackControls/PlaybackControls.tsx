import React from 'react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import {
    Play,
    Pause,
    SkipBack,
    SkipForward,
    Rewind,
    FastForward,
    Clock
} from 'lucide-react';
import { useHistoryPlayback } from '../../hooks/useHistoryPlayback';
import { useHistoryPanel } from '../../hooks/useHistoryPanel';
import { cn } from '@/lib/utils';

const speedOptions = [0.5, 1, 2, 4];

export const PlaybackControls: React.FC = () => {
    const {
        isPlaying,
        speed,
        direction,
        start,
        pause,
        setSpeed,
        setDirection,
        stepForward,
        stepBackward
    } = useHistoryPlayback();

    const { snapshots, currentIndex } = useHistoryPanel();

    const progress = ((currentIndex + 1) / snapshots.length) * 100;

    return (
        <div className="p-4 border-t bg-background">
            <div className="space-y-4">
                {/* Progress bar */}
                <div className="relative h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div
                        className="absolute top-0 left-0 h-full bg-primary transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {/* Play/Pause */}
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => isPlaying ? pause() : start()}
                        >
                            {isPlaying ? (
                                <Pause className="h-4 w-4" />
                            ) : (
                                <Play className="h-4 w-4" />
                            )}
                        </Button>

                        {/* Step controls */}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={stepBackward}
                            disabled={currentIndex === 0}
                        >
                            <SkipBack className="h-4 w-4" />
                        </Button>

                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={stepForward}
                            disabled={currentIndex === snapshots.length - 1}
                        >
                            <SkipForward className="h-4 w-4" />
                        </Button>

                        {/* Direction toggle */}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setDirection(
                                direction === 'forward' ? 'backward' : 'forward'
                            )}
                        >
                            {direction === 'forward' ? (
                                <FastForward className="h-4 w-4" />
                            ) : (
                                <Rewind className="h-4 w-4" />
                            )}
                        </Button>
                    </div>

                    {/* Speed control */}
                    <div className="flex items-center gap-4">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <div className="flex gap-2">
                            {speedOptions.map((option) => (
                                <Badge
                                    key={option}
                                    variant={speed === option ? "default" : "outline"}
                                    className={cn(
                                        "cursor-pointer",
                                        speed === option && "bg-primary"
                                    )}
                                    onClick={() => setSpeed(option)}
                                >
                                    {option}x
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {/* Current position */}
                    <div className="text-sm text-gray-500">
                        {currentIndex + 1} / {snapshots.length}
                    </div>
                </div>

                {/* Animation timeline */}
                <div className="flex items-center gap-2">
                    <Slider
                        value={[currentIndex]}
                        min={0}
                        max={Math.max(0, snapshots.length - 1)}
                        step={1}
                        className="w-full"
                        onValueChange={([value]) => {
                            useHistoryPanel.getState().goToSnapshot(value);
                        }}
                    />
                </div>
            </div>
        </div>
    );
};