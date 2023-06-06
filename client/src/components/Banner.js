import React from "react";
import Carousel from "react-bootstrap/Carousel";

import Slide1 from "../assets/slide-1.jpg";
import Slide2 from "../assets/slide-2.jpg";
import Slide3 from "../assets/slide-3.jpg";

const Banner = () => {
  return (
    <div>
      <Carousel>
        <Carousel.Item>
          <img
            className="banner d-block w-100"
            src={Slide2}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>
              "The best way to find yourself is to lose yourself in the service
              of others." - Mahatma Gandhi
            </h3>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="banner d-block w-100"
            src={Slide1}
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>
              Volunteers are the only human beings on the face of the earth who
              reflect this nation's compassion, unselfish caring, patience, and
              just plain love for one another." - Erma Bombeck
            </h3>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="banner d-block w-100"
            src={Slide3}
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>
              Volunteers do not necessarily have the time; they just have the
              heart." - Elizabeth Andrew.
            </h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Banner;
