"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

const carouselItems = [
  { title: "3D Modeling Services", imageUrl: "/service-furniture-interiors-clean.png", href: "/services" },
  { title: "3D Product Animation Services", imageUrl: "/service-product-appliances-clean.png", href: "/services" },
  { title: "3D Texturing Services", imageUrl: "/service-lighting-decor-clean.png", href: "/services" },
  { title: "AR 3D Modeling Services", imageUrl: "/service-packaging-ecommerce-clean.png", href: "/services" },
];

export function InfiniteCardCarousel() {
  const [isHovered, setIsHovered] = useState(false);
  // Duplicate array to create seamless loop
  const repeatedItems = [...carouselItems, ...carouselItems, ...carouselItems];

  return (
    <div 
      className="relative flex overflow-hidden w-full py-10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="flex gap-4 md:gap-6 whitespace-nowrap pl-4 md:pl-6"
        animate={{
          x: ["0%", "-33.333333%"],
        }}
        transition={{
          duration: 30,
          ease: "linear",
          repeat: Infinity,
        }}
        style={{
          // Use animationPlayState to pause on hover if desired, 
          // but Framer Motion animation prop doesn't easily pause via CSS without using useAnimation.
          // For simplicity, we just let it slide, or we can use generic CSS animation for pausing.
        }}
      >
        {repeatedItems.map((item, index) => (
          <Link href={item.href} key={index} className="w-[280px] md:w-[360px] shrink-0 rounded-2xl overflow-hidden bg-brand-bg flex flex-col group/card border border-brand-accent/20">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-brand-bg-alt">
              <Image 
                src={item.imageUrl} 
                alt={item.title} 
                fill 
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.21,0.47,0.32,0.98)] group-hover/card:scale-105" 
              />
            </div>
            <div className="p-6 bg-white text-left flex items-center h-20">
              <h3 className="text-base md:text-lg font-bold tracking-tight text-black whitespace-normal">
                {item.title}
              </h3>
            </div>
          </Link>
        ))}
      </motion.div>
    </div>
  );
}
