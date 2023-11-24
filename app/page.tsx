import Faq from "@/components/Faq";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import Image from "next/image";

export default function Home() {
    return (
        <main className="overflow-x-hidden">
            <Hero />
            <Features />
            <Faq />
            <Testimonials />
        </main>
    );
}
