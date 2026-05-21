import BannerPage from "@/components/Banner";
import Footer from "@/components/Footer";

import HomeTutors from "@/components/Hometutors";
import Navbar from "@/components/Navbar";
import TutorCard from "@/components/TutorCard";
import HowItWorksSection from "@/home/Howitworkssection";
import StatsSection from "@/home/Statssection";
import Image from "next/image";

export default function Home() {
  return (
    <div  className="space-y-15">
      <BannerPage/>
      {/* <TutorCard/> */}
      <HomeTutors/>
      <StatsSection/>
      <HowItWorksSection/>

      
    </div>
  );
}
