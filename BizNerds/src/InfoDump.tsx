import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "./components/ui/card"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

export default function InfoDump() {
    const cardData = [
        { title: "Index Funds", description: "This is the first card This is the first card This is the first card This is the first card This is the first card" },
        { title: "Stocks", description: "This is the second card" },
        { title: "Bonds", description: "This is the third card" },
        { title: "Real Estate", description: "This is the fourth card" },
        { title: "High Interest Accounts ", description: "This is the fifth card" },
      ];

      const plugin = React.useRef(
        Autoplay({ delay: 4000, stopOnInteraction: true })
      )
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-semibold">Investing 101</h1>
      <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-7/8 h-full p-8"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem className="h-full" key={index}>
            <div className="p-1 h-full">
              <Card className="h-full">
                <CardContent className="flex items-center h-full justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
    <Button
      className="absolute -bottom-24 -right-24 px-16 py-8 bg-black text-white rounded-3xl text-5xl"
      onClick={() => navigate("/Profiler")}
      >
      Start
    </Button>
    </div>
    
  )
}

