import { GraphQLClient } from 'graphql-request';

export default async ({body}, res) => {
    const url = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT
    const HyGraph = new GraphQLClient(url, {
        headers: {
          "Authorization" : `Bearer ${process.env.GRAPHCMS_TOKEN}`
        }
      })
      await HyGraph.request(
        `
        mutation($slug: String!) {
          updateVideo(where: 
            { slug: $slug}, 
            data: { seen: true}
          ) {
            id,
            title,
            seen
          }
        }
        `,
        { slug: body.slug }
    )

      await HyGraph.request(
        `mutation publishVideo($slug: String) {
        publishVideo(where: { slug: $slug}, to: PUBLISHED) {
            slug
            }
        }`,
        { slug: body.slug }
    )

    res.status(201).json({ slug: body.slug })
}
