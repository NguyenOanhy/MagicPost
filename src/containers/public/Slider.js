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
    { number: "1", src: require('../../image/ship1.jpg'), alt: "image description" },
    { number: "2", src: require('../../image/ship2.jpg'), alt: "image description" },
    { number: "3", src: require('../../image/shipper.png'), alt: "image description"  },
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
  

// import { Carousel, Image } from 'react-bootstrap';

// function Slider() {
//   return (
//     <Carousel>
//       <Carousel.Item interval={1000}>
//         <Image src={require('../../image/shipper.png')} alt="image description"/>
//         <Carousel.Caption>
//         <h3>First slide label</h3>
//           <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
//         </Carousel.Caption>
//       </Carousel.Item>
//       <Carousel.Item interval={1000}>
//         <Image src={require('../../image/shipper.png')} alt="image description"/>
//         <Carousel.Caption>
//         <h3>First slide label</h3>
//           <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
//         </Carousel.Caption>
//       </Carousel.Item>
//       <Carousel.Item interval={1000}>
//         <Image src={require('../../image/shipper.png')} alt="image description"/>
//         <Carousel.Caption>
//         <h3>First slide label</h3>
//           <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
//         </Carousel.Caption>
//       </Carousel.Item>
//     </Carousel>
//   );
// }

// export default Slider;