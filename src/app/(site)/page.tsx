import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";

export default function Home() {
  return (
    <>
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <section className="relative mx-auto max-w-[120rem] px-8 text-center pt-24">
        <Link
          className={buttonVariants({
            variant: "secondary",
            size: "sm",
            className:
              "border-black border-solid border translate-y-[-1rem] animate-fade-in opacity-0 rounded-full",
          })}
          href="https://github.com/Devansh-365"
        >
          <Icons.star />
          <span className="ml-2">Star us on Github</span>
          <Icons.arrowRight className="w-3 h-3 ml-2" />
        </Link>
        <h1 className="my-6 text-4xl text-gray-900 dark:text-gray-50 md:text-6xl font-medium translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
          BioBeacon: Illuminate Your
          <br className="hidden md:block animate-text-gradient bg-gradient-to-r from-neutral-900 via-slate-500 to-neutral-500 bg-[200%_auto] bg-clip-text leading-tight text-transparent dark:from-neutral-100 dark:via-slate-400 dark:to-neutral-400" />{" "}
          Online Presence
        </h1>
        <p className="mb-12 mx-auto max-w-2xl leading-6 text-lg md:text-xl text-gray-600 dark:text-gray-200 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
          An Open-Source Solution for Streamlining Your Social Media Links
        </p>
        <Link
          className={buttonVariants({
            size: "lg",
            className:
              "rounded-full translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:600ms]",
          })}
          href="/dashboard"
        >
          Get Started
          <Icons.arrowRight className="w-4 h-4 ml-2" />
        </Link>
      </section>
    </>
  );
}
