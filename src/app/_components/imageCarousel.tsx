"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const mockImages = [
    "/mock1.jpg",
    "/mock2.jpg",
    "/mock3.jpg",
    "/mock4.jpg",
    "/mock5.jpg",
]

export default function ImageCarousel() {
    const [index, setIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => prev + 1);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const totalSlides = mockImages.length;

        console.log("proc" + isTransitioning);
        if (index === totalSlides) {
            const timeout = setTimeout(() => {
                setIsTransitioning(false);
                setIndex(0);
            }, 1000);

            return () => clearTimeout(timeout);
        } else {
            const waitForAnim = setTimeout(() => {
                setIsTransitioning(true);
            }, 1000);
            return () => clearTimeout(waitForAnim);
        }
    }, [index]);

    const imagesToRender: string[] =
        mockImages.length > 0
            ? [...mockImages, mockImages[0]].filter((src): src is string => Boolean(src))
            : mockImages;

    return (
        <div className="relative w-full max-w-3xl h-64 mx-auto overflow-hidden rounded-2xl shadow-lg">
            <div
                className="flex w-full h-full"
                style={{
                    transform: `translateX(-${index * 100}%)`,
                    transition: isTransitioning ? "transform 1s ease-in-out" : "none",
                }}
            >
                {imagesToRender.map((src, i) => (
                    <Image
                        key={i}
                        src={src}
                        alt={`Slide ${i + 1}`}
                        width={1200}
                        height={400}
                        className="w-full h-64 object-cover flex-shrink-0"
                        priority={i === 0}
                    />
                ))}
            </div>
        </div>
    );
}