import client from "client";
import { gql } from "@apollo/client";
const handler = async (req, resp) => {
  try {
    const filters = JSON.parse(req.body);
    console.log("Offset", ((filters.page || 1) - 1) * 3);
    const { data } = await client.query({
      query: gql`
        query PageQuery {
          properties(where: { offsetPagination: { size: 3, offset: ${((filters.page || 1) - 1) * 3} } }) {
            nodes {
              databaseId
              title
              uri
              featuredImage {
                node {
                  altText
                  uri
                  sourceUrl
                }
              }
              propertiesFeatures {
                bathrooms
                bedrooms
                fieldGroupName
                hasParking
                petFriendly
                price
              }
            }
            pageInfo {
              offsetPagination {
                total
              }
            }
          }
        }
      `,
    });

    return resp.status(200).json({
      properties: data.properties.nodes,
      total: data.properties.pageInfo.offsetPagination.total,
    });
  } catch (e) {
    console.log("Error", e);
  }
};
export default handler;
