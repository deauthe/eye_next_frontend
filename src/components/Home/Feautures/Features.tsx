"use-client";
import { cn } from "@/lib/utils";
import clsx from "clsx";
import { motion } from "framer-motion";
import { Droplets, Shield, Wind } from "lucide-react";
import Image from "next/image";
const Features = () => {
	const iconSizes = {
		small: 8,
		medium: 16,
		large: 32,
	};
	return (
		<section className="py-32 relative bg-secondaryBackground">
			<div className="container mx-auto px-4">
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="text-center mb-20"
				>
					<h2 className="text-4xl md:text-5xl font-heading1 text-white mb-4">
						Crafted for <span className="text-accent">Excellence</span>
					</h2>
					<p className="text-white/70 max-w-2xl mx-auto">
						Every detail matters in our premium hoodie design
					</p>
				</motion.div>

				<div className="flex flex-col gap-8 ">
					{[
						{
							//clsx to use dynamic classes
							icon: (
								<Droplets
									className={clsx(
										`w-${iconSizes.small} h-${iconSizes.small}`,
										`lg:w-${iconSizes.large} lg:h-${iconSizes.large}`,
										`md:w-${iconSizes.medium} md:h-${iconSizes.medium}`
									)}
								/>
							),
							title: "Water Resistant",
							description: "Protected against light rain and splashes",
						},
						{
							icon: (
								<Shield
									className={`w-${iconSizes.small} h-${iconSizes.small} lg:w-${iconSizes.large} md:h-${iconSizes.medium} md:w-${iconSizes.medium} lg:h-${iconSizes.large}`}
								/>
							),
							title: "Premium Material",
							description: "High-quality cotton blend for ultimate comfort",
						},
						{
							icon: (
								<Wind
									className={`w-${iconSizes.small} h-${iconSizes.small} lg:w-${iconSizes.large} md:h-${iconSizes.medium} md:w-${iconSizes.medium} lg:h-${iconSizes.large}`}
								/>
							),
							title: "Perfect Fit",
							description: "Tailored design for optimal comfort",
						},
					].map((feature, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.2 }}
							className="grid md:grid-cols-2 bg-background border border-accent/10  rounded-xl p-8 hover:border-accent/30 text-white/70"
						>
							{/* left section  */}
							<div className="relative items-center h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,125,5,0.1),rgba(0,0,0,1)_70%)] transition-colors duration-300 flex flex-col justify-center">
								<div className="bg-accent/10 w-32 h-32 rounded-full flex items-center justify-center mb-6 text-accent">
									{feature.icon}
								</div>
								<h3 className="text-3xl font-heading1 text-accent mb-3">
									{feature.title}
								</h3>
								<p className="">{feature.description}</p>
							</div>
							{/* right section  */}
							<div>
								<Image src="/hood.png" width={500} height={500} alt="hood" />
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Features;
