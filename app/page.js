import Image from "next/image";
import SearchBar from "./Componen/SearchBar";
import CollegeCard from "./Componen/CollegeCard";
import Gallery from "./Componen/Gallery";
import ResearchLinks from "./Componen/ResearchLinks";
import Reviews from "./Componen/Reviews";

export default function Home() {
  return (
    <div className="">
      <SearchBar />
      <CollegeCard />
      <Gallery />
      <ResearchLinks />
      <Reviews />

    </div>
  );
}
