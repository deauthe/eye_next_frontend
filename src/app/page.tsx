// "use client";
// import Image from "next/image";
// import { Button } from '@/components/ui/button';
// import HeroBanner from "@/components/Home/HeroBanner";
// import Wrapper from "@/components/Wrapper";
// import Designers from "@/components/Home/ExploreDesigner/Designers";
// import CategorySection from "@/components/Home/CategorySection/CategorySection";
// import ExploreSection from "@/components/Home/ExploreProducts/ExploreProducts";
// import BestSellingSection from "@/components/Home/BestSeller/BestSellingSection";
// import ExploreDesigns from "@/components/Home/ExploreDesigns/ExploreDesigns";
// import FeatureStrip from "@/components/Home/FeatureStrip/FeatureStrip";
// import About from "@/components/Home/About/About";
// import PersonalizedPicks from "@/components/Home/PersonalizedPicks/PersonalizedPicks";

// export default function Home() {
//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between md:gap-10 gap-5">
//       {/* <div className="text-start bg-red-400"> */}
//       {/* <HeroBanner /> */}

//       {/* </div> */}
//       {/* <Wrapper>
//         <div>
//           <BestSellingSection />
//         </div>
//       </Wrapper> */}
//       <Wrapper>
//         {/* <div>
//           <Designers />
//         </div> */}
//         <div className="">
//           <About />
//         </div>
//       </Wrapper>
//       <div className=" w-screen ">
//         <FeatureStrip />
//       </div>
//       <Wrapper>

//         <div className="pt-[80px] md:pt-[100px] px-4 md:px-8">
//           <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
//             {/* Product Image */}
//             <div className="relative aspect-square rounded-lg overflow-hidden">
//               <Image
//                 src="/C_hoodie.png"
//                 alt="Premium Hoodie"
//                 fill
//                 className="object-cover transform hover:scale-105 transition-transform duration-500"
//               />
//             </div>

//             {/* Product Info */}
//             <div className="text-white space-y-6">
//               <h1 className="text-4xl md:text-6xl font-bold">
//                 Premium Cotton Hoodie
//               </h1>
//               <p className="text-xl md:text-2xl text-accent">
//                 ₹1,999
//               </p>
//               <p className="text-gray-400 text-lg">
//                 Experience unmatched comfort with our premium cotton hoodie.
//                 Perfect fit, exceptional quality, and timeless style.
//               </p>
//               <div className="space-y-4">
//                 <Button
//                   onClick={() => router.push('/product/premium-hoodie')}
//                   className="w-full md:w-auto text-lg py-6 px-8 bg-accent hover:bg-accent/90"
//                 >
//                   Shop Now
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </Wrapper>

//       {/* <div className=" w-screen ">
//         <CategorySection />
//       </div>
//       <Wrapper>
//         <div>
//           <ExploreSection />
//         </div>
//       </Wrapper>

//       <div className="bg-accent w-screen lg:px-32 mb-10">
//         <ExploreDesigns />
//       </div>
//       <Wrapper>
//         <div>
//           <PersonalizedPicks />
//         </div>
//       </Wrapper> */}
//     </main>
//   );
// }

// "use client";
// import Image from "next/image";
// import { Button } from '@/components/ui/button';
// import HeroBanner from "@/components/Home/HeroBanner";
// import Wrapper from "@/components/Wrapper";
// import Designers from "@/components/Home/ExploreDesigner/Designers";
// import CategorySection from "@/components/Home/CategorySection/CategorySection";
// import ExploreSection from "@/components/Home/ExploreProducts/ExploreProducts";
// import BestSellingSection from "@/components/Home/BestSeller/BestSellingSection";
// import ExploreDesigns from "@/components/Home/ExploreDesigns/ExploreDesigns";
// import FeatureStrip from "@/components/Home/FeatureStrip/FeatureStrip";
// import About from "@/components/Home/About/About";
// import PersonalizedPicks from "@/components/Home/PersonalizedPicks/PersonalizedPicks";
// import { useRouter } from "next/navigation";

// export default function Home() {
//   const router = useRouter();

//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between md:gap-10 gap-5">
//       <Wrapper>
//         <div className="">
//           <About />
//         </div>
//       </Wrapper>

//       <div className="w-screen">
//         <FeatureStrip />
//       </div>

//       <Wrapper>
//         <div className="pt-[80px] md:pt-[100px]">
//           <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
//             {/* Product Image */}
//             <div className="relative aspect-square rounded-lg overflow-hidden bg-black/[0.8]">
//               <Image
//                 src="/C_hoodie.png"
//                 alt="Premium Hoodie"
//                 fill
//                 className="object-cover transform hover:scale-105 transition-transform duration-500"
//               />
//             </div>

