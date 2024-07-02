"use server" 

//THESE NEED TO BE ADJUSTED FOR THIS SITE
const graphqlEndpoint = process.env.GRAPHQL_ENDPOINT;
export async function getBlogPageContent() {
    
    const response = await fetch(graphqlEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: '{ page(id: "cG9zdDoxNA==") { content } }' }),
    });

    const text = await response.text();

    const { data } = JSON.parse(text);
    return data.page.content;
}

export async function getGalleryImages() {

    const query = `{
        mediaItems (first: 100) {
            edges {
                node {
                    id
                    sourceUrl
                    altText
                }
            }
        }
    }`;
    const response = await fetch(graphqlEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: query }),
    });

    const text = await response.text();

    let { data } = await JSON.parse(text);
    data = data.mediaItems.edges.slice(0, -4);
    // console.log(data);
    return data;
}
