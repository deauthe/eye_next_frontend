import { motion } from 'framer-motion';
import Image from 'next/image';

export const AnimatedBackground = () => {
    return (
        <div className="absolute inset-0 overflow-hidden">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-radial from-background via-background to-black" />

            {/* Animated Grid Pattern */}
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.15]" />

            {/* Floating Elements */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{
                    opacity: [0.1, 0.3, 0.1],
                    scale: [1, 1.2, 1]
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute top-1/4 -left-20 w-96 h-96 bg-accent/20 rounded-full blur-[100px]"
            />

            <motion.div
                initial={{ opacity: 0 }}
                animate={{
                    opacity: [0.1, 0.2, 0.1],
                    scale: [1, 1.1, 1]
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                }}
                className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/10 rounded-full blur-[120px]"
            />

            {/* Deauth Logo Watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.02]">
                <Image
                    src="/deauthCircleIcon.png"
                    alt="Deauth Watermark"
                    width={800}
                    height={800}
                    className="opacity-20"
                />
            </div>
        </div>
    );
};