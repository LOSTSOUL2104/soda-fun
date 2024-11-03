"use client";
import { asText, Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Bounded } from "@/components/Bounded";
import Button from "@/components/button";
import { TextSplitter } from "./TextSplitter";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

export type HeroProps = SliceComponentProps<Content.HeroSlice>;
gsap.registerPlugin(useGSAP, ScrollTrigger);

const Hero = ({ slice }: HeroProps): JSX.Element => {
  useGSAP(() => {
    const introTl = gsap.timeline();

    introTl

      .set(".hero", { opacity: 1 })

      .from(".hero-header-word", {
        scale: 3,

        opacity: 0,

        rotation: -20,

        ease: "back.out(1.7)",

        duration: 1,

        delay: 0.3,

        stagger: {
          each: 0.15,

          from: "random",

          ease: "power2.inOut",
        },
      })

      .from(
        ".hero-subheading",

        {
          opacity: 0,

          duration: 0.8,

          scale: 0.5,

          y: 50,

          rotation: 10,

          ease: "power2.out",

          stagger: {
            each: 0.1,

            from: "center",

            ease: "power3.inOut",

            amount: 1,
          },
        },

        "+=.5",
      )

      .from(".hero-body", {
        opacity: 0,

        y: 20,

        duration: 1,

        ease: "power3.out",
      })

      .from(".hero-button", {
        opacity: 0,

        y: 50,

        scale: 0.7,

        duration: 0.8,

        ease: "elastic.out(1, 0.5)",

        stagger: {
          each: 0.15,

          from: "end",

          ease: "power2.inOut",

          amount: 1.2,
        },
      });

    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero",

        start: "top top",

        end: "bottom bottom",

        scrub: 1.5,

        markers: true,
      },
    });

    scrollTl
      .fromTo(
        "body",

        {
          backgroundColor: "#FdE047",
        },

        {
          backgroundColor: "#E6E6FA",

          overwrite: "auto",
        },

        1,
      )

      .from(".text-side-heading .split-char", {
        scale: 1.5,
        y: 50,
        rotate: -30,
        opacity: 0,
        stagger: 0.1,
        ease: "back.out(3)",
        duration: 0.7,
      })
      .from("text-side-body", {
        y: 50,
        opacity: 0,
      });
  });

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="hero opacity-0"
    >
      <div className="grid">
        <div className="grid h-screen place-items-center">
          <div className="grid auto-rows-min place-items-center text-center">
            <h1 className="hero-header text-7xl font-black uppercase leading-[.8] text-gray-700 md:text-[9rem] lg:text-[13rem]">
              <TextSplitter
                text={asText(slice.primary.heading)}
                wordDisplayStyle="block"
                className="hero-header-word"
              />
            </h1>
            <div className="hero-subheading mt-12 text-5xl font-semibold text-pink-600 lg:text-6xl">
              <PrismicRichText field={slice.primary.subheading} />
            </div>
            <div className="hero-body text-2xl font-normal text-sky-950">
              <PrismicRichText field={slice.primary.body} />
            </div>
            <Button
              buttonLink={slice.primary.button_link}
              buttonText={slice.primary.button_text}
              className="hero-button mt-12"
            />
          </div>
        </div>

        <div className="text-side relative z-[80] grid h-screen items-center gap-4 md:grid-cols-2">
          <PrismicNextImage
            className="w-full md:hidden"
            field={slice.primary.cans_image}
          />
          <div>
            <h2 className="text-side-heading text-left text-6xl font-black uppercase text-red-900 lg:text-8xl">
              <TextSplitter text={asText(slice.primary.second_heading)} />
            </h2>
            <div className="text-side-body mt-4 max-w-xl text-left text-xl font-normal text-sky-950">
              <PrismicRichText field={slice.primary.second_body} />
            </div>
          </div>
        </div>
      </div>
    </Bounded>
  );
};

export default Hero;
