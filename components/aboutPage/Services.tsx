import { servicesData } from "@/lib/data";
import SectionTitle from "../section-title";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Services() {
  return (
    <section className="mb-12">
      <SectionTitle title="What can I do for you?" subtitle="fields of work" />
      <div className=" px-8">
        <Carousel>
          <CarouselContent>
            {servicesData.map((service) => (
              <CarouselItem key={service.title}>
                <div className="grid gap-8 md:grid-cols-2">
                  <div>
                    <Image
                      src={service.icon}
                      width={400}
                      height={400}
                      alt={service.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex flex-col md:pt-[3rem]">
                    <span className="text-xs block uppercase">
                      {service.subtitle}
                    </span>
                    <h2 className="capitalize">{service.title}</h2>
                    <p className="m-0 max-w-[30ch]">{service.description}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
