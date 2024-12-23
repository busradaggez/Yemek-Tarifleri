import Header from "@/app/Home/Header";
import SwiperPage from "./Home/Swiper";
import Tarifler from "./Tarfiler/page";


export default function Home() {
  return (
    <div>
      <div><Header /></div>
      <div><SwiperPage /></div>
      <div><Tarifler /></div>

    </div>
  );
}