//             {/* Product Info */}
//             <div className="text-black space-y-6">
//               <h1 className="text-4xl md:text-6xl font-heading1">
//                 Premium Cotton Hoodie
//               </h1>
//               <p className="text-xl md:text-2xl text-accent font-heading1">
//                 ₹1,999
//               </p>
//               <p className="text-black/70 text-lg">
//                 Experience unmatched comfort with our premium cotton hoodie.
//                 Perfect fit, exceptional quality, and timeless style.
//               </p>
//               <div className="space-y-4">
//                 <Button
//                   onClick={() => router.push('/product/premium-hoodie')}
//                   className="w-full md:w-auto text-lg py-6 px-8 bg-accent hover:bg-accent/90 rounded-full font-heading1"
//                 >
//                   Shop Now
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Coming Soon Section */}
//         <div className="py-20 text-center">
//           <div className="bg-secondaryBackground rounded-xl p-10">
//             <h2 className="text-3xl md:text-4xl font-heading1 text-white mb-4">
//               More Collections Coming Soon
//             </h2>
//             <p className="text-white/70 text-lg font-heading1">
//               Stay tuned for our upcoming exclusive collections
//             </p>
//           </div>
//         </div>
//       </Wrapper>
//     </main>
//   );
// }

"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
	motion,
	useScroll,
	useTransform,
	AnimatePresence,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ProductDetailsDrawer } from "@/components/ProductPage/ProductDetailsDrawer";
import HeroBanner from "@/components/Home/HeroBanner";
import Features from "@/components/Home/Feautures/Features";
import AnimatedBackground from "@/components/AnimatedBackground";

export default function Home() {
	const containerRef = useRef(null);
	const [isHovered, setIsHovered] = useState(false);
	const [activeFeature, setActiveFeature] = useState(0);
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start start", "end end"],
	});

	return (
		<main ref={containerRef} className="relative min-h-screen">
			{/* Hero Banner */}
			<AnimatedBackground />
			{/* Main Content */}
			<div className="relative z-10">
				{/* Hero Section */}
				<HeroBanner />
				<Features />

				{/* Product Details Section */}
				<section className="relative py-32 overflow-hidden">
					<div className="container mx-auto px-4">
						<div className="grid md:grid-cols-2 gap-16 items-center">
							<motion.div
								initial={{ opacity: 0, x: -50 }}
								whileInView={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.8 }}
								className="space-y-8"
							>
								<h2 className="text-4xl md:text-5xl font-heading1 text-white leading-tight">
									Designed for <br />
									<span className="text-accent">Modern Lifestyle</span>
								</h2>
								<p className="text-white/70 text-lg">
									Our premium hoodie combines style with functionality. The
									water-resistant finish protects you from light rain, while the
									premium cotton blend ensures maximum comfort.
								</p>

								<div className="grid grid-cols-2 gap-8">
									<div>
										<div className="text-2xl font-heading1 text-accent mb-2">
											100%
										</div>
										<div className="text-white/70">Premium Cotton</div>
									</div>
									<div>
										<div className="text-2xl font-heading1 text-accent mb-2">
											5+
										</div>
										<div className="text-white/70">Color Options</div>
									</div>
								</div>

								<Button className="bg-accent hover:bg-accent/90 text-white rounded-full py-6 px-8 text-lg font-heading1">
									Shop Now <ArrowRight className="ml-2" />
								</Button>
							</motion.div>

							<div className="relative">
								<motion.div
									initial={{ scale: 0.8, opacity: 0 }}
									whileInView={{ scale: 1, opacity: 1 }}
									transition={{ duration: 0.8 }}
									className="relative z-10"
								>
									<Image
										src="/hood.png"
										alt="Premium Hoodie Details"
										width={500}
										height={500}
										className="object-contain transform -scale-x-100 z-0"
									/>
								</motion.div>

								{/* Background Elements */}
								<div className="absolute inset-0 bg-accent/5 rounded-full blur-3xl" />
							</div>
						</div>
					</div>
				</section>

				{/* Coming Soon Section */}
				<section className="relative py-32 bg-secondaryBackground overflow-hidden">
					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						transition={{ duration: 1 }}
						className="absolute inset-0"
					>
						<div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,125,5,0.1),transparent_70%)]" />
					</motion.div>

					<div className="container mx-auto px-4 text-center relative z-10">
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
							className="max-w-2xl mx-auto"
						>
							<h2 className="text-4xl md:text-5xl font-heading1 text-white mb-6">
								More Collections{" "}
								<span className="text-accent">Coming Soon</span>
							</h2>
							<p className="text-white/70 mb-8">
								Join our community and be the first to know about our upcoming
								releases
							</p>
							<Button
								variant="outline"
								className="border-accent/20 text-white hover:bg-accent/10 rounded-full py-6 px-8 text-lg font-heading1"
							>
								Get Notified
							</Button>
						</motion.div>
					</div>
				</section>
				<ProductDetailsDrawer
					isOpen={isDrawerOpen}
					onClose={() => setIsDrawerOpen(false)}
				/>
			</div>
		</main>
	);
}
