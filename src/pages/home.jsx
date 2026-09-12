import { SiteHeader } from "@/components/screen/home/siteHeader";
import SiteFooter from "@/components/screen/home/siteFooter";
import HeroSection from "@/components/screen/home/heroSection";
import MaterialsSection from "@/components/screen/home/materialsSection";
import ApproachSection from "@/components/screen/home/approachSection";
import ApplicationsSection from "@/components/screen/home/applicationsSection";
import CallToActionSection from "@/components/screen/home/callToActionSection";

export default function Home() {
  return (
    <div
      className="isolate overflow-clip bg-[#e8e9e3] text-[#292d27]"
    >
      <a
        className="fixed -top-24 left-5 z-[100] bg-[#292d27] px-4 py-3 text-sm text-white focus:top-3"
        href="#materials"
      >
        Skip to materials
      </a>
      <SiteHeader />
      <main>
        <HeroSection />
        <MaterialsSection />
        <ApproachSection />
        <ApplicationsSection />
        <CallToActionSection />
      </main>
      <SiteFooter />
    </div>
  );
}
