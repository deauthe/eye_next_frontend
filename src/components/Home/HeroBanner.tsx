import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Button } from "../ui/button";
import { Droplets, Wind, Shield, ArrowRight } from "lucide-react";

const HeroBanner = () => {
	const [isHovered, setIsHovered] = useState(false);
	const [activeFeature, setActiveFeature] = useState(0);
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	const features = [
		{ icon: Droplets, title: "Water Resistant" },
		{ icon: Shield, title: "Premium Material" },
		{ icon: Wind, title: "Perfect Fit" },
	];
	return (
		<section className="min-h-screen flex items-center">
			<div className="container mx-auto px-4">
				<div className="grid md:grid-cols-2 gap-12 items-center">
					{/* Left Content */}
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						className="space-y-8"
					>
						{/* Animated brand tag */}
						<motion.div
							initial={{ width: 0, opacity: 0 }}
							animate={{ width: "auto", opacity: 1 }}
							className="inline-block"
						>
							<div className="glass-effect px-6 py-3 rounded-full flex items-center gap-3">
								<motion.div
									animate={{ rotate: 360 }}
									transition={{
										duration: 20,
										repeat: Infinity,
										ease: "linear",
									}}
								>
									<Image
										src="/deauthCircleIcon2.png"
										alt="Deauth Icon"
										width={30}
										height={30}
									/>
								</motion.div>
								<span className="font-heading1 text-accent">
									DEAUTH PREMIUM
								</span>
							</div>
						</motion.div>

						{/* Main title with animated gradient */}
						<div className="space-y-2">
							<motion.h1
								className="text-5xl md:text-7xl font-heading1 leading-tight"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 0.3 }}
							>
								<span className="text-white">The</span>
								<span className="text-gradient block">Ultimate Black</span>
								<span className="text-white">Hoodie</span>
							</motion.h1>
							<motion.p
								className="text-xl text-white/70"
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: 0.5 }}
							>
								Water-resistant. Premium. Perfect fit.
							</motion.p>
						</div>

						{/* Price tag with animated line */}
						<motion.div
							className="flex items-center gap-6"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.7 }}
						>
							<div className="text-4xl font-heading1 text-white">₹1,999</div>
							<motion.div
								initial={{ scaleX: 0 }}
								animate={{ scaleX: 1 }}
								className="h-[2px] bg-gradient-to-r from-accent to-transparent flex-1"
							/>
						</motion.div>

						{/* CTA Buttons */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.9 }}
							className="flex flex-wrap gap-4"
						>
							<Button
								className="bg-accent hover:bg-accent/90 text-white rounded-full py-6 px-8 text-lg font-heading1 hover-lift"
								onMouseEnter={() => setIsHovered(true)}
								onMouseLeave={() => setIsHovered(false)}
							>
								<span className="relative">
									Buy Now
									<motion.span
										animate={{ x: isHovered ? 5 : 0 }}
										transition={{ duration: 0.2 }}
									>
										<ArrowRight className="ml-2 inline-block" />
									</motion.span>
								</span>
							</Button>
							<Button
								variant="outline"
								className="border-accent/20 text-white hover:bg-accent/10 rounded-full py-6 px-8 text-lg font-heading1 animated-border"
								onClick={() => setIsDrawerOpen(true)}
							>
								Learn More
							</Button>
						</motion.div>
					</motion.div>

					{/* Right Content - Product Image */}
					<div className="relative">
						<motion.div
							initial={{ scale: 0.8, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							transition={{ duration: 1 }}
							className="relative z-10"
						>
							{/* Glowing background effect */}
							<div className="absolute inset-0 bg-accent/5 rounded-full blur-[0px] animate-pulse-slow" />

							{/* Product image with hover effect */}
							<motion.div
								whileHover={{ scale: 1.05 }}
								transition={{ duration: 0.3 }}
							>
								<Image
									src="/hood.png"
									alt="Premium Hoodie"
									width={600}
									height={600}
									className="object-contain relative z-10"
								/>
							</motion.div>

							{/* Floating feature indicators */}
							<AnimatePresence>
								{features.map((feature, index) => (
									<motion.div
										key={feature.title}
										initial={{ opacity: 0, scale: 0 }}
										animate={{
											opacity: activeFeature === index ? 1 : 0.5,
											scale: 1,
											x: Math.cos(index * ((Math.PI * 2) / 3)) * 150,
											y: Math.sin(index * ((Math.PI * 2) / 3)) * 150,
										}}
										exit={{ opacity: 0, scale: 0 }}
										className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
										onMouseEnter={() => setActiveFeature(index)}
									>
										<div className="glass-effect p-4 rounded-full">
											<feature.icon
												className={`w-6 h-6 ${
													activeFeature === index
														? "text-accent"
														: "text-white/50"
												}`}
											/>
										</div>
									</motion.div>
								))}
							</AnimatePresence>
						</motion.div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default HeroBanner;
