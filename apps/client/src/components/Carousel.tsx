"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"

const imageSources = [
  "/featured.png",
  "/sneakers1.jpg",
  "/vasky1.webp",
]

export function CarouselDemo() {
    const plugin = React.useRef(
        Autoplay({ delay: 3000, stopOnInteraction: true })
    )
  return (
    <div className="relative mb-12 w-full">
        <Carousel 
            className=""
            onMouseEnter={() => plugin.current.stop()}
            onMouseLeave={() => plugin.current.play()}
            plugins={[plugin.current]}
        >
        <CarouselContent>
            {imageSources.map((imageSrc, index) => (
            <CarouselItem key={index}>
                <div className="p-1">
                    <div className="relative h-[340px] w-full overflow-hidden rounded-xl">
                        <Image
                            src={imageSrc}
                            alt={`Featured banner ${index + 1}`}
                            fill
                            sizes="(max-width: 768px) 100vw, 1200px"
                            className="object-contain"
                            priority={index === 0}
                        />
                    </div>
                </div>
            </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
        </Carousel>
    </div>
  )
}
