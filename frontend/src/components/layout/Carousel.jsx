import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export function SkincareTipsCarousel() {
    const tips = [
        "Keep your skin clean — wash twice daily with a mild cleanser.",
        "Stay hydrated — drink at least 2L of water a day.",
        "Avoid touching affected areas unnecessarily.",
        "Always apply sunscreen when going outdoors.",
    ];

    return (
        <div className="mt-8 bg-muted rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Daily Skincare Tips 💡</h2>
            <Carousel
                className="w-full"
                plugins={[Autoplay({ delay: 3000, stopOnInteraction: false })]}
                opts={{
                    align: "start",
                    loop: true,
                }}
            >
                <CarouselContent>
                    {tips.map((tip, index) => (
                        <CarouselItem key={index} className="basis-full">
                            <div className="text-gray-700 text-base p-4 rounded bg-background shadow-sm">
                                {tip}
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    );
}
