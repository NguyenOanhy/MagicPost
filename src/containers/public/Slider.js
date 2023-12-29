import React, { useState } from 'react';
import Carousel from 'react-elastic-carousel';
import Card from './Card';

export default function Slider() {

  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = (index) => {
    setActiveIndex(index);
    if (index === items.length - 1) {
      setActiveIndex(0);
    }
  };
  const items = [
    { number: "1", src: require('../../image/shipping_box.png'), alt: "image description" },
    { number: "2", src: require('../../image/shipping_box.png'), alt: "image description" },
    { number: "3", src: require('../../image/ship3.png'), alt: "image description"  },
    { number: "4", src: require('../../image/shipper.png'), alt: "image description"  },
    { number: "5", src: require('../../image/shipper.png'), alt: "image description"  },
    { number: "6", src: require('../../image/shipper.png'), alt: "image description"  },
  ];

  return (
    <div className='w-full items-center'>
      <Carousel 
        enableAutoPlay
        autoPlaySpeed={3000}
        activeIndex={activeIndex}
        onChange={handleSlideChange}
      >
        {items.map((item, index) => (
          <div key={index}>
          <Card number={item.number} src={item.src} alt={item.alt} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};
  