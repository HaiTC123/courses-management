"use client";

import * as React from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

export function CarouselCourse({ items }: { items: any[] }) {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}
      className="w-full"
    >
      <CarouselContent>
        {items.map((item, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card className="w-full h-[300px]">
                <CardContent
                  className={cn(
                    "flex items-center justify-between w-full h-full p-6 aspect-square rounded-lg overflow-hidden"
                  )}
                  style={{
                    background: item.classBackground,
                  }}
                >
                  <div>
                    <h1 className="mb-4 text-3xl font-semibold text-white">
                      {item.title}
                    </h1>
                    <p className="text-white text-md">{item.description}</p>
                  </div>
                  <div className="hidden lg:block">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "100%", height: "auto" }}
                        priority={true}
                      />
                    ) : null}
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="-left-[12px]" />
      <CarouselNext className="-right-[12px]" />
    </Carousel>
  );
}
