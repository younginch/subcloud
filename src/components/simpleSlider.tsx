import { Box } from "@chakra-ui/react";
import { useState } from "react";
import Slider from "react-slick";
import CarouselPage from "./carouselPage";
import SlideImage1 from "../../public/mainpage/slide1.png";
import SlideImage2 from "../../public/mainpage/slide2.png";
import SlideImage3 from "../../public/mainpage/slide3.png";

export function SimpleSlider() {
  const [imageIndex, setImageIndex] = useState(0);

  const images = [SlideImage1, SlideImage2, SlideImage3];

  const settings = {
    infinite: true,
    speed: 300,
    centerMode: true,
    afterChange: (current: number) => {
      setImageIndex(current);
    },
    autoplay: true,
    autoplaySpeed: 8000,
    adaptiveHeight: true,
    variableWidth: true,
  };

  return (
    <Box h="100%">
      <Slider {...settings}>
        {images.map((img, idx) => (
          <Box key={idx} verticalAlign="middle">
            <CarouselPage active={idx === imageIndex} imgUrl={img} />
          </Box>
        ))}
      </Slider>
    </Box>
  );
}
