import client from "client";
import { gql } from "@apollo/client";
const handler = async (req, resp) => {
  try {
    const filters = JSON.parse(req.body);
    console.log("Filters", filters);

    let hasParkingFilter = ``;
    let petFriendlyFilter = ``;
    let minPriceFilter = ``;
    let maxPriceFilter = ``;
    if (filters.minPrice) {
      minPriceFilter = `{
          key: "price" 
         		compare: GREATER_THAN_OR_EQUAL_TO
          	value: "${filters.minPrice}"
          	type: NUMERIC
    }
      `;
    }
    if (filters.maxPrice) {
      maxPriceFilter = `
        {
            key: "price" 
         		compare: LESS_THAN_OR_EQUAL_TO
          	value: "${filters.maxPrice}"
          	type: NUMERIC
          },
      `;
    }
    if (filters.hasParking) {
      hasParkingFilter = `
          {
         	 	key: "has_parking" 
        		compare: EQUAL_TO
            value: "1"
          },
      `;
    }
    if (filters.petFriendly) {
      petFriendlyFilter = `
          {
         	 	key: "pet_friendly" 
        		compare: EQUAL_TO
            value: "1"
          },
      `;
    }
    const { data } = await client.query({
      query: gql`
        query PageQuery {
          properties(where: { offsetPagination: { size: 3, offset: ${((filters.page || 1) - 1) * 3} },
          metaQuery: {
           metaArray: [
            ${minPriceFilter}
            ${maxPriceFilter}
            ${hasParkingFilter}
            ${petFriendlyFilter}     
          ]} }) {
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
