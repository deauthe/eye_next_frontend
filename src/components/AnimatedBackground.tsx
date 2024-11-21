"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const AnimatedBackground = () => {
	return (
		<div className="fixed inset-0 z-0">
			{/* Animated gradient background */}
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,125,5,0.1),rgba(0,0,0,1)_70%)]" />

			{/* Deauth Logo Watermark - rotating slowly */}
			<motion.div
				animate={{
					rotate: 360,
					scale: [1, 1.1, 1],
				}}
				transition={{
					rotate: { duration: 30, repeat: Infinity, ease: "linear" },
					scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
				}}
				className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-[0.02]"
			>
				<Image
					src="/deauthCircleIcon.png"
					alt="Deauth Watermark"
					fill
					className="object-contain"
				/>
			</motion.div>

			{/* Animated grid pattern */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 0.05 }}
				className="absolute inset-0 bg-grid-pattern bg-white"
			/>

			{/* Floating particles */}
			<div className="absolute inset-0 overflow-hidden">
				{[...Array(20)].map((_, i) => (
					<motion.div
						key={i}
						className="absolute w-2 h-2 bg-accent/20 rounded-full"
						initial={{
							x: Math.random() * window.innerWidth,
							y: Math.random() * window.innerHeight,
						}}
						animate={{
							y: [0, -20, 0],
							x: [0, Math.random() * 20 - 10, 0],
							scale: [1, 1.2, 1],
							opacity: [0.2, 0.5, 0.2],
						}}
						transition={{
							duration: 3 + Math.random() * 2,
							repeat: Infinity,
							delay: Math.random() * 2,
						}}
					/>
				))}
			</div>
		</div>
	);
};

export default AnimatedBackground;
