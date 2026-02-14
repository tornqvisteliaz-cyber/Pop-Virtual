import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import FleetSection from "@/components/FleetSection";
import JoinSection from "@/components/JoinSection";
import CommunitySection from "@/components/CommunitySection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <FleetSection />
        <JoinSection />
        <CommunitySection />
      </main>
      <FooterSection />
    </>
  );
};

export default Index;
