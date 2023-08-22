import Card from './Card'
import gsap from 'gsap'
import React, { useEffect, useRef } from 'react'


function Section({genre, videos}) {

  const sectRef = useRef(null);
  
  useEffect(() => {
    gsap.fromTo(
      sectRef.current,
      {
        x: gsap.utils.random(-2000, 200), // Random x position within -2000 to 200 pixels
        y: gsap.utils.random(-2000, 200), // Random y position within -2000 to 200 pixels
        opacity: 0,
      },
      {
        x: 0,
        y: 0,
        opacity: 1,
        duration: 4,
        ease: 'power3.out',
      }
    );
    
    const onScroll = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
          onEnter({ currentTarget: entry.target });
        } else {
          onLeave({ currentTarget: entry.target });
        }
      });
    };

    const observer = new IntersectionObserver(onScroll, { threshold: 0.9 });
    observer.observe(sectRef.current);

    return () => {
      observer.disconnect();
    };
  }, [])

  const sectionRef = useRef(null)
  
  const onEnter = ({ currentTarget }) => {
    gsap.to(currentTarget, { scale: 1.2, opacity: 1 });
    const items = sectionRef.current.querySelectorAll('.card'); // Assuming your Card component has a "card" class
    animateItemsRandomly(items);
    
  };
  
  const onLeave = ({ currentTarget }) => {
    gsap.to(currentTarget, { scale: 1, opacity: 0.15});
  };
  
  
  const animateItemsRandomly = (items) => {
    items.forEach((item) => {
      gsap.fromTo(
        item,
        {
          x: 0,
          y: 0,
        },
        {
          x: gsap.utils.random(-50, 50), // Random x position within -50 to 50 pixels
          y: gsap.utils.random(-50, 50), // Random y position within -50 to 50 pixels
          duration: 0.5,
        }
      );
    });
  };

  console.log(videos)
  return (
    <div className=" flex flex-col w-[50vw]" ref={sectRef}>
      <div className="" >
        <h1 className="text-lg ">{genre}</h1>
          <div className="section w-full " ref={sectionRef} onEnter={onEnter} onLeave={onLeave} style={{ background: 'tranparent' }}>
            {videos.map(video =>  (
              <div key={video.id} id={`card-${video.id}`} className="cardMover">
              <a href={`/video/${video.slug}`}>
                <Card thumbnail={video.thumbnail} />
              </a>
            </div>
            ))}
          </div>
      </div>
    </div>
  )
}

export default Section
