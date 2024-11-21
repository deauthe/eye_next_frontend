import { Dialog, DialogContent } from '@/components/ui/dialog';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { Droplets, Shield, Wind } from 'lucide-react';

interface ProductDetailsDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

const features = [
    {
        title: "Water Resistant",
        icon: Droplets,
        description: "Made with special water-repellent fabric that keeps you dry in light rain",
        image: "/C_hoodie.png",
        details: [
            "Repels water droplets",
            "Quick-drying material",
            "Maintains breathability"
        ],
        color: "#0EA5E9"
    },
    {
        title: "Premium Material",
        icon: Shield,
        description: "Crafted from high-quality cotton blend for ultimate comfort",
        image: "/C_hoodie.png",
        details: [
            "100% Premium Cotton",
            "Durable stitching",
            "Soft inner lining"
        ],
        color: "#FF7D05"
    },
    {
        title: "Perfect Fit",
        icon: Wind,
        description: "Designed to provide optimal comfort and style",
        image: "/C_hoodie.png",
        details: [
            "Athletic fit",
            "Ribbed cuffs and hem",
            "Adjustable hood"
        ],
        color: "#10B981"
    }
];

export const ProductDetailsDrawer = ({ isOpen, onClose }: ProductDetailsDrawerProps) => {
    const [activeFeature, setActiveFeature] = useState(0);
    const [hoveredDetail, setHoveredDetail] = useState<number | null>(null);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-7xl p-0 bg-black/95 border-accent/20">
                <div className="relative min-h-[85vh] overflow-hidden">
                    {/* Background Elements */}
                    <div className="absolute inset-0">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.1 }}
                            className="absolute inset-0 bg-grid-pattern"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background to-black" />
                    </div>

                    <div className="relative z-10 h-full">
                        {/* Navigation */}
                        <div className="sticky top-0 bg-black/80 backdrop-blur-xl border-b border-accent/10">
                            <div className="flex items-center justify-between px-8 py-6">
                                <h2 className="text-3xl font-heading1 text-white">Premium Features</h2>
                                <div className="flex gap-4">
                                    {features.map((feature, index) => (
                                        <motion.button
                                            key={feature.title}
                                            onClick={() => setActiveFeature(index)}
                                            className={`relative px-6 py-3 rounded-full transition-all duration-300 ${activeFeature === index
                                                ? "bg-accent text-white"
                                                : "bg-secondary-background text-white/70 hover:bg-accent/20"
                                                }`}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <span className="flex items-center gap-2">
                                                <feature.icon className="w-5 h-5" />
                                                {feature.title}
                                            </span>
                                            {activeFeature === index && (
                                                <motion.div
                                                    layoutId="activeTab"
                                                    className="absolute inset-0 bg-accent rounded-full"
                                                    style={{ zIndex: -1 }}
                                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                                />
                                            )}
                                        </motion.button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-8">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeFeature}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="grid md:grid-cols-2 gap-12"
                                >
                                    {/* Image Side */}
                                    <div className="relative">
                                        <div className="sticky top-32">
                                            <div className="relative aspect-square rounded-2xl overflow-hidden bg-secondary-background">
                                                <Image
                                                    src={features[activeFeature].image}
                                                    alt={features[activeFeature].title}
                                                    fill
                                                    className="object-cover hover:scale-105 transition-transform duration-500"
                                                />
                                                {/* Gradient Overlay */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                                                {/* Feature Icon */}

                                            </div>
                                        </div>
                                    </div>

                                    {/* Content Side */}
                                    <div className="space-y-8">
                                        <div>
                                            <motion.h3
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className="text-4xl font-heading1 text-white mb-4"
                                            >
                                                {features[activeFeature].title}
                                            </motion.h3>
                                            <motion.p
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.1 }}
                                                className="text-white/70 text-lg leading-relaxed"
                                            >
                                                {features[activeFeature].description}
                                            </motion.p>
                                        </div>

                                        <div className="space-y-6">
                                            <h4 className="text-xl font-heading1 text-white/80">Key Features</h4>
                                            <div className="space-y-4">
                                                {features[activeFeature].details.map((detail, index) => (
                                                    <motion.div
                                                        key={detail}
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: index * 0.1 }}
                                                        onMouseEnter={() => setHoveredDetail(index)}
                                                        onMouseLeave={() => setHoveredDetail(null)}
                                                        className="relative group"
                                                    >
                                                        <div className={`
                              absolute inset-0 bg-accent/5 rounded-xl transition-all duration-300
                              ${hoveredDetail === index ? 'opacity-100' : 'opacity-0'}
                            `} />
                                                        <div className="relative p-4 flex items-center gap-4">
                                                            <div className={`
                                w-2 h-2 rounded-full bg-accent transition-all duration-300
                                ${hoveredDetail === index ? 'scale-150' : 'scale-100'}
                              `} />
                                                            <p className="text-white/90 text-lg">{detail}</p>
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Additional Info Cards */}
                                        <div className="grid grid-cols-2 gap-6 mt-8">
                                            {[
                                                { label: "Material", value: "Premium Cotton" },
                                                { label: "Style", value: "Modern Fit" }
                                            ].map((item, index) => (
                                                <motion.div
                                                    key={item.label}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.2 + (index * 0.1) }}
                                                    className="bg-secondary-background rounded-xl p-4 border border-accent/10"
                                                >
                                                    <p className="text-white/50 text-sm">{item.label}</p>
                                                    <p className="text-white font-heading1 text-lg mt-1">
                                                        {item.value}
                                                    </p>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};