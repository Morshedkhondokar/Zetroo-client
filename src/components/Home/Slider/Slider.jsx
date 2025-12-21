import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import slider1 from '../../../assets/slider1.jpg';
import slider2 from '../../../assets/slider2.jpg';
import slider3 from '../../../assets/slider3.jpg';

const Slider = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      autoplay={{ delay: 3000 }}
      navigation
      pagination={{ clickable: true }}
      className="h-62.5 md:h-96"
    >
      <SwiperSlide className="h-full">
        <img
          src={slider1}
          className="w-full h-full object-cover"
          alt=""
        />
      </SwiperSlide>

      <SwiperSlide className="h-full">
        <img
          src={slider2}
          className="w-full h-full object-cover"
          alt=""
        />
      </SwiperSlide>

      <SwiperSlide className="h-full">
        <img
          src={slider3}
          className="w-full h-full object-cover"
          alt=""
        />
      </SwiperSlide>
    </Swiper>
  );
};

export default Slider;
