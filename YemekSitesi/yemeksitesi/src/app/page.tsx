import RecipeFilter from "@/components/RecipeFilter";
import Header from "../components/Header";
import SwiperPage from "../components/Swiper";
import Tarifler from "./Tarifler/page";


export default function Home() {
  return (
    <div>
      <div><Header /></div>
      <div><SwiperPage /></div>
      <div><Tarifler /></div>
      <div><RecipeFilter /></div>
    </div>
  );
}
