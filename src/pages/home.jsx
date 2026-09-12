import { SiteHeader } from "@screenComponent/home/siteHeader";
import SiteFooter from "@screenComponent/home/siteFooter";
import HeroSection from "@screenComponent/home/heroSection";
import MaterialsSection from "@screenComponent/home/materialsSection";
import ApproachSection from "@screenComponent/home/approachSection";
import ApplicationsSection from "@screenComponent/home/applicationsSection";
import CallToActionSection from "@screenComponent/home/callToActionSection";

export default function Home() {
  return (
    <div
      className="isolate overflow-clip bg-background text-[#292d27]"
    >
      <a
        className="fixed -top-24 left-5 z-100 bg-[#292d27] px-4 py-3 text-sm text-white focus:top-3"
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
