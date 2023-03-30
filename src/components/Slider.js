import React, { useState, useEffect } from "react";
import Slide from "./Slide";
import data from "../data";
const Slider = () => {
  const [active, setActive] = useState(0);

  const nextSlide = () => {
    setActive(oldPosition => {
      if (oldPosition === data.length - 1) {
        return 0;
      }

      return oldPosition + 1;
    })
  }

  const prevSlide = () => {
    setActive(oldPosition => {
      if (oldPosition - 1 < 0) {
        return data.length - 1;
      }

      return oldPosition - 1;
    })
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      nextSlide();
    }, 5000)

    return () => clearTimeout(timer)
  }, [active])


  return <div className="container slider">
    {data.map((recensione, index) => {
      let positionClass = "";

      if (index === active) {
        positionClass = "active"
      } else if (index + 1 === active || (active === 0 && index === data.length - 1)) {
        positionClass = "prev"

      } else {
        positionClass = "next"
      }


      return <Slide key={recensione.id} {...recensione} classes={positionClass} />
    })}

    <div className='btn-group slider-btn-group'>
      <button className='btn btn-slider prev-slide' onClick={prevSlide}>
        prev
      </button>
      <button className='btn btn-slider next-slide' onClick={nextSlide}>
        next
      </button>
    </div>

  </div>;
};

export default Slider;
