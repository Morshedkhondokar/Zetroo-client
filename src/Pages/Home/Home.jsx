import FlashSale from "../../components/Home/FlashSale/FlashSale"
import FlashSaleProducts from "../../components/Home/FlashSale/FlashSaleProducts"
import HomeProductSection from "../../components/Home/HomeProductSection/HomeProductSection"
import NewArrivals from "../../components/Home/NewArrivals/NewArrivals"
import ServiceCards from "../../components/Home/ServiceCards/ServiceCards"

import Slider from "../../components/Home/Slider/Slider"


const Home = () => {
  return (
    <div>
     <Slider/>
     <FlashSale/>
     <FlashSaleProducts/>
     <HomeProductSection/>
     <NewArrivals/>
     <ServiceCards/>
    </div>
  )
}

export default Home
