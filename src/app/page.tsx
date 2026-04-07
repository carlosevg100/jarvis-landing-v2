import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Pain from "@/components/sections/Pain";
import Showcase from "@/components/sections/Showcase";
import Experience from "@/components/sections/Experience";
import Intelligence from "@/components/sections/Intelligence";
import Security from "@/components/sections/Security";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Pain />
        <Showcase />
        <Experience />
        <Intelligence />
        <Pricing />
        <Security />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
