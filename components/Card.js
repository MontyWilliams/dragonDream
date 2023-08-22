import React from 'react'
import gsap from 'gsap';
import Image from 'next/image'

function Card({thumbnail}) {

  const onEnter = ({ currentTarget }) => {
    gsap.to(currentTarget, { backgroundColor: "#e77614", zIndex: 2, scale: 1.2 });
    gsap.to(currentTarget, { positionx: '50%', y: '50%', duration: 0.5 });
  };
  
  const onLeave = ({ currentTarget }) => {
    gsap.to(currentTarget, { backgroundColor: "#28a92b", zIndex: 1, scale: 1 });
    gsap.to(currentTarget, { x: 0, y: 0, duration: 0.5 });
  };
  
  return (
    <>
        <Image height={100} width={100} className="card"src={thumbnail.url} alt={thumbnail.title} onMouseEnter={onEnter} onMouseLeave={onLeave} style={{ zIndex: 1 }}/>
    </>
  )
}

export default Card
