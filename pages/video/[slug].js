import { gql, GraphQLClient } from 'graphql-request'
import { useState } from 'react';

export const getServerSideProps = async (pageContext) => {
    const url = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT
    const Hygraph = new GraphQLClient(url, {
        headers: {
            "Authorization" : `Bearer ${process.env.GRAPHCMS_TOKEN}`
        }
    })
    const pageSlug = pageContext.query.slug
    const query = gql`
        query($pageSlug: String!) {
            video(where: {
                slug: $pageSlug
            }) {
                createdAt
                id
                tags
                title
                seen
                slug
                description
                thumbnail{
                  url
                }
                mp4 {
                  url
                }
            }
        }
    `
    const variables = {
        pageSlug,
    }
   const data = await Hygraph.request(query, variables)
   const video = data.video
   
   return {
       props: {
           video
        }
    }
}

const changeToSeen = async (slug) => {
    await fetch('/api/changeToSeen', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({slug})
    })
}

function Video({ video }) {
    const [watching, setWatching] = useState(false)
  return (
    <>
        {!watching && <img className="video-image" src={video.thumbnail.url} alt={video.title} />}
        {!watching && <div className="info">
            <p>{video.tags.join(', ')}</p>
            <p>{video.description}</p>
            <a href="/"><p>Go Back</p></a>
            <button></button>
            </div>}
            {/* If Watching is true then show the div */}
            {watching && (
                <video width="100%" controls>
                    <source src={video.mp4.url} type="video/mp4" />
                </video>
            )}
            <div className={"info-footer"}
                onClick={() => {
                    watching ? setWatching(false) : null
                }}
            >
                <h1>Go Back</h1>
            </div>
    </>
  )
}

export default Video
