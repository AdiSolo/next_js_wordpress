import { NextResponse } from "next/server";
export async function POST(request) {
  try {
    const filters = await request.json();
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

    const query = {
      query: `
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
    };

    const response = await fetch(process.env.WP_GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(query),
    });

    const { data } = await response.json();
    return NextResponse.json({
      properties: data.properties.nodes,
      total: data.properties.pageInfo.offsetPagination.total,
    });
  } catch (e) {
    console.log("Error", e);
  }
}
