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

"use client"
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Button } from '@/components/ui/button';
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, Droplets, Wind, Shield } from "lucide-react";
import { ProductDetailsDrawer } from "@/components/ProductPage/ProductDetailsDrawer";

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 z-0">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,125,5,0.1),rgba(0,0,0,1)_70%)]" />

      {/* Deauth Logo Watermark - rotating slowly */}
      <motion.div
        animate={{
          rotate: 360,
          scale: [1, 1.1, 1]
        }}
        transition={{
          rotate: { duration: 30, repeat: Infinity, ease: "linear" },
          scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
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
        className="absolute inset-0 bg-grid-pattern"
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

export default function Home() {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const features = [
    { icon: Droplets, title: "Water Resistant" },
    { icon: Shield, title: "Premium Material" },
    { icon: Wind, title: "Perfect Fit" }
  ];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);

  return (
    <main ref={containerRef} className="relative min-h-screen">
      {/* Animated Background */}
      <AnimatedBackground />
      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
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
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <Image
                        src="/deauthCircleIcon.png"
                        alt="Deauth Icon"
                        width={30}
                        height={30}
                      />
                    </motion.div>
                    <span className="font-heading1 text-accent">DEAUTH PREMIUM</span>
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
                  <div className="absolute inset-0 bg-accent/5 rounded-full blur-[100px] animate-pulse-slow" />

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
                          x: Math.cos(index * (Math.PI * 2 / 3)) * 150,
                          y: Math.sin(index * (Math.PI * 2 / 3)) * 150
                        }}
                        exit={{ opacity: 0, scale: 0 }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        onMouseEnter={() => setActiveFeature(index)}
                      >
                        <div className="glass-effect p-4 rounded-full">
                          <feature.icon className={`w-6 h-6 ${activeFeature === index ? 'text-accent' : 'text-white/50'}`} />
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
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

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Droplets className="w-8 h-8" />,
                  title: "Water Resistant",
                  description: "Protected against light rain and splashes"
                },
                {
                  icon: <Shield className="w-8 h-8" />,
                  title: "Premium Material",
                  description: "High-quality cotton blend for ultimate comfort"
                },
                {
                  icon: <Wind className="w-8 h-8" />,
                  title: "Perfect Fit",
                  description: "Tailored design for optimal comfort"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="relative group cursor-pointer"
                >
                  <div className="absolute inset-0 bg-accent/5 rounded-xl transform group-hover:scale-105 transition-transform duration-300" />
                  <div className="relative bg-background border border-accent/10 rounded-xl p-8 hover:border-accent/30 transition-colors duration-300">
                    <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mb-6 text-accent">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-heading1 text-accent mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-black/70">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

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
                  Our premium hoodie combines style with functionality.
                  The water-resistant finish protects you from light rain,
                  while the premium cotton blend ensures maximum comfort.
                </p>

                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <div className="text-2xl font-heading1 text-accent mb-2">100%</div>
                    <div className="text-white/70">Premium Cotton</div>
                  </div>
                  <div>
                    <div className="text-2xl font-heading1 text-accent mb-2">5+</div>
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
                    className="object-contain transform -scale-x-100"
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
                More Collections <span className="text-accent">Coming Soon</span>
              </h2>
              <p className="text-white/70 mb-8">
                Join our community and be the first to know about our upcoming releases
              </p>
              <Button variant="outline" className="border-accent/20 text-white hover:bg-accent/10 rounded-full py-6 px-8 text-lg font-heading1">
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