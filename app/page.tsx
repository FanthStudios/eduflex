import Faq from "@/components/Faq";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";

export default function Home() {
    return (
        <main className="overflow-x-hidden">
            <Hero />
            <Features />
            <Faq />
            <Testimonials />
            <Footer />
        </main>
    );
}
