"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const mockImages = [
    "https://9gnhpfz58f.ufs.sh/f/tmaDM84wMO1yIUb8qk9QTWJIHa1qGbRLieElBAgYUoC2yDXn",
    "https://9gnhpfz58f.ufs.sh/f/tmaDM84wMO1yyRVYD4wKXBP65Mm0rdsYnDeHi4zaVgpj8qJW",
    "https://9gnhpfz58f.ufs.sh/f/tmaDM84wMO1yuy4Fm5NB98RK1yeZNcpY3EF0k24WJULXxoMb",
    "https://9gnhpfz58f.ufs.sh/f/tmaDM84wMO1yIOiyvF9QTWJIHa1qGbRLieElBAgYUoC2yDXn",
    "https://9gnhpfz58f.ufs.sh/f/tmaDM84wMO1y1d4UjHCEekC9uBbgNM4AJiaGqRhXdIYF2H1l",
    "https://9gnhpfz58f.ufs.sh/f/tmaDM84wMO1yEpICyrfeotsnGNqAUOg4JVYk0PZE9zviTmWC",
    "https://9gnhpfz58f.ufs.sh/f/tmaDM84wMO1yRog03vsTJh8EkRy2BIuCtVDK3An4PdGbp0Sg",
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
    }, [index, isTransitioning]);

    const imagesToRender: string[] =
        mockImages.length > 0
            ? [...mockImages, mockImages[0]].filter((src): src is string => Boolean(src))
            : mockImages;

    return (
        <div className="relative w-[60%] aspect-[2/1] mx-auto overflow-hidden rounded-2xl shadow-lg">
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
                        height={900}
                        className="w-full h-full object-cover flex-shrink-0"
                        priority={i === 0}
                    />
                ))}
            </div>
        </div>
    );
}