import FlashSale from "../../components/Home/FlashSale/FlashSale"
import FlashSaleProducts from "../../components/Home/FlashSale/FlashSaleProducts"
import HomeProductSection from "../../components/Home/HomeProductSection/HomeProductSection"

import Slider from "../../components/Home/Slider/Slider"


const Home = () => {
  return (
    <div>
     <Slider/>
     <FlashSale/>
     <FlashSaleProducts/>
     <HomeProductSection/>
    </div>
  )
}

export default Home
