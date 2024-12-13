import client from "client";
import { gql } from "@apollo/client";
import { cleanAndTransformBlocks } from "./cleanAndTransformBlocks";
import { mapMainMenuItems } from "./mapMainMenuItems";

export const getPageStaticProps = async (context) => {
  const uri = context.params?.slug
    ? `${context.params.slug.join("/")}`
    : "/homepage-next/";

  const { data } = await client.query({
    query: gql`
      query PageQuery($uri: String!) {
        nodeByUri(uri: $uri) {
          ... on Page {
            id
            title
            blocks(postTemplate: false)
            seo {
              fullHead
            }
          }
          ... on Property {
            id
            title
            blocks(postTemplate: false)
            seo {
              fullHead
            }
          }
        }
        mainMenu {
          aCFMainMenu {
            menuItemsGroup {
              menuItems {
                menuLabel
                destination {
                  nodes {
                    uri
                  }
                }
                subMenuItems {
                  subMenuItemLabel
                  destination {
                    nodes {
                      uri
                    }
                  }
                }
              }
            }
            callToActionButton {
              callToActionLabel
              callToActionDestination {
                nodes {
                  uri
                }
              }
            }
          }
        }
      }
    `,
    variables: { uri },
    fetchPolicy: "no-cache",
  });
  return {
    props: {
      mainMenuItems: mapMainMenuItems(
        data?.mainMenu?.aCFMainMenu?.menuItemsGroup?.menuItems || [],
      ),
      blocks: cleanAndTransformBlocks(data.nodeByUri?.blocks),

      callToActionLabel:
        data?.mainMenu?.aCFMainMenu.callToActionButton.callToActionLabel,
      callToActionDestination:
        data?.mainMenu?.aCFMainMenu.callToActionButton.callToActionDestination
          .nodes?.[0]?.uri,
    },
  };
};
