import { gql, GraphQLClient } from 'graphql-request';
import Section from '../components/Section';
import NavBar from '../components/NavBar';
import { useState, useRef } from 'react'
import { gsap } from 'gsap';
import {Image} from 'next/Image'


const url = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
export const getStaticProps = async () => {
  const hygraph = new GraphQLClient(url, {
    headers: {
      "Authorization" : `Bearer ${process.env.GRAPHCMS_TOKEN}`
    }
  })
  const videosQuery = gql`
    query {
      videos {
        createdAt
        description
        id
        publishedAt
        seen
        slug
        tags
        title
        updatedAt
        thumbnail {
          url
        }
        mp4 {
          url
        }
    }
  }
  `


  const data = await hygraph.request(videosQuery)
  const videos = await data.videos

  return {
    props: {
      videos
    }
  }
}

export default function Home({videos}) {
  
  const sectionRef = useRef(null)
  
  const randomVideo = (videos) => {
    // returns a random video into the array
    return videos[Math.floor(Math.random() * videos.length)]
  }

  const filterVideo = (video, genre) => {
    return video.filter((video) => video.tags.includes(genre))
  }

  const unSeenVideos = (video) => {
    return videos.filter((video) => video.seen == false || video.seen == null)
  }

  return (
     <>
        <NavBar />
      <div className="bg-[#13151F] text-white p-0 m-0">
        <div className="w-[100%] h-[30vh] overflow-hidden relative">
            <Image className="w-[100vw]" 
              src={randomVideo(videos).thumbnail.url}
              alt={randomVideo(videos).title}
              />
        </div>
            <div className="p-4 flex flex-row justify-center items-center">
          <div className="circle-container">
            <Section genre={'Recommended for you'} videos={unSeenVideos(videos)} />
            <Section genre={'fire'} videos={filterVideo(videos, 'fire')} />
            <Section genre={'water'} videos={filterVideo(videos, 'water')} />
            <Section genre={'dark'} videos={filterVideo(videos, 'dark')} />
            <Section genre={'earth'} videos={filterVideo(videos, 'earth')} />
          </div>
        </div>
      </div>
     </>
    )
}

