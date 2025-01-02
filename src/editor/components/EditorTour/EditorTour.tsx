import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useEditor } from "../../store/editorStore";
import { Upload, Palette, Layout, Layers, Move, Eye, RotateCcw, ZoomIn, Mouse, RefreshCw } from 'lucide-react';

const EditorTour = () => {
    const [showTour, setShowTour] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const { setActiveView } = useEditor();

    // Check if this is the first visit
    useEffect(() => {
        const hasSeenTour = localStorage.getItem('editorTourCompleted');
        if (!hasSeenTour) {
            setShowTour(true);
        }
    }, []);

    // Helper function to scroll to and highlight an element
    const highlightElement = (selector: string) => {
        const element = document.querySelector(selector);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return element.getBoundingClientRect();
        }
        return null;
    };

    const tourSteps = [
        {
            title: "Welcome to the Design Editor! 👋",
            description: "Let's take a quick tour to help you get started with creating amazing designs.",
            icon: <Layout className="w-12 h-12 text-primary" />,
            overlay: "full",
        },
        {
            title: "Upload Your Designs",
            description: "Drop your design files here or click to browse. We'll automatically adjust the size to fit perfectly on your garment.",
            icon: <Upload className="w-12 h-12 text-primary" />,
            highlight: ".upload-zone",
            position: "right",
            action: () => setActiveView('front'),
            animation: (
                <motion.div
                    className="w-16 h-16 border-2 border-dashed border-primary rounded-lg"
                    animate={{
                        y: [0, -20, 0],
                        opacity: [1, 0.5, 1]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <Upload className="w-full h-full p-3 text-primary" />
                </motion.div>
            )
        },
        {
            title: "Transform Your Designs",
            description: "Use these intuitive controls to perfect your design's placement. Try rotating, scaling, or dragging to position.",
            icon: <Move className="w-12 h-12 text-primary" />,
            highlight: ".transform-controls",
            position: "left",
            animation: (
                <div className="space-y-4">
                    <motion.div className="flex items-center gap-2">
                        <ZoomIn className="w-6 h-6 text-primary" />
                        <motion.div
                            className="h-2 w-32 bg-primary rounded"
                            animate={{
                                scaleX: [1, 1.5, 1],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    </motion.div>
                    <motion.div className="flex items-center gap-2">
                        <RefreshCw className="w-6 h-6 text-primary" />
                        <motion.div
                            className="w-6 h-6 border-2 border-primary rounded"
                            animate={{
                                rotate: [0, 360],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        />
                    </motion.div>
                    <motion.div className="flex items-center gap-2">
                        <Mouse className="w-6 h-6 text-primary" />
                        <motion.div
                            className="w-6 h-6 bg-primary/20 rounded-full"
                            animate={{
                                x: [0, 40, 0],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <motion.div
                                className="w-2 h-2 bg-primary rounded-full"
                                style={{ margin: '8px' }}
                            />
                        </motion.div>
                    </motion.div>
                </div>
            )
        },
        {
            title: "Layer Management",
            description: "Manage multiple designs with our layer system. Drag to reorder, adjust opacity, or change blend modes for creative effects.",
            icon: <Layers className="w-12 h-12 text-primary" />,
            highlight: ".layer-panel",
            position: "right",
            animation: (
                <motion.div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                        <motion.div
                            key={i}
                            className="h-8 bg-primary/20 rounded"
                            initial={{ x: 0 }}
                            animate={{
                                y: i === 2 ? [-20, 0, -20] : 0,
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: i * 0.2
                            }}
                        />
                    ))}
                </motion.div>
            )
        },
        {
            title: "Preview & Export",
            description: "Once you're satisfied with your design, export it in high quality. Choose which views to include in your final output.",
            icon: <Eye className="w-12 h-12 text-primary" />,
            highlight: ".export-button",
            position: "left"
        }
    ];

    const highlightStyles = (position: string) => {
        let baseStyles = "fixed bg-black/50 backdrop-blur-sm";
        switch (position) {
            case "left":
                return `${baseStyles} top-0 left-0 bottom-0`;
            case "right":
                return `${baseStyles} top-0 right-0 bottom-0`;
            case "top":
                return `${baseStyles} top-0 left-0 right-0`;
            case "bottom":
                return `${baseStyles} bottom-0 left-0 right-0`;
            default:
                return `${baseStyles} inset-0`;
        }
    };

    const handleNext = () => {
        if (currentStep < tourSteps.length - 1) {
            setCurrentStep(prev => prev + 1);
            tourSteps[currentStep + 1].action?.();
        } else {
            completeTour();
        }
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
            tourSteps[currentStep - 1].action?.();
        }
    };

    const completeTour = () => {
        localStorage.setItem('editorTourCompleted', 'true');
        setShowTour(false);
    };

    if (!showTour) return null;

    const currentStepData = tourSteps[currentStep];

    return (
        <AnimatePresence>
            {showTour && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50"
                    >
                        <div className={highlightStyles(currentStepData.position || "full")} />
                    </motion.div>

                    {/* Tour Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-md"
                    >
                        <Card className="p-6 backdrop-blur-xl bg-background/95 shadow-2xl border-2">
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    {currentStepData.icon}
                                    <div>
                                        <h3 className="text-lg font-semibold">{currentStepData.title}</h3>
                                        <p className="text-muted-foreground">{currentStepData.description}</p>
                                    </div>
                                </div>

                                {/* Animation Container */}
                                {currentStepData.animation && (
                                    <div className="p-4 bg-muted/50 rounded-lg">
                                        {currentStepData.animation}
                                    </div>
                                )}

                                {/* Progress and Controls */}
                                <div className="space-y-4">
                                    {/* Progress dots */}
                                    <div className="flex justify-center gap-1">
                                        {tourSteps.map((_, index) => (
                                            <div
                                                key={index}
                                                className={`w-2 h-2 rounded-full transition-colors ${index === currentStep ? 'bg-primary' : 'bg-primary/20'
                                                    }`}
                                            />
                                        ))}
                                    </div>

                                    {/* Navigation buttons */}
                                    <div className="flex justify-between items-center">
                                        <Button
                                            variant="outline"
                                            onClick={handlePrevious}
                                            disabled={currentStep === 0}
                                        >
                                            Previous
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            onClick={completeTour}
                                        >
                                            Skip Tour
                                        </Button>
                                        <Button
                                            onClick={handleNext}
                                        >
                                            {currentStep === tourSteps.length - 1 ? "Get Started" : "Next"}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default EditorTour;