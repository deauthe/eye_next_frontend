import React from 'react';
import { motion } from 'framer-motion';
import { useHistoryPanel } from '../../hooks/useHistoryPanel';
import { cn } from '@/lib/utils';

export const TimelineView: React.FC = () => {
    const { snapshots, currentIndex, goToSnapshot } = useHistoryPanel();

    return (
        <div className="p-4">
            <div className="relative h-16">
                {/* Timeline track */}
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200" />

                {/* Timeline points */}
                <div className="relative">
                    {snapshots.map((snapshot, index) => (
                        <motion.div
                            key={snapshot.id}
                            className={cn(
                                "absolute top-1/2 -translate-y-1/2",
                                "w-3 h-3 rounded-full cursor-pointer",
                                "transform hover:scale-150 transition-transform",
                                currentIndex === index ? "bg-primary" : "bg-gray-400"
                            )}
                            style={{
                                left: `${(index / (snapshots.length - 1)) * 100}%`,
                            }}
                            onClick={() => goToSnapshot(index)}
                            whileHover={{ scale: 1.5 }}
                        >
                            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2">
                                <div className="text-xs whitespace-nowrap opacity-0 group-hover:opacity-100">
                                    {snapshot.description}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};